import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TextInput, Button } from 'react-native';
import RegistrationForm from '../../components/forms/RegistrationForm';
import { DB_USER_REF } from '../../constants/index'
import { addUser, setLoggedInUserSuccess } from '../../actions/user'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class RegistrationScreen extends React.Component {

    registerUser = user => {
        addUser(user)
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
            <View style={styles.container}>
                <RegistrationForm registerUser={this.registerUser} logIn={this.logIn} />
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
        },
    });

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setLoggedInUserSuccess: setLoggedInUserSuccess
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
