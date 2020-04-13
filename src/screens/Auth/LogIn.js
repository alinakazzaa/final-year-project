import * as React from 'react';
import { View } from 'react-native';
import LogInForm from '../../components/forms/LogInForm';
import { connect } from 'react-redux';
import { setCurrentUserPending, setCurrentUserError, setCurrentUserSuccess, setUsersPending, getAllUsers } from '../../actions/user';
import { auth } from './styles/auth.styles'
import { Gradient } from '../../styles/Gradient';
import { MSG_INCORRECT_PASSWORD, MSG_NO_USER, MSG_EMPTY_FIELDS } from '../../constants/response/messages';
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

    goToRegister = () => {
        this.props.navigation.navigate("Registration")
    }

    logIn = loginUser => {
        const { setCurrentUserPending, setCurrentUserSuccess, setCurrentUserError, user } = this.props
        setCurrentUserPending()

        if (loginUser.username == null || loginUser.password == null) {
            setCurrentUserError(MSG_EMPTY_FIELDS)
        } else {
            let found_user = user.all_users.find(u => u.username == loginUser.username)

            if (found_user) {
                if (loginUser.password == found_user.password)
                    setCurrentUserSuccess(found_user)
                else
                    setCurrentUserError(MSG_INCORRECT_PASSWORD)
            } else {
                setCurrentUserError(MSG_NO_USER)
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


const mapDispatchToProps = {
    setCurrentUserPending,
    setCurrentUserError,
    setCurrentUserSuccess,
    setUsersPending,
    getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen)
