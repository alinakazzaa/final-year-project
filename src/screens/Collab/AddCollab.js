import * as React from 'react'
import { View, Alert } from 'react-native'
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
        collabValue: { active: false, tags: [{ name: '+', editable: false }] }
    }

    componentDidMount() {
        const { project } = this.props
        const { influencer } = this.props.navigation.state.params
        this.setState({
            collabValue: {
                ...this.state.collabValue,
                campaign: project.current_project.title,
                date_start: DATE_TODAY,
                influencer: influencer.username
            }
        })
    }

    handleSubmit = () => {
        const { collabValue } = this.state
        const { collab, project, addCollab, navigation } = this.props
        const { influencer } = navigation.state.params

        const newCollab = {
            details: {
                ...collabValue, influencer: {
                    id: influencer.id,
                    username: influencer.username, profile_pic_url: influencer.profile_pic_url
                }
            }
        }

        if (collabValue.tags)
            newCollab.details.tags = [...collabValue.tags.filter(tag => tag.name !== '+')]

        // no same influencer & campaign
        if (!collab.all_collabs.find(c => c.details.influencer.id == influencer.id)) {
            addCollab(project.current_project.user_id, project.current_project.id, newCollab)
            Alert.alert("Collaboration added")
            navigation.navigate("AllCollabs")
        } else {
            Alert.alert("Collaboration already exists.\n\nTry a different influencer.")
        }
    }

    handleChange = collabValue => {
        this.setState({ collabValue })
    }

    onTagTextChange = (text, index) => {
        const { collabValue } = this.state
        const updatedTags = [...this.state.collabValue.tags]
        updatedTags[index] = { ...updatedTags[index], name: text }
        this.setState({ collabValue: { ...collabValue, tags: updatedTags } })
    }

    toggleSwitch = value => {
        this.setState({ collabValue: { ...this.state.collabValue, active: value } })
    }

    editTag = (tag, index) => {
        let updatedTags = [...this.state.collabValue.tags]
        let editTag = { name: tag, index, editable: true }

        if (editTag.name == '+') {
            editTag = { ...editTag, name: '' }
        }

        updatedTags.splice(index, 1, editTag)
        this.setState({ collabValue: { ...this.state.collabValue, tags: updatedTags } })
    }

    onEndTagEdit = index => {
        const updatedTags = [...this.state.collabValue.tags]
        const editTag = { ...updatedTags[index], editable: false }

        updatedTags.splice(index, 1, editTag)

        if (!updatedTags.find(tag => tag.name == '+'))
            updatedTags.push({ name: '+', editable: false })


        this.setState({ collabValue: { ...this.state.collabValue, tags: updatedTags } })
    }

    removeTag = name => {
        let updatedTags = [...this.state.collabValue.tags.filter(t => t.name !== name)]
        this.setState({ collabValue: { ...this.state.collabValue, tags: updatedTags } })
    }

    componentWillUnmount() {
        this.setState({})
    }

    render() {
        const { collabValue } = this.state

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
                        collab={collabValue} onChange={this.handleChange}
                        toggleSwitch={this.toggleSwitch} onTagTextChange={this.onTagTextChange}
                        onEndTagEdit={this.onEndTagEdit}
                        removeTag={this.removeTag} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    project: state.project,
    collab: state.collab
})

const mapDispatchToProps = {
    addCollab
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCollab)