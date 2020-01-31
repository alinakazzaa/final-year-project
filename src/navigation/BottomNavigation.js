import React from 'react';
import HomeScreen from '../screens/Home/Home';
import LogInScreen from '../screens/LogIn/LogInScreen';
import SettingsScreen from '../screens/Settings/Settings';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';
import { ProjectStackNavigator } from './ProjectStack';
import { CollabStackNavigator } from './CollabStack';


const BottomNavigator = createBottomTabNavigator(
    {
        LogIn: {
            screen: LogInScreen,
            navigationOptions: {
                title: 'LogIn',
            }
        },
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                title: 'Home',
                tabBarIcon: () => (
                    <Icon name="home" size={30} color="#5d4d50" />
                )
            }
        },
        Projects: {
            screen: ProjectStackNavigator,
            navigationOptions: {
                title: 'Projects',
                tabBarIcon: () => (
                    <Icon name="assignment" size={30} color="#5d4d50" />
                )
            }
        },
        Collabs: {
            screen: CollabStackNavigator,
            navigationOptions: {
                title: 'Collabs',
                tabBarIcon: () => (
                    <Icon name="people" size={35} color="#5d4d50" />
                )
            },
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                title: 'Settings',
                tabBarIcon: () => (
                    <Icon name="settings" size={30} color="#5d4d50" />
                )
            }
        },
    },
    {
        initialRouteName: 'LogIn'
    },
);

export default BottomNavigator