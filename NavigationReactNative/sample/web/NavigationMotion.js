import { StateNavigator } from 'navigation';
import * as React from 'react';
import { Motion, TransitionMotion } from 'react-motion';

class NavigationMotion extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onNavigate = this.onNavigate.bind(this);
        this.state = {scenes: {}};
    }
    getStateNavigator(){
        return this.props.stateNavigator || this.context.stateNavigator;
    }
    componentDidMount() {
        var stateNavigator = this.getStateNavigator();
        stateNavigator.onNavigate(this.onNavigate);
        var {startStateKey, startNavigationData} = this.props;
        if (startStateKey) {
            stateNavigator.stateContext.clear();
            stateNavigator.navigate(startStateKey, startNavigationData);
        }
    }
    componentWillUnmount() {
        this.getStateNavigator().offNavigate(this.onNavigate);
    }
    onNavigate(oldState, state, data) {
        this.setState(prevState => {
            var scenes = {...prevState.scenes};
            var {url} = this.getStateNavigator().stateContext;
            var element = state.renderScene(this.getSceneData(data, url, prevState), this.moveScene(url));
            scenes[url] = {...scenes[url], element};
            return {scenes};
        });
    }
    moveScene(url) {
        return data => {
            this.setState(prevState => {
                var scenes = {...prevState.scenes};
                scenes[url] = {...scenes[url], data};
                return {scenes};
            });
        };
    }
    clearScene(url) {
        this.setState(prevState => {
            var scenes = {...prevState.scenes};
            delete scenes[url];
            return {scenes};
        });
    }
    getScenes(){
        var {crumbs, nextCrumb} = this.getStateNavigator().stateContext;
        return crumbs.concat(nextCrumb).map(({state, data, url}) => (
            {state, data, url, scene: this.state.scenes[url], mount: url === nextCrumb.url}
        ));
    }
    getSceneData(data, url, prevState) {
        var scene = (prevState || this.state.scenes)[url];
        return {...data, ...(scene && scene.data)};
    }
    getStyle(styleProp, {state, data, url}, strip) {
        var style = typeof styleProp === 'function' ? styleProp(state, this.getSceneData(data, url)) : styleProp;
        var newStyle = {};
        for(var key in style) {
            newStyle[key] = (!strip || typeof style[key] === 'number') ? style[key] : style[key].val;
        }
        return newStyle;
    }
    render() {
        var {unmountedStyle, mountedStyle, crumbStyle, style, children} = this.props;
        return (this.getStateNavigator().stateContext.state &&
            <TransitionMotion
                willEnter={({data: sceneContext}) => this.getStyle(unmountedStyle, sceneContext, true)}
                willLeave={({data: sceneContext}) => this.getStyle(unmountedStyle, sceneContext)}
                didLeave={({data: sceneContext}) => {this.clearScene(sceneContext.url)}}
                styles={this.getScenes().map(({mount, ...sceneContext}) => ({
                    key: sceneContext.url,
                    data: sceneContext,
                    style: this.getStyle(mount ? mountedStyle : crumbStyle, sceneContext)
                }))}>
                {tweenStyles => (
                    <div style={style}>
                        {tweenStyles.map(({key, data: {scene, state, data, url}, style}) => (
                            children(style, scene && scene.element, key, state, this.getSceneData(data, url))
                        ))}
                    </div>
                )}
            </TransitionMotion>
        );
    }
}

NavigationMotion.contextTypes = {
    stateNavigator: React.PropTypes.object
}

export default NavigationMotion;
