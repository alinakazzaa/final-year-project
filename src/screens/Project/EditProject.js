import * as React from 'react';
import { View, Text, YellowBox, StyleSheet } from 'react-native';
import { updateProject, getUserProjects } from '../../actions/project'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { createStackNavigator } from 'react-navigation-stack';
import { AppHeader } from '../../layouts/Header';
import { TextButton } from '../../components/buttons/TextButton';
import { IconButton } from '../../components/buttons/IconButton';
import ProjectForm from '../../components/forms/ProjectForm';
import { db } from '../../database/config/db';

import * as projectActions from '../../actions/project';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

let usersRef = db.ref('/Users');

class EditProject extends React.Component {

    state = {
        project: {}
    }

    componentDidMount() {
        const { current_project } = this.props;
        if (current_project.title) {
            this.setState({ project: { ...current_project } })
        }

    }

    handleChange = project => {
        let updatedProject = {
            ...this.state.project,
            ...project
        }
        this.setState({ project: updatedProject });
    }

    handleSubmit = () => {
        const { user } = this.props
        let project = this.state.project

        updateProject(user.id, project.id, project)
        this.props.navigation.navigate.goBack()

    }

    render() {
        const { current_project } = this.props
        return (
            <View style={styles.container}>
                <AppHeader
                    right={
                        <View style={styles.saveBtn}>
                            <TextButton onPress={this.handleSubmit} title="Save" />
                        </View>}
                />
                <ProjectForm onChange={this.handleChange} project={current_project} />
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        text: {
            textAlign: 'center',
            color: 'black'
        },
        saveBtn: {
            marginRight: 10,
            fontWeight: '700'
        },
    });

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project
});

const ActionCreators = Object.assign(
    {},
    projectActions
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProject)
