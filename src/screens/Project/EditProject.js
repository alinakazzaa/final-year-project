import * as React from 'react'
import { View, YellowBox, TouchableOpacity, Text } from 'react-native'
import { updateProject } from '../../actions/project'
import { AppHeader } from '../../layouts/Header'
import { TextButton } from '../../components/buttons/TextButton'
import { IconButton } from '../../components/buttons/IconButton'
import ProjectForm from '../../components/forms/ProjectForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { project } from './styles/project.styles'
import { BackButton } from '../../components/buttons/BackButton'
import { SwitchItem } from '../../components/switch/Switch'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

class EditProject extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        project_value: {
            active: false
        }
    }

    componentDidMount() {
        const { current_project } = this.props
        if (current_project.title) {
            this.setState({ project_value: { ...current_project } })
        }

    }

    handleChange = project => {
        let updatedProject = {
            ...this.state.project_value,
            ...project
        }
        this.setState({ project: updatedProject })
    }

    handleSubmit = () => {
        const { user, navigation, updateProject } = this.props
        let { project_value } = this.state
        updateProject(user.id, project_value.id, project)
        navigation.goBack()
    }

    toggleSwitch = () => {
        const { project_value } = this.state
        project_value.active = !project_value.active
        this.setState({ project_value })
    }

    render() {
        const { current_project } = this.props
        const { project_value } = this.state
        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                    right={<TextButton containerStyle={project.saveBtn} onPress={this.handleSubmit} title="Save" />}
                />
                <View style={project.viewContainer}>
                    <View>
                        <View style={project.header}>
                            <Text style={project.title}>Details</Text>
                        </View>
                        <View style={project.detailsBox}>
                            <View style={project.labelsCol}>
                                <Text style={project.label}>Title</Text>
                                <Text style={project.label}>Date created</Text>
                                <Text style={project.label}>Description</Text>
                            </View>
                            <ProjectForm onChange={this.handleChange} project={current_project} />
                        </View>
                        <View style={project.switchView}>
                            <Text style={project.labelActive}>Active</Text>
                            <SwitchItem value={project_value.active} onChange={this.toggleSwitch} />
                        </View>
                    </View>
                    <View style={project.collabBox}>
                        <View style={project.listHead}>
                            <Text style={project.title}>Collaborations</Text>
                            <TouchableOpacity style={project.viewAllBtn} onPress={() => this.props.navigation.navigate('AllCollabs')}>
                                <Text style={project.title}>View All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project
})

const mapDispatchToProps = dispatch => bindActionCreators({
    updateProject: updateProject
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProject)
