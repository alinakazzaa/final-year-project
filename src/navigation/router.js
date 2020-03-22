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
        let { user, error, pending } = this.props

        return (
            user.username == null ? <LogIn /> : <MainApp />
        );
    }
};

const mapStateToProps = state => ({
    state: state,
    user: state.user.current_user,
    error: state.user.error,
    pending: state.user.pending
});

const ActionCreators = Object.assign(
    {},
    userActions
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Router)