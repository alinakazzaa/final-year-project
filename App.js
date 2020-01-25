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
      <Router>
        <Switch>
          <Route path="/home">
            <HomeScreen />
          </Route>
          <Route path="/projects">
            <ProjectScreen />
          </Route>
          <Route path="/collabs">
            <CollabScreen />
          </Route>
          <Route path="/settings">
            <SettingsScreen />
          </Route>
        </Switch>
      </Router>
    );
  }
}

const AppContainer = createAppContainer(BottomNavigation);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
