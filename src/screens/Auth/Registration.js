import * as React from 'react'
import { View } from 'react-native'
import RegistrationForm from '../../components/forms/RegistrationForm'
import { addUser, setLoggedInUserSuccess, getUserByUsername } from '../../actions/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Gradient } from '../../styles/Gradient'
import { auth } from './styles/auth.styles'
import { AppLogo } from '../../components/logo/AppLogo'
import { AppHeader } from '../../layouts/Header';
import { BackButton } from '../../components/buttons/BackButton'

class RegistrationScreen extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    registerUser = user => {
        const { setLoggedInUserSuccess } = this.props
        addUser(user)
        const c_user = getUserByUsername(user.username)
        setLoggedInUserSuccess(c_user)
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View>
                <Gradient horizontal={true}>
                    <AppHeader transparent={true}
                        left={<View style={auth.back}><BackButton onPress={() => this.props.navigation.goBack()} /></View>} />
                    <View style={auth.regContainer}>
                        <AppLogo large={true} />
                        <RegistrationForm registerUser={this.registerUser} />
                    </View>
                </Gradient>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setLoggedInUserSuccess: setLoggedInUserSuccess
}, dispatch)

export default connect(null, mapDispatchToProps)(RegistrationScreen)
