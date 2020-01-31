import * as React from 'react';
import { View, Text, YellowBox } from 'react-native';
import HomeScreen from './src/screens/Home/Home'
import { enableScreens } from 'react-native-screens';
import { createAppContainer } from 'react-navigation';
import BottomNavigation from './src/navigation/BottomNavigation'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProjectScreen from './src/screens/Project/Project';
import CollabScreen from './src/screens/Collab/Collab';
import SettingsScreen from './src/screens/Settings/Settings';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class MyApp extends React.Component {

  render() {
    enableScreens();
    return (
      <View />
    );
  }
}

export default MyApp;
