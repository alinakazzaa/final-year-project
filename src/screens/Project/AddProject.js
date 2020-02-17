import * as React from 'react';
import { View, Text, YellowBox, StyleSheet } from 'react-native';
import { AppHeader } from '../../layouts/Header';
import ProjectForm from '../../components/forms/ProjectForm';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';
import { addProject } from '../../actions/project'
import * as userActions from '../../actions/user';
import * as projectActions from '../../actions/project';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class AddProject extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        project: {}
    }

    handleChange = project => {
        this.setState({ project });
    }

    handleSubmit = () => {
        const { user } = this.props
        const { project } = this.state
        console.log(user)
        // addProject(user.id, project);
        // this.props.navigation.navigate("AllProjects")
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader
                    left={
                        <IconButton color="#493649"
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

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project
});

const ActionCreators = Object.assign(
    {},
    userActions,
    projectActions
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProject)
