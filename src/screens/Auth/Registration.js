import * as React from 'react'
import { View } from 'react-native'
import RegistrationForm from '../../components/forms/RegistrationForm'
import { registerUser } from '../../actions/user'
import { connect } from 'react-redux'
import { Gradient } from '../../styles/Gradient'
import { authStyle } from './styles/auth.styles'
import { AppLogo } from '../../components/logo/AppLogo'
import { AppHeader } from '../../layouts/Header'
import { BackButton } from '../../components/buttons/BackButton'

class RegistrationScreen extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    registerUser = user => {
        const { registerUser } = this.props
        registerUser(user)
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View>
                <Gradient horizontal={true}>
                    <AppHeader transparent={true}
                        left={<View style={authStyle.back}><BackButton onPress={() => this.props.navigation.goBack()} /></View>} />
                    <View style={authStyle.regContainer}>
                        <AppLogo large={true} />
                        <RegistrationForm registerUser={this.registerUser} />
                    </View>
                </Gradient>
            </View>
        )
    }
}

const mapDispatchToProps = {
    registerUser
}

export default connect(null, mapDispatchToProps)(RegistrationScreen)
