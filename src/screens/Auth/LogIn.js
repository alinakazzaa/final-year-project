import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TextInput, Button } from 'react-native';
import LogInForm from '../../components/forms/LogInForm';
import { DB_USER_REF } from '../../constants/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/user';
import { getUserByUsername } from '../../actions/user';
// import { getAllUsers } from '../../actions/user';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class LogInScreen extends React.Component {

    goToRegister = () => {
        this.props.navigation.navigate("Registration")
    }

    logIn = user => {
        let { actions } = this.props;
        let user_obj = getUserByUsername(user.username)
        actions.setLoggedInUser(user_obj)
    }

    render() {
        const { navigation } = this.props.navigation
        return (
            <View style={styles.container}>
                <LogInForm logIn={this.logIn} goToRegister={this.goToRegister} />
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
        },
    });

const mapStateToProps = state => ({
    user: state.user
});

const ActionCreators = Object.assign(
    {},
    userActions,
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen)
