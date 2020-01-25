import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countActions from './src/actions/counts';
import * as textActions from './src/actions/text';

class App extends Component {
  decrementCount() {
    let { count, actions } = this.props;
    count--;
    actions.changeCount(count);
  }
  incrementCount() {
    let { count, actions } = this.props;
    count++;
    actions.changeCount(count);
  }

  changeText = value => {
    let { text, actions } = this.props
    actions.changeText(value);
  }

  render() {
    const { count } = this.props;
    return (
      <View style={styles.container}>
        <TextInput onChangeText={value => this.changeText(value)} style={{ borderColor: 'black', color: 'black' }} />
        <Button
          title="increment"
          onPress={() => this.incrementCount()}
        />
        <Text style={styles.textCenter}>{count}</Text>
        <Button
          title="decrement"
          onPress={() => this.decrementCount()}
        />

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCenter: {
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({
  count: state.count.count,
  text: state.text.text
});

const ActionCreators = Object.assign(
  {},
  countActions,
  textActions
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)