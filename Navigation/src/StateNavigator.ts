﻿import Crumb from './config/Crumb';
import { FluentNavigator, createFluentNavigator } from './FluentNavigator';
import HashHistoryManager from './history/HashHistoryManager';
import HistoryManager from './history/HistoryManager';
import State from './config/State';
import StateInfo from './config/StateInfo';
import StateContext from './StateContext';
import StateHandler from './StateHandler';

class StateNavigator {
    private NAVIGATE_HANDLER_ID = 'navigateHandlerId';
    private navigateHandlerId = 1;
    private navigateHandlers: { [index: string]: (oldState: State, state: State, data: any, asyncData: any) => void } = {};
    private stateHandler = new StateHandler();
    stateContext = new StateContext();
    historyManager: HistoryManager;
    states: { [index: string]: State } = {};
    
    constructor(states?: StateInfo[], historyManager?: HistoryManager) {
        if (states)
            this.configure(states, historyManager);
    }
    
    configure(stateInfos: StateInfo[], historyManager?: HistoryManager) {
        if (this.historyManager)
            this.historyManager.stop();
        this.historyManager = historyManager ? historyManager : new HashHistoryManager();
        this.historyManager.init(() => {
            if (this.stateContext.url === this.historyManager.getCurrentUrl())
                return;
            this.navigateLink(this.historyManager.getCurrentUrl(), undefined, true);
        });
        var states = this.stateHandler.buildStates(stateInfos);
        this.states = {};
        for(var i = 0; i < states.length; i++)
            this.states[states[i].key] = states[i];
    }

    private setStateContext(state: State, data: any, url: string) {
        this.stateContext.oldState = this.stateContext.state;
        this.stateContext.oldData = this.stateContext.data;
        this.stateContext.oldUrl = this.stateContext.url;
        this.stateContext.state = state;
        this.stateContext.url = url;
        this.stateContext.title = state.title;
        this.stateContext.crumbs = data[state.crumbTrailKey];
        delete data[state.crumbTrailKey];
        this.stateContext.data = data;
        this.stateContext.nextCrumb = new Crumb(data, state, url, this.stateHandler.getLink(state, data), false);
        this.stateContext.previousState = null;
        this.stateContext.previousData = {};
        this.stateContext.previousUrl = null;
        if (this.stateContext.crumbs.length > 0) {
            var previousStateCrumb = this.stateContext.crumbs.slice(-1)[0];
            this.stateContext.previousState = previousStateCrumb.state;
            this.stateContext.previousData = previousStateCrumb.data;
            this.stateContext.previousUrl = previousStateCrumb.url;
        }
    }
    
    onNavigate(handler: (oldState: State, state: State, data: any, asyncData: any) => void) {
        if (!handler[this.NAVIGATE_HANDLER_ID]) {
            var id = this.NAVIGATE_HANDLER_ID + this.navigateHandlerId++;
            handler[this.NAVIGATE_HANDLER_ID] = id;
            this.navigateHandlers[id] = handler;
        } else {
            throw new Error('Cannot add the same handler more than once');
        }
    }

    offNavigate(handler: (oldState: State, state: State, data: any, asyncData: any) => void) {
        delete this.navigateHandlers[handler[this.NAVIGATE_HANDLER_ID]];
        delete handler[this.NAVIGATE_HANDLER_ID];
    }

    navigate(stateKey: string, navigationData?: any, historyAction?: 'add' | 'replace' | 'none') {
        var url = this.getNavigationLink(stateKey, navigationData);
        if (url == null)
            throw new Error('Invalid route data, a mandatory route parameter has not been supplied a value');
        this.navigateLink(url, historyAction);
    }

    getNavigationLink(stateKey: string, navigationData?: any): string {
        if (!this.states[stateKey])
            throw new Error(stateKey + ' is not a valid State');
        var { crumbs, nextCrumb } = this.stateContext;
        return this.stateHandler.getLink(this.states[stateKey], navigationData, crumbs, nextCrumb);
    }

    canNavigateBack(distance: number) {
        return distance <= this.stateContext.crumbs.length && distance > 0;
    }

    navigateBack(distance: number, historyAction?: 'add' | 'replace' | 'none') {
        var url = this.getNavigationBackLink(distance);
        this.navigateLink(url, historyAction);
    }

    getNavigationBackLink(distance: number): string {
        if (!this.canNavigateBack(distance))
            throw new Error('The distance parameter must be greater than zero and less than or equal to the number of Crumbs (' + this.stateContext.crumbs.length + ')');
        return this.stateContext.crumbs[this.stateContext.crumbs.length - distance].url;
    }

    refresh(navigationData?: any, historyAction?: 'add' | 'replace' | 'none') {
        var url = this.getRefreshLink(navigationData);
        if (url == null)
            throw new Error('Invalid route data, a mandatory route parameter has not been supplied a value');
        this.navigateLink(url, historyAction);
    }

    getRefreshLink(navigationData?: any): string {
        var { crumbs, nextCrumb } = this.stateContext;
        return this.stateHandler.getLink(this.stateContext.state, navigationData, crumbs, nextCrumb);
    }

    navigateLink(url: string, historyAction: 'add' | 'replace' | 'none' = 'add', history = false) {
        var oldUrl = this.stateContext.url;
        var { state, data } = this.stateHandler.parseLink(url);
        var navigateContinuation =  this.getNavigateContinuation(oldUrl, state, data, url, historyAction);
        var unloadContinuation = () => {
            if (oldUrl === this.stateContext.url)
                state.navigating(data, url, navigateContinuation, history);
        };
        if (this.stateContext.state)
            this.stateContext.state.unloading(state, data, url, unloadContinuation, history);
        else
            state.navigating(data, url, navigateContinuation, history);
    }
    
    private getNavigateContinuation(oldUrl: string, state: State, data: any, url: string, historyAction: 'add' | 'replace' | 'none'): () => void {
        return (asyncData?: any) => {
            if (oldUrl === this.stateContext.url) {
                this.setStateContext(state, data, url);
                if (this.stateContext.oldState && this.stateContext.oldState !== state)
                    this.stateContext.oldState.dispose();
                state.navigated(this.stateContext.data, asyncData);
                for (var id in this.navigateHandlers) {
                    if (url === this.stateContext.url)
                        this.navigateHandlers[id](this.stateContext.oldState, state, this.stateContext.data, asyncData);
                }
                if (url === this.stateContext.url) {
                    if (historyAction !== 'none')
                        this.historyManager.addHistory(url, historyAction === 'replace');
                    if (this.stateContext.title && (typeof document !== 'undefined'))
                        document.title = this.stateContext.title;
                }
            }
        };
    }
    
    parseLink(url: string): { state: State, data: any } {
        var { state, data } = this.stateHandler.parseLink(url);
        delete data[state.crumbTrailKey];
        return { state, data };
    }

    fluent(withContext = false): FluentNavigator {
        var stateContext = !withContext ? undefined : this.stateContext;
        return createFluentNavigator(this.states, this.stateHandler, stateContext);
    }
    
    start(url?: string) {
        this.navigateLink(url != null ? url : this.historyManager.getCurrentUrl());
    };
}
export default StateNavigator;
