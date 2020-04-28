import * as React from 'react'
import { View } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { CollabForm } from '../../components/forms/CollabForm'
import { connect } from 'react-redux'
import { addCollab } from '../../actions/collab'
import { BackButton } from '../../components/buttons/BackButton'
import { SaveButton } from '../../components/buttons/SaveButton'
import { base } from '../../styles/base'
import { DATE_TODAY } from '../../constants/TodayDate'


class AddCollab extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        collab: { tags: [{ name: '+', editable: false }] }
    }

    componentDidMount() {
        const { project } = this.props
        const { influencer } = this.props.navigation.state.params
        this.setState({
            collab: {
                ...this.state.collab,
                campaign: project.current_project.title,
                active: false,
                date_start: DATE_TODAY,
                influencer: influencer.username
            }
        })
    }

    handleSubmit = () => {
        const { collab } = this.state
        const { project, addCollab } = this.props
        const { influencer } = this.props.navigation.state.params
        const newCollab = {
            ...collab,
            influencer_id:
                influencer.id,
            tags: [...collab.tags.filter(tag => tag.name !== '+')]
        }

        // no same influencer & campaign
        // if(collab.all_collabs.find(c => c.influencer.id == influencer.id))

        addCollab(project.current_project.user_id, project.current_project.id, newCollab)
    }

    handleChange = collab => {
        this.setState({ collab })
    }

    onTagTextChange = (text, index) => {
        const { collab } = this.state
        const updatedTags = [...this.state.collab.tags]
        updatedTags[index] = { ...updatedTags[index], name: text }
        this.setState({ collab: { ...collab, tags: updatedTags } })
    }

    toggleSwitch = value => {
        this.setState({ collab: { ...this.state.collab, active: value } })
    }

    editTag = (tag, index) => {
        let updatedTags = [...this.state.collab.tags]
        let editTag = { name: tag, index, editable: true }

        if (editTag.name == '+') {
            editTag = { ...editTag, name: '' }
        }

        updatedTags.splice(index, 1, editTag)
        this.setState({ collab: { ...this.state.collab, tags: updatedTags } })
    }

    onEndTagEdit = (index, isNew) => {
        const updatedTags = [...this.state.collab.tags]
        const editTag = { ...updatedTags[index], editable: false }

        updatedTags.splice(index, 1, editTag)
        updatedTags.push({ name: '+', editable: false })

        this.setState({ collab: { ...this.state.collab, tags: updatedTags } })
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
                    <CollabForm
                        editTag={this.editTag}
                        tags={collab.tags} collab={collab} onChange={this.handleChange}
                        toggleSwitch={this.toggleSwitch} onTagTextChange={this.onTagTextChange}
                        onEndTagEdit={this.onEndTagEdit} />
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