import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TextInput, Button } from 'react-native';
import LogInForm from '../../components/forms/LogInForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserByUsername, setLoggedInUserError, setLoggedInUserSuccess } from '../../actions/user';
// import { getAllUsers } from '../../actions/user';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class LogInScreen extends React.Component {

    componentDidMount() {
        const { setLoggedInUserSuccess } = this.props;
        const user_obj = getUserByUsername("A")
        if (user_obj.username) {
            setLoggedInUserSuccess(user_obj)
        }

    }


    goToRegister = () => {
        this.props.navigation.navigate("Registration")
    }

    logIn = user => {
        let error
        const { setLoggedInUserSuccess, setLoggedInUserError } = this.props;
        const user_obj = getUserByUsername(user.username)

        if (user_obj) {
            if (user.username == user_obj.username) {
                if (user.password == user_obj.password) {
                    setLoggedInUserSuccess(user_obj)
                } else {
                    error = { type: 'incorrect password' }
                    setLoggedInUserError(error)
                }
            } else {
                error = { type: 'no user' }
                setLoggedInUserError(error)
            }
        }



    }

    render() {
        const { error } = this.props
        return (
            <View style={styles.container}>
                <LogInForm logIn={this.logIn} goToRegister={this.goToRegister} error={error} />
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            // alignContent: 'center',
            alignItems: 'center'
        },
    });

const mapStateToProps = state => ({
    user: state.user,
    error: state.user.error,
    pending: state.user.pending
});


const mapDispatchToProps = dispatch => bindActionCreators({
    setLoggedInUserError: setLoggedInUserError,
    setLoggedInUserSuccess: setLoggedInUserSuccess
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen)
