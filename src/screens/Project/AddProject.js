import * as React from 'react';
import { View, Text, YellowBox, StyleSheet } from 'react-native';
import { AppHeader } from '../../layouts/Header';
import ProjectForm from '../../components/forms/ProjectForm';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';
import { addProject } from '../../database/services/ProjectService'
import { DATE_TODAY } from '../../constants/TodayDate'


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class AddProject extends React.Component {

    componentDidMount() {
        const { navigation } = this.props;
        const user = navigation.getParam('user');
        this.setState({ user })
    }

    state = {
        user: {},
        project: {}
    }

    handleChange = project => {
        this.setState({ project: project });
    }

    handleSubmit = () => {
        const { project, user } = this.state
        console.log()
        project.date_created = DATE_TODAY
        addProject(user.details.id, project);
        this.props.navigation.navigate("AllProjects")
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
