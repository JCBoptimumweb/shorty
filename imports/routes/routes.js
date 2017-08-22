import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
const onEnterPublicPage = () => {
    if (Meteor.userId()) {
        browserHistory.replace('/links');
    }
};
const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        browserHistory.replace('/');
    }
};
export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.location.pathname;
    const isUnauthenticatedPages = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPages = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPages && isAuthenticated) {
        browserHistory.replace('/links');
    } else if (isAuthenticatedPages && !isAuthenticated) {
        browserHistory.replace('/');
    }
};
export const routes = (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={Login} onEnter={onEnterPublicPage}/>
            <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
            <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
            <Route path="*" component={NotFound}/>

        </Switch>
    </Router>
);