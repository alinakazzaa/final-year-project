import React from 'react';
import {
    AppRegistry,
    Text,
} from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/Home/Home';
import { createAppContainer } from 'react-navigation';
import { BottomNavigator } from './BottomNavigation'

const RouteContainer = createAppContainer(BottomNavigator);

export default class App extends React.Component {
    render() {
        return <RouteContainer />;
    }
}