import * as React from 'react';
import { View, YellowBox } from 'react-native';
import { enableScreens } from 'react-native-screens';

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
