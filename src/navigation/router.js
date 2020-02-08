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
        console.log(user.details && "current user: " + user.details.username || "no user logged in")
        return (
            // <LogIn />
            !user.details.username ? <LogIn /> : <MainApp />
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



// https://www.instagram.com/graphql/query/?query_hash=09bb2c060bd093088daac1906a1f1d53&variables={"user_id":"275428276","include_reel":true},headers=


// {"user_id":"275428276","include_reel":true}

// https://www.instagram.com/graphql/query/?query_hash=' + query_hash + '&variables=' + query_variable,headers=header