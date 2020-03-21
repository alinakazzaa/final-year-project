import * as React from 'react'
import { View, YellowBox, StyleSheet } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import ProjectForm from '../../components/forms/ProjectForm'
import { IconButton } from '../../components/buttons/IconButton'
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
        project: {}
    }

    handleChange = project => {
        this.setState({ project })
    }

    handleSubmit = () => {
        const { user, addProject } = this.props
        const { project } = this.state
        addProject(user.id, project)
        this.props.navigation.navigate("AllProjects")
    }

    render() {
        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                    right={<TextButton containerStyle={project.saveBtn} onPress={this.handleSubmit} title="Save" />}
                />
                <View style={project.addContainer}>
                    <ProjectForm onChange={this.handleChange} />
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
    addProject: addProject
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddProject)
