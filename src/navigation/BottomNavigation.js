import React from 'react';
import HomeScreen from '../screens/Home/Home';
import SettingsScreen from '../screens/Settings/Settings';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';
import { CollabStack } from './CollabStack';
import { ProjectStack } from './ProjectStack';
import { colors } from '../styles/base';
import { nav } from '../styles/navigation'

export const BottomNavigator = createBottomTabNavigator(
    {
        // @ts-ignore
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: item => {
                    return <Icon name={item.focused ? 'home' : 'home-outline'} type='material-community' size={32} color={colors.TERTIARY} />
                }
            },

        },
        Projects: {
            screen: ProjectStack,
            navigationOptions: {
                tabBarIcon: item => {
                    return <Icon name={item.focused ? 'folder' : 'folder-outline'} type='material-community' size={32} color={colors.TERTIARY} />
                }
            }
        },
        Collabs: {
            screen: CollabStack,
            navigationOptions: {
                tabBarIcon: item => {
                    return <Icon name={item.focused ? 'people' : 'people-outline'} type='material' size={34} color={colors.TERTIARY} />
                }
            },
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarIcon: item => {
                    return <Icon name={item.focused ? 'account' : 'account-outline'} type='material-community' size={30} color={colors.TERTIARY} />
                }
            }
        },
    },
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            showLabel: false,
            style: { ...nav.tabBar }
        }
    },

);