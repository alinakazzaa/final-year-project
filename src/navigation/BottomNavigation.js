import React from 'react';
import HomeScreen from '../screens/Home/Home';
import SettingsScreen from '../screens/Settings/Settings';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';
import { CollabStack } from './CollabStack';
import { ProjectStack } from './ProjectStack';
import { colors } from '../styles/base';
import { nav } from '../styles/navigation'

let home = false
let proj = true
let collab = false
let settings = false

export const changeActive = tab_name => {
    if (tab_name == 'home') {
        home = true
        proj = false
        collab = false
        settings = false
    } else if (tab_name == 'proj') {
        proj = true
        home = false
        collab = false
        settings = false
    } else if (tab_name == 'collab') {
        collab = true
        home = false
        proj = false
        settings = false
    } else if (tab_name == 'settings') {
        settings = true
        home = false
        proj = false
        collab = false
    }
}

export const BottomNavigator = createBottomTabNavigator(
    {
        // @ts-ignore
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon name={home ? 'home' : 'home-outline'} type='material-community' size={32} color={colors.TERTIARY} onPress={() => changeActive('home')} />
                )
            },

        },
        Projects: {
            screen: ProjectStack,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon name={proj ? 'folder' : 'folder-outline'} type='material-community' size={32} color={colors.TERTIARY} onPress={() => changeActive('proj')} />
                )
            }
        },
        Collabs: {
            screen: CollabStack,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon name={collab ? 'people' : 'people-outline'} type='material' size={32} color={colors.TERTIARY} onPress={() => changeActive('collab')} />
                )
            },
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon name={settings ? 'settings' : 'settings-outline'} type='material-community' size={32} color={colors.TERTIARY} onPress={() => changeActive('settings')} />
                )
            }
        },
    },
    {
        initialRouteName: 'Projects',
        tabBarOptions: {
            showLabel: false,
            style: { ...nav.tabBar },
            tabStyle: { ...nav.tabItem }
        }
    },

);