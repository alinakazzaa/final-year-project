import * as React from 'react'
import { View } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import ProjectForm from '../../components/forms/ProjectForm'
import { addProject } from '../../actions/project'
import { connect } from 'react-redux'
import { BackButton } from '../../components/buttons/BackButton'
import { DATE_TODAY } from '../../constants/TodayDate'
import { SaveButton } from '../../components/buttons/SaveButton'
import { base } from '../../styles/base'

class AddProject extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        project_value: {
            active: false,
            date_created: DATE_TODAY
        }
    }

    handleChange = updated_project => {
        this.setState({ project_value: updated_project })
    }

    handleSubmit = () => {
        const { user, addProject } = this.props
        const { project_value } = this.state
        addProject(user.current_user.id, project_value)
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
                    right={<SaveButton onPress={this.handleSubmit} />}
                />
                <ProjectForm handleChange={this.handleChange} project_value={project_value} toggleSwitch={this.toggleSwitch} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {
    addProject
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject)
