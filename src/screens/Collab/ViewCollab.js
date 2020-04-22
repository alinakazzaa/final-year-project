import * as React from 'react'
import { View, Text, Linking } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { BackButton } from '../../components/buttons/BackButton'
import { connect } from 'react-redux'
import { collabStyle } from './styles/collab.styles'
import { CollabForm } from '../../components/forms/CollabForm'
import { TagList } from '../../components/list/TagList'
import { getInfluByUsername } from '../../actions/influencer'
import { fetchUserMedia } from '../../web/fetchUserMedia'
import { fetchPending, fetchResponse } from '../../actions/fetch'
import { PublicationList } from '../../components/list/PublicationList'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { SaveButton } from '../../components/buttons/SaveButton'
import { base } from '../../styles/base'


class ViewCollab extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        tags: [{ name: 'berghain', editable: false }, { name: 'mitte', editable: false }]
    }

    componentDidMount() {
        const { fetchPending, fetchResponse } = this.props
        let influ = getInfluByUsername('juanchoiregui')

        // if (influ.id) {
        //     fetchUserMedia(influ.id, ['berghain', 'mitte'], fetchPending, fetchResponse)
        // }
    }

    goToPublication = pub => {

    }

    handleChange = collab => {
        // let updatedProject = {
        //     ...this.state.project_value,
        //     ...project
        // }
        // this.setState({ project: updatedProject })
    }

    editTag = (tag, index) => {
        const hashtags = [...this.state.tags]
        const hashtag = { ...hashtags[index], editable: !hashtags[index].editable }
        hashtags.splice(index, 1, hashtag)
        this.setState({ tags: hashtags })
    }

    handleSubmit = () => {
        // const { user, navigation, updateProject } = this.props
        // let { project_value } = this.state
        // updateProject(user.id, project_value.id, project_value)
        // navigation.goBack()
    }

    onThumbnailPress = () => {
        Linking.openURL('instagram://user?username=alinakazzaa')
    }




    render() {
        const { tags } = this.state
        const { collab, navigation } = this.props

        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => navigation.goBack()} />}
                    right={<SaveButton onPress={this.handleSubmit} />}
                />
                <View style={collabStyle.viewContainer}>
                    <CollabForm onChange={this.handleChange} collab={collab.current_collab} />
                    <View style={collabStyle.tagsBox}>
                        <Text style={base.title}>Hashtags</Text>
                        <TagList tags={tags} onPress={this.editTag} />
                    </View>
                    {collab.pending && <LoadingScreen />}
                    <View style={collabStyle.header}>
                        <Text style={base.title}>Publications</Text>
                    </View>
                    {collab.current_collab.details.active ?
                        <PublicationList publications={collab.current_collab.publications}
                            onPress={this.onThumbnailPress} /> :
                        <View style={collabStyle.listView}><Text style={base.noneMessage}>No publications yet</Text></View>}
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    collab: state.collab
})

const mapDispatchToProps = {
    fetchPending,
    fetchResponse
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCollab)
