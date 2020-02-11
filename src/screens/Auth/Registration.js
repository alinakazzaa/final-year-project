import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TextInput, Button } from 'react-native';
import RegistrationForm from '../../components/forms/RegistrationForm';
import { DB_USER_REF } from '../../constants/index'
import { addUser, getUserByUsername } from '../../actions/user'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/user';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class RegistrationScreen extends React.Component {

    registerUser = user => {
        addUser(user)
    }

    logIn = user => {
        let { actions } = this.props;
        DB_USER_REF.on('value', u_snap => {
            u_snap.forEach(item => {
                let details = { ...item.val().details }
                if (details.username == user.username) {
                    let key = item.key
                    let user = { details, id: key }
                    actions.setLoggedInUser(user)
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

const ActionCreators = Object.assign(
    {},
    userActions,
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
