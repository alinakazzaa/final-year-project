import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert, Image } from 'react-native';
import InstagramLogin from 'react-native-instagram-login';
import LinearGradient from 'react-native-linear-gradient';



class LogInScreen extends React.Component {
    state = {
        token: "none",
        url: "none",
    }

    static navigationOptions = {
        title: 'LogIn',

    };

    componentDidMount() {
        Linking.getInitialURL().then((url) => {
            if (url) {
                console.log('Initial url is: ' + url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    onLoginSuccess = token => {
        console.log(token)
        this.setState({ token })
    }

    render() {

        const { props } = this.props;

        return (
            <View style={styles.main}>
                <View>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.55 }} colors={['#584158', '#F8F9FD']}>
                        <View style={styles.button}>
                            <View style={styles.logInMsg}>
                                <Text style={styles.largeTitle}>Sign up with</Text>
                                <Image style={{ width: 300, height: 70, padding: 40 }} source={require('../../assets/resources/images/instalogo.png')} />
                            </View>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 2, y: 0 }} colors={['#584158', '#2c212c']} style={styles.linearGradient}>
                                <TouchableOpacity onPress={() => this.instagramLogin.show()}>
                                    <Text style={styles.buttonText}>
                                        Log In
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <InstagramLogin
                                ref={ref => this.instagramLogin = ref}
                                clientId='9ccb0cc55e2a4d568603f4a1683b415f'
                                redirectUrl='https://alina-proxy.herokuapp.com/deep-link/home'
                                scopes={['basic']}
                                onLoginSuccess={token => this.onLoginSuccess(token)}
                                onLoginFailure={(data) => Alert.alert(data)}
                                startInLoadingState={true}
                                shouldStartLoad={true}
                                cacheEnabled={false} // ensures user doesn't stay signed in while I figure out how to log in
                                incognito={true}
                                thirdPartyCookiesEnabled={false}
                                sharedCookiesEnabled={false}
                                domStorageEnabled={false}
                            />
                            {/* <TouchableOpacity>
            <Text style={{color: 'black'}}>
              Database
            </Text>
          </TouchableOpacity> */}
                        </View>
                    </LinearGradient>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create(
    {
        main:
        {
            backgroundColor: '#efeff5',

            fontWeight: 'bold',
        },
        text: {
            color: '#333942',
            textAlign: 'center',
        },
        largeTitle: {
            fontSize: 30,
            color: '#0B0033',
            fontFamily: 'Avenir-Book',
            fontWeight: "700",
            textAlign: 'center',
            paddingBottom: 20,
        },
        button: {
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
        logInMsg: {
            justifyContent: 'center',
            height: "20%",
            marginTop: '5%',
        },
        icon: {
            width: 24,
            height: 24,
            color: '#0B0033',
        },
        listItem: {
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            backgroundColor: '#F7F4FF',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#908AA3',
            color: "#0B0033",
            margin: 5,
            padding: 5,
            paddingLeft: 10,
            paddingRight: 10,
            marginLeft: '4%',
            marginRight: '4%',
            height: 70,
            paddingTop: '4%',
            // width: '75%',
        },
        colTitles: {
            color: '#0B0033',
            fontSize: 15,
            fontWeight: '700',
            margin: 2,
            padding: 3,
            justifyContent: 'flex-end',
            width: '25%',

        },
        itemData: {
            color: '#0B0033',
            margin: 2,
            padding: 3,
            justifyContent: 'flex-end',
            width: '25%',
        },
        listHeader: {
            display: 'flex',
            flexDirection: 'row',
            padding: 5,
            paddingTop: 20,
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10,
            marginLeft: '4%',
            marginRight: '4%',
        },
        circleGradient: {
            backgroundColor: "white",
            borderRadius: 5
        },
        visit: {
            margin: 4,
            paddingHorizontal: 6,
            textAlign: "center",
            backgroundColor: "white",
            color: '#008f68',
            fontSize: 12
        },
        linearGradient: {
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 5,
            width: '60%',
            marginTop: '10%',
        },
        buttonText: {
            fontSize: 20,
            fontFamily: 'Gill Sans',
            margin: 10,
            color: '#ffffff',
            backgroundColor: 'transparent',
            height: 25,
            textTransform: 'uppercase',
            textAlign: 'center',
            fontWeight: 'bold',
        },
    }
);


export default LogInScreen;