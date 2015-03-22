﻿module NavigationReact {
    export var NavigationLink = React.createClass({
        onNavigate: function () {
            this.forceUpdate();
        },
        componentDidMount: function () {
            Navigation.StateController.onNavigate(this.onNavigate);
        },
        componentWillUnmount: function () {
            Navigation.StateController.offNavigate(this.onNavigate);
        },
        render: function () {
            var props = cloneProps(this);
            var action = props.action;
            var toData = getData(props.toData, props.includeCurrentData, props.currentDataKeys);
            try {
                var link = Navigation.StateController.getNavigationLink(action, toData);
                props.href = Navigation.historyManager.getHref(link);
                props.onClick = (e) => onClick(e, this.getDOMNode());
            } catch (e) {
                props.href = null;
            }
            clearProps(props);
            return React.createElement(props.href ? 'a' : 'span', props);
        }
    });

    export var NavigationBackLink = React.createClass({
        onNavigate: function () {
            this.forceUpdate();
        },
        componentDidMount: function () {
            Navigation.StateController.onNavigate(this.onNavigate);
        },
        componentWillUnmount: function () {
            Navigation.StateController.offNavigate(this.onNavigate);
        },
        render: function () {
            var props = cloneProps(this);
            var distance = props.distance;
            try {
                var link = Navigation.StateController.getNavigationBackLink(distance);
                props.href = Navigation.historyManager.getHref(link);
                props.onClick = (e) => onClick(e, this.getDOMNode());
            } catch (e) {
                props.href = null;
            }
            clearProps(props);
            return React.createElement('a', props);
        }
    });

    export var RefreshLink = React.createClass({
        onNavigate: function () {
            this.forceUpdate();
        },
        componentDidMount: function () {
            Navigation.StateController.onNavigate(this.onNavigate);
        },
        componentWillUnmount: function () {
            Navigation.StateController.offNavigate(this.onNavigate);
        },
        render: function () {
            var props = cloneProps(this);
            var toData = getData(props.toData, props.includeCurrentData, props.currentDataKeys);
            try {
                var link = Navigation.StateController.getRefreshLink(toData);
                props.href = Navigation.historyManager.getHref(link);
                props.onClick = (e) => onClick(e, this.getDOMNode());
            } catch (e) {
                props.href = null;
            }
            clearProps(props);
            return React.createElement('a', props);
        }
    });

    function cloneProps(elem: React.ReactElement<any, any>): any {
        var props = {};
        for (var key in elem.props) {
            props[key] = elem.props[key];
        }
        return props;
    }

    function getData(toData, includeCurrentData: boolean, currentDataKeys: string): any {
        if (includeCurrentData)
            toData = Navigation.StateContext.includeCurrentData(toData);
        if (currentDataKeys)
            toData = Navigation.StateContext.includeCurrentData(toData, currentDataKeys.trim().split(/\s*,\s*/));
        return toData;
    }

    function onClick(e: MouseEvent, element: HTMLAnchorElement) {
        if (!e.ctrlKey && !e.shiftKey) {
            if (element.href) {
                e.preventDefault();
                Navigation.StateController.navigateLink(Navigation.historyManager.getUrl(element));
            }
        }
    }

    function clearProps(props: any) {
        delete props.action;
        delete props.toData;
        delete props.includeCurrentData;
        delete props.currentDataKeys;
        delete props.distance;
    }
}
var NavigationLink = NavigationReact.NavigationLink;
var NavigationBackLink = NavigationReact.NavigationBackLink;
var RefreshLink = NavigationReact.RefreshLink;