import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TextInput, Button } from 'react-native';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/user';
import { DB_USER_REF } from '../../constants/index'


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class HomeScreen extends React.Component {

    render() {
        const { user, actions } = this.props
        const current_user = { ...user }
        return (
            <View style={styles.main}>
                <AppHeader
                    right={<IconButton color="#5d4d50"
                        type='font-awesome'
                        name='sign-out'
                        size={30}
                        onPress={() => actions.logOutUser()}
                    />}
                />
                <View style={styles.logInMsg}><Text style={styles.largeTitle}>Welcome!</Text></View>
                <View style={styles.logInMsg}>
                    <Text style={styles.largeTitle}>Recent posts by influencers....</Text>
                    <Text style={styles.largeTitle}>{`Current user ${current_user.username}`}</Text>
                </View>
                <View style={styles.logInMsg}>
                    <Text style={styles.largeTitle}>Maybe recently openet projects....</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        main:
        {
            backgroundColor: '#F5F5F5',
            flex: 1
        },
        largeTitle: {
            fontSize: 18,
            color: '#0B0033',
            fontFamily: 'Avenir-Book',
            fontWeight: "700",
            textAlign: 'center',
        },
        logInMsg: {
            justifyContent: 'center',
            height: "20%",
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        textCenter: {
            textAlign: 'center'
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
