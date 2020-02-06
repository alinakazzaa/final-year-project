import * as React from 'react';
import { View, Text, YellowBox, StyleSheet } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { createStackNavigator } from 'react-navigation-stack';
import FetchJobForm from '../../components/forms/FetchJobForm';
import { AppHeader } from '../../layouts/Header';
import { TextButton } from '../../components/buttons/TextButton';
import { IconButton } from '../../components/buttons/IconButton';
import { criteria } from '../../constants/Criteria';


class AddFetchJob extends React.Component {

    state = {
        fetch_job: {}
    }

    render() {

        return (
            <View style={styles.container}>
                <AppHeader
                    left={
                        <IconButton color="#493649"
                            type='font-awesome'
                            name='angle-left'
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                        />}
                />
                <FetchJobForm goBack={this.props.navigation.goBack} />
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        saveBtn: {
            marginRight: 10,
            fontWeight: '700'
        },
        text: {
            textAlign: 'center',
            color: 'black'
        }
    });

export default AddFetchJob
