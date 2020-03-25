import * as React from 'react';
import { View, YellowBox } from 'react-native';
import LogInForm from '../../components/forms/LogInForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLoggedInUserError, setLoggedInUserSuccess, setUsersPending, getAllUsers } from '../../actions/user';
import { auth } from './styles/auth.styles'
import { Gradient } from '../../styles/Gradient';
import { INCORRECT_PASSWORD, NO_USER } from '../../constants/response/messages';
import { AppLogo } from '../../components/logo/AppLogo'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class LogInScreen extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    componentDidMount() {
        const { getAllUsers, setUsersPending, users } = this.props;
        setUsersPending()
        getAllUsers()
        // let user_obj = users.find(u => u.username == "A") || {}
        // setLoggedInUserSuccess(user_obj)
    }

    componentDidUpdate(prev) {
        const { getAllUsers, setUsersPending, users, pending } = this.props
        if (prev.state !== this.props.state && pending) {
            getAllUsers()
        }
    }

    goToRegister = () => {
        this.props.navigation.navigate("Registration")
    }

    logIn = user => {
        const { setLoggedInUserSuccess, setLoggedInUserError, users } = this.props;
        let user_obj

        if (user.username == null || user.username == '') {
            setLoggedInUserError(NO_USER)
        } else {
            user_obj = users.find(u => u.username == user.username) || {}
            if (user.password == null || user.password == '' || user.password != user_obj.password) {
                setLoggedInUserError(INCORRECT_PASSWORD)
            } else {
                setLoggedInUserSuccess(user_obj)
            }
        }
    }

    render() {
        const { error, state, users } = this.props
        console.log(users)
        return (
            <View>
                <Gradient horizontal={true}>
                    <View style={auth.logInContainer}>
                        <AppLogo large={true} />
                        <LogInForm logIn={this.logIn} goToRegister={this.goToRegister} error={error} />
                    </View>
                </Gradient>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    state: state.user,
    users: state.user.users,
    error: state.user.error,
    pending: state.user.pending
});


const mapDispatchToProps = dispatch => bindActionCreators({
    setLoggedInUserError: setLoggedInUserError,
    setLoggedInUserSuccess: setLoggedInUserSuccess,
    setUsersPending: setUsersPending,
    getAllUsers: getAllUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen)
