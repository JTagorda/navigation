import { StateNavigator } from 'navigation';
import * as React from 'react';
import { Motion, TransitionMotion } from 'react-motion';
import spring from './spring.js'

class NavigationMotion extends React.Component {
    onNavigate(oldState, state, data, asyncData) {
        this.setState((prevState) => {
            var {url, crumbs} = this.getStateNavigator().stateContext;
            var scenes = {[url]: {element: state.renderScene(data, this.moveScene(url), asyncData)}};
            for(var i = 0; i < crumbs.length; i++)
                scenes[crumbs[i].url] = prevState.scenes[crumbs[i].url];
            return {scenes};
        });
    }
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
        if (startStateKey)
            stateNavigator.navigate(startStateKey, startNavigationData);
    }
    componentWillUnmount() {
        this.getStateNavigator().offNavigate(this.onNavigate);
    }
    moveScene(url) {
        return data => {
            this.setState((prevState) => {
                var scenes = {...prevState.scenes};
                if (scenes[url])
                    scenes[url].data = data; 
                return {scenes};
            }
        )};
    }
    getScenes(){
        var {crumbs, nextCrumb} = this.getStateNavigator().stateContext;
        return crumbs.concat(nextCrumb).map(({state, data, url}) => {
            var scene = this.state.scenes[url] || {};
            return {state, data, url, scene, sceneData: scene.data, mount: url === nextCrumb.url};
        });
    }
    render() {
        var {state, crumbs, nextCrumb} = this.getStateNavigator().stateContext;
        var {unmountedStyle, mountedStyle, crumbStyle, style, children} = this.props;
        return (state &&
            <TransitionMotion
                willEnter={({data: sceneContext}) => getStyle(unmountedStyle, sceneContext, true)}
                willLeave={({data: sceneContext}) => getStyle(unmountedStyle, sceneContext)}
                styles={this.getScenes().map(({url, mount, ...sceneContext}) => ({
                    key: url,
                    data: sceneContext,
                    style: getStyle(mount ? mountedStyle : crumbStyle, sceneContext)
                }))}>
                {tweenStyles => (
                    <div style={style}>
                        {tweenStyles.map(({key, data: {scene, state, data, sceneData}, style}) => (
                            children(style, scene.element, key, state, data, sceneData)
                        ))}
                    </div>
                )}
            </TransitionMotion>
        );
    }
}

function getStyle(styleProp, {state, data, sceneData}, strip) {
    var style = typeof styleProp === 'function' ? styleProp(state, data, sceneData) : styleProp;
    var newStyle = {};
    for(var key in style) {
        newStyle[key] = (!strip || typeof style[key] === 'number') ? style[key] : style[key].val;
    }
    return newStyle;
}

NavigationMotion.contextTypes = {
    stateNavigator: React.PropTypes.object
}

export default NavigationMotion;