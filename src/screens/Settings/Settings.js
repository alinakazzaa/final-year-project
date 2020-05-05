import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextButton } from '../../components/buttons/TextButton';
import { authStyle } from '../Auth/styles/auth.styles';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user'
import { UserForm } from '../../components/forms/UserForm';
import { base, dimensions, colors } from '../../styles/base';
import { Gradient } from '../../styles/Gradient';
import { AppHeader } from '../../layouts/Header';
import { AppLogo } from '../../components/logo/AppLogo';


class SettingsScreen extends React.Component {


    static navigationOptions = {
        headerShown: false,
    }

    state = {
        userValue: {}
    }

    componentDidMount() {
        const { user } = this.props
        this.setState({ userValue: { ...user.current_user } })
    }

    handleChange = updatedUser => {
        this.setState({ userValue: updatedUser })
    }

    handleSubmit = () => {
        const { user, updateUser } = this.props
        const { userValue } = this.state
        const updatedUser = { ...user.current_user, ...userValue }
        updateUser(updatedUser)
    }

    render() {
        const { userValue } = this.state
        return (
            <View>
                <Gradient horizontal={true}>
                    <AppHeader transparent={true}
                        left={<AppLogo small={true} />} />
                    <View style={{ display: 'flex', marginTop: 50, alignItems: 'center', height: dimensions.fullHeight }}>
                        <UserForm handleChange={this.handleChange} userValue={userValue} />
                        <TextButton title="Save" containerStyle={{ backgroundColor: colors.PRIMARY }} onPress={this.handleSubmit} containerStyle={authStyle.regButton} />
                    </View>
                </Gradient>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)