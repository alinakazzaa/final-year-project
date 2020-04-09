import * as React from 'react';
import { View } from 'react-native';
import LogInForm from '../../components/forms/LogInForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLoggedInUserError, setLoggedInUserSuccess, setUsersPending, getAllUsers } from '../../actions/user';
import { auth } from './styles/auth.styles'
import { Gradient } from '../../styles/Gradient';
import { MSG_INCORRECT_PASSWORD, MSG_NO_USER } from '../../constants/response/messages';
import { AppLogo } from '../../components/logo/AppLogo'

class LogInScreen extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    componentDidMount() {
        const { getAllUsers, setUsersPending } = this.props;
        setUsersPending()
        getAllUsers()
    }

    componentDidUpdate(prev) {
        // if (prev.users != users) {
        //     let user_obj = users.find(u => u.username == "A") || {}
        //     setLoggedInUserSuccess(user_obj)
        // }
    }

    goToRegister = () => {
        this.props.navigation.navigate("Registration")
    }

    logIn = login_user => {
        const { setLoggedInUserSuccess, setLoggedInUserError, user } = this.props;
        let user_obj

        if (login_user.username == null || login_user.username == '') {
            setLoggedInUserError(MSG_NO_USER)
        } else {
            user_obj = user.all_users.find(u => u.username == login_user.username) || {}
            if (login_user.password == null || login_user.password == '' || login_user.password != user_obj.password) {
                setLoggedInUserError(MSG_INCORRECT_PASSWORD)
            } else {
                setLoggedInUserSuccess(user_obj)
            }
        }
    }

    render() {
        const { user } = this.props

        return (
            <View>
                <Gradient horizontal={true}>
                    <View style={auth.logInContainer}>
                        <AppLogo large={true} />
                        <LogInForm logIn={this.logIn} goToRegister={this.goToRegister} error={user.error} />
                    </View>
                </Gradient>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});


const mapDispatchToProps = dispatch => bindActionCreators({
    setLoggedInUserError: setLoggedInUserError,
    setLoggedInUserSuccess: setLoggedInUserSuccess,
    setUsersPending: setUsersPending,
    getAllUsers: getAllUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen)
