import * as React from 'react'
import { View } from 'react-native'
import RegistrationForm from '../../components/forms/RegistrationForm'
import { registerUser, setCurrentUserError } from '../../actions/user'
import { connect } from 'react-redux'
import { Gradient } from '../../styles/Gradient'
import { authStyle } from './styles/auth.styles'
import { AppLogo } from '../../components/logo/AppLogo'
import { AppHeader } from '../../layouts/Header'
import { BackButton } from '../../components/buttons/BackButton'
import { dimensions } from '../../styles/base'
import { MSG_PASSWORDS_DONT_MATCH, MSG_EMPTY_FIELDS } from '../../constants/response/messages'

class RegistrationScreen extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    registerUser = user => {
        const { registerUser, setCurrentUserError } = this.props
        if (user.username == null || user.password == null || user.confirm_password == null || user.name == null) {
            setCurrentUserError(MSG_EMPTY_FIELDS)
        } else if (user.password != user.confirmPassword) {
            setCurrentUserError(MSG_PASSWORDS_DONT_MATCH)
        } else {
            registerUser(user)
        }

    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { user } = this.props
        return (
            <View>
                <Gradient horizontal={true}>
                    <AppHeader transparent={true}
                        left={<View style={authStyle.back}><BackButton onPress={() => this.props.navigation.goBack()} /></View>} />
                    <View style={{ display: 'flex', alignItems: 'center', height: dimensions.fullHeight }}>
                        <AppLogo large={true} />
                        <RegistrationForm error={user.error} registerUser={this.registerUser} />
                    </View>
                </Gradient>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {
    registerUser,
    setCurrentUserError
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
