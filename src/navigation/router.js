import React from 'react';
import {
    AppRegistry,
    Text,
} from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/Home/Home';
import { createAppContainer } from 'react-navigation';

const Router = createStackNavigator({
    Home: { screen: HomeScreen },
});

const RouteContainer = createAppContainer(Router);

export default class App extends React.Component {
    render() {
        return <RouteContainer />;
    }
}