import * as React from 'react'
import { View } from 'react-native'
import LogInForm from '../../components/forms/LogInForm'
import { connect } from 'react-redux'
import { setCurrentUserError, setCurrentUserSuccess, setUsersPending, getAllUsers } from '../../actions/user'
import { auth } from './styles/auth.styles'
import { Gradient } from '../../styles/Gradient'
import { AppLogo } from '../../components/logo/AppLogo'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { MSG_EMPTY_FIELDS, MSG_INCORRECT_PASSWORD, MSG_NO_USER } from '../../constants/response/messages'

class LogInScreen extends React.Component {

    state = {
        isLoading: false
    }

    static navigationOptions = {
        headerShown: false,
    }

    componentDidMount() {
        const { getAllUsers, setUsersPending } = this.props
        setUsersPending()
        getAllUsers()
    }

    goToRegister = () => {
        this.props.navigation.navigate("Registration")
    }

    logIn = userValue => {
        const { user, setCurrentUserSuccess, setCurrentUserError } = this.props

        if (userValue.username == null || userValue.password == null) {
            setCurrentUserError(MSG_EMPTY_FIELDS)
        } else {
            let found_user = user.all_users.find(u => u.username.toLowerCase() == userValue.username.toLowerCase())

            if (found_user) {
                if (userValue.password == found_user.password)
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
                {user.pending ? <LoadingScreen size='large' text="Welcome message or screen with animation" /> : <Gradient horizontal={true}>
                    <View style={auth.logInContainer}>
                        <AppLogo large={true} />
                        <LogInForm logIn={this.logIn} goToRegister={this.goToRegister} error={user.error} />
                    </View>
                </Gradient>}

            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})


const mapDispatchToProps = {
    setCurrentUserError,
    setCurrentUserSuccess,
    setUsersPending,
    getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen)
