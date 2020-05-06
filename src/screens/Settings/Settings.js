import * as React from 'react'
import { View } from 'react-native'
import { TextButton } from '../../components/buttons/TextButton'
import { authStyle } from '../Auth/styles/auth.styles'
import { connect } from 'react-redux'
import { updateUser, setCurrentUserError, setCurrentUserSuccess } from '../../actions/user'
import { UserForm } from '../../components/forms/UserForm'
import { dimensions, colors } from '../../styles/base'
import { Gradient } from '../../layouts/Gradient/Gradient'
import { AppHeader } from '../../layouts/Header/Header'
import { AppLogo } from '../../components/logo/AppLogo'
import { MSG_EMPTY_FIELDS, MSG_PASSWORDS_DONT_MATCH } from '../../constants/response/messages'


class SettingsScreen extends React.Component {


    static navigationOptions = {
        headerShown: false,
    }

    state = {
        userValue: {},
        saved: false
    }

    componentDidMount() {
        const { user } = this.props
        this.setState({ userValue: { ...user.current_user, password: null, confirm_password: null } })
    }

    handleChange = updatedUser => {
        this.setState({ userValue: updatedUser })
    }

    handleSubmit = () => {
        const { user, updateUser, setCurrentUserError, setCurrentUserSuccess } = this.props
        const { userValue } = this.state
        const updatedUser = { ...user.current_user, ...userValue }
        if (userValue.password == null || userValue.confirm_password == null || userValue.name == null ||
            userValue.password == "" || userValue.confirm_password == "" || userValue.name == "") {
            setCurrentUserError(MSG_EMPTY_FIELDS)
        } else if (userValue.password != userValue.confirm_password) {
            setCurrentUserError(MSG_PASSWORDS_DONT_MATCH)
        } else {
            setCurrentUserSuccess(updatedUser)
            updateUser(updatedUser)
            this.setState({ saved: true, userValue: { ...this.state.userValue, password: null, confirm_password: null } })
        }

    }

    render() {
        const { user } = this.props
        const { userValue } = this.state
        return (
            <View>
                <Gradient horizontal={true}>
                    <AppHeader transparent={true}
                        left={<AppLogo small={true} />} />
                    <View style={{ display: 'flex', marginTop: 50, alignItems: 'center', height: dimensions.fullHeight }}>
                        <UserForm saved={this.state.saved} error={user.error} handleChange={this.handleChange} userValue={userValue} />
                        <TextButton title="Save" containerStyle={{ backgroundColor: colors.PRIMARY }} onPress={this.handleSubmit} containerStyle={authStyle.regButton} />
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
    updateUser,
    setCurrentUserError,
    setCurrentUserSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)