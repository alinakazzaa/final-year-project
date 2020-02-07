import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAppContainer } from 'react-navigation';
import * as userActions from '../actions/user';
import { ApplicationStack } from './ApplicationStack';
import { BottomNavigator } from './BottomNavigation';

const LogIn = createAppContainer(ApplicationStack);
const MainApp = createAppContainer(BottomNavigator);

class Router extends Component {
    render() {
        let { user } = this.props
        const current = { ...user }
        console.log(current.details && "current user: " + current.details.username || "no user logged in")
        return (
            !current.details ? <LogIn /> : <MainApp />
        );
    }
};

const mapStateToProps = state => ({
    user: state.user
});

const ActionCreators = Object.assign(
    {},
    userActions
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Router)

