import * as React from 'react'
import { View, YellowBox } from 'react-native'
import RegistrationForm from '../../components/forms/RegistrationForm'
import { DB_USER_REF } from '../../constants/index'
import { addUser, setLoggedInUserSuccess } from '../../actions/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Gradient } from '../../styles/Gradient'
import { auth } from './styles/auth.styles'
import { IconButton } from '../../components/buttons/IconButton'
import { AppLogo } from '../../components/logo/AppLogo'
import { AppHeader } from '../../layouts/Header';
import { colors } from '../../styles/base'
import { BackButton } from '../../components/buttons/BackButton'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

class RegistrationScreen extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    registerUser = user => {
        addUser(user)
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    logIn = user => {
        const { setLoggedInUserSuccess } = this.props
        DB_USER_REF.on('value', u_snap => {
            u_snap.forEach(item => {
                let details = { ...item.val().details }
                if (details.username == user.username) {
                    let key = item.key
                    let user = { details, id: key }
                    setLoggedInUserSuccess(user)
                }
            })
        })
    }

    render() {
        return (
            <View>
                <Gradient horizontal={true}>
                    <AppHeader transparent={true}
                        left={<View style={auth.back}><BackButton onPress={() => this.props.navigation.goBack()} /></View>} />
                    <View style={auth.regContainer}>
                        <AppLogo large={true} />
                        <RegistrationForm registerUser={this.registerUser} logIn={this.logIn} />
                    </View>
                </Gradient>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.current_user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setLoggedInUserSuccess: setLoggedInUserSuccess
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
