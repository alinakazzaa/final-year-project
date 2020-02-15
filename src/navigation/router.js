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
        // console.log(user.username && "current user: " + user.username || "no user logged in")
        return (
            // <LogIn />
            !user.username ? <LogIn /> : <MainApp />
        );
    }
};

const mapStateToProps = state => ({
    state: state,
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