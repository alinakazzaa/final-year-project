import { createStackNavigator } from 'react-navigation-stack';
import LogInScreen from '../screens/Auth/LogIn';
import RegistrationScreen from '../screens/Auth/Registration';
import HomeScreen from '../screens/Home/Home'

export const ApplicationStack = createStackNavigator({
    LogIn: { screen: LogInScreen },
    Registration: { screen: RegistrationScreen },
    Home: { screen: HomeScreen },
},
    {
        initialRouteName: 'LogIn'
    });


