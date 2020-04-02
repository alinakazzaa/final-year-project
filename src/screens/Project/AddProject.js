import * as React from 'react'
import { View, YellowBox } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import ProjectForm from '../../components/forms/ProjectForm'
import { TextButton } from '../../components/buttons/TextButton'
import { addProject } from '../../actions/project'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BackButton } from '../../components/buttons/BackButton'
import { project } from './styles/project.styles'


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

class AddProject extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        project_value: {
            active: false
        }
    }

    handleChange = updated_project => {
        this.setState({ project_value: updated_project })
    }

    handleSubmit = () => {
        const { user, addProject } = this.props
        const { project_value } = this.state
        addProject(user.id, project_value)
        this.props.navigation.navigate("AllProjects")
    }

    toggleSwitch = value => {
        const { project_value } = this.state
        this.setState({ project_value: { ...project_value, active: value } })
    }

    render() {
        const { project_value } = this.state
        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                    right={<TextButton containerStyle={project.saveBtn} onPress={this.handleSubmit} title="Save" />}
                />
                <View style={project.addContainer}>
                    <ProjectForm handleChange={this.handleChange} project_value={project_value} toggleSwitch={this.toggleSwitch} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    state: state,
    user: state.user.current_user,
    current_project: state.project.current_project
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addProject: addProject
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddProject)
