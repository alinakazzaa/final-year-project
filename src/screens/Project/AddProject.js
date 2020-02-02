import * as React from 'react';
import { View, Text, YellowBox, StyleSheet } from 'react-native';
import { AppHeader } from '../../layouts/Header';
import ProjectForm from '../../components/forms/ProjectForm';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';
import { addProject } from '../../database/services/ProjectService'


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class AddProject extends React.Component {

    state = {
        project: {}
    }

    handleChange = project => {
        this.setState({ project: project });
    }

    handleSubmit = () => {
        const project = this.state.project
        // will replace user ID with one in redux state
        addProject("-LzOYfdTgQu-Hqxl9bGz", project);
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader
                    left={
                        <IconButton color="#493649"
                            type='angle-left'
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                        />}
                    right={
                        <View style={styles.saveBtn}>
                            <TextButton onPress={this.handleSubmit} title="Save" />
                        </View>}
                />
                <ProjectForm onChange={this.handleChange} />
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
    });

export default AddProject
