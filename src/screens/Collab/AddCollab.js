import * as React from 'react'
import { View } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import CollabForm from '../../components/forms/CollabForm'
import { connect } from 'react-redux'
import { addCollab } from '../../actions/collab'
import { BackButton } from '../../components/buttons/BackButton'
import { collabStyle } from './styles/collab.styles'
import { SaveButton } from '../../components/buttons/SaveButton'


class AddCollab extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    handleSubmit = () => {
        const { user, project, addCollab, navigation } = this.props
        addCollab(user.current_user.id, project.current_project.id, { ...this.state.collab })
        navigation.goBack()
    }

    handleChange = collab => {
        this.setState({ collab: collab })
    }

    render() {
        const { project, navigation } = this.props
        const { influencer } = navigation.state.params

        return (
            <View style={collabStyle.viewContainer}>
                <AppHeader
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                    right={<SaveButton onPress={this.handleSubmit} />}
                    gradient={true}
                />
                <CollabForm influencer={influencer} current_project={project.current_project} goBack={navigation.goBack} onChange={this.handleChange} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    project: state.project,
    collab: state.collab
})

const mapDispatchToProps = {
    addCollab
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCollab)