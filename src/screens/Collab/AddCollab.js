import * as React from 'react'
import { View } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { CollabForm } from '../../components/forms/CollabForm'
import { connect } from 'react-redux'
import { addCollab } from '../../actions/collab'
import { BackButton } from '../../components/buttons/BackButton'
import { SaveButton } from '../../components/buttons/SaveButton'
import { base } from '../../styles/base'


class AddCollab extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        collab: {}
    }

    componentDidMount() {
        const { influencer } = this.props.navigation.state.params
        this.setState({ collab: { influencer: influencer.username } })
    }

    handleSubmit = () => {
        const { project, addCollab, navigation } = this.props
        addCollab(project.current_project.current_user.id, project.current_project.id, { ...this.state.collab })
        navigation.goBack()
    }

    handleChange = collab => {
        this.setState({ collab })
    }

    toggleSwitch = value => {
        this.setState({ collab: { ...this.state.collab, active: value } })
    }

    render() {
        const { collab } = this.state

        return (
            <View>
                <AppHeader
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                    right={<SaveButton onPress={this.handleSubmit} />}
                    gradient={true}
                />
                <View style={base.container}>
                    <CollabForm collab={collab} onChange={this.handleChange} toggleSwitch={this.toggleSwitch} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    project: state.project
})

const mapDispatchToProps = {
    addCollab
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCollab)