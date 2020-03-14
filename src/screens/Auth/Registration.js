import * as React from 'react';
import { View, YellowBox } from 'react-native';
import RegistrationForm from '../../components/forms/RegistrationForm';
import { DB_USER_REF } from '../../constants/index'
import { addUser, setLoggedInUserSuccess } from '../../actions/user'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Gradient } from '../../styles/Gradient';
import { authenticationStyles } from '../../styles/authentication/authenticationStyles'
import { IconButton } from '../../components/buttons/IconButton';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class RegistrationScreen extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    registerUser = user => {
        addUser(user)
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    logIn = user => {
        const { setLoggedInUserSuccess } = this.props;
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
                    <View style={authenticationStyles.container}>
                        <IconButton color="#493649"
                            name='angle-left'
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                        />
                        <RegistrationForm registerUser={this.registerUser} logIn={this.logIn} />
                    </View>
                </Gradient>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setLoggedInUserSuccess: setLoggedInUserSuccess
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
