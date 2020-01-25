import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/screens/Home';
import AddItem from './src/screens/AddItem';
import ListItem from './src/screens/ListItem';
import AddUser from './src/screens/AddUser';
import ListUsers from './src/screens/ListUsers';
import AddProject from './src/screens/AddProject';
import ListProjects from './src/screens/ListProjects';
import { YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const AppNavigator = createStackNavigator({
  ListItemScreen: { screen: ListItem },
  AddItemScreen: { screen: AddItem },
  HomeScreen: { screen: Home },
  ListUsersScreen: { screen: ListUsers },
  AddUserScreen: { screen: AddUser },
  ListProjectsScreen: { screen: ListProjects },
  AddProjectScreen: { screen: AddProject },
},
  {
    initialRouteName: 'ListProjectsScreen'
  });

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}