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
            <View style={styles.container}>
                <AppHeader
                    gradient={true}
                    left={
                        <BackButton onPress={() => this.props.navigation.goBack()} />}
                    right={
                        <View style={styles.saveBtn}>
                            <TextButton onPress={this.handleSubmit} title="Save" />
                        </View>}
                />
                <ProjectForm onChange={this.handleChange} />
            </View>
        )
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
    })

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addProject: addProject
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddProject)
