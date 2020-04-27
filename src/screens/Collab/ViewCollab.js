import * as React from 'react'
import { View, Text, Linking } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { BackButton } from '../../components/buttons/BackButton'
import { connect } from 'react-redux'
import { collabStyle } from './styles/collab.styles'
import { CollabForm } from '../../components/forms/CollabForm'
import { TagList } from '../../components/list/TagList'
import { fetchPending, fetchResponse } from '../../actions/fetch'
import { PublicationList } from '../../components/list/PublicationList'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { SaveButton } from '../../components/buttons/SaveButton'
import { base } from '../../styles/base'
import { fetchUserMedia } from '../../web/fetchUserMedia'
import { fetchCollabInfluencer, setCollabsPending, updateCollab } from '../../actions/collab'


class ViewCollab extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        tags: [{ name: 'berghain', editable: false }, { name: 'mitte', editable: false }],
        collabValue: { active: false }
    }

    componentDidMount() {
        const { collab } = this.props
        this.setState({ collabValue: { ...collab.current_collab.details, influencer: collab.current_collab.details.influencer } })
        fetchUserMedia(collab.current_collab.details.influencer, ['berghain', 'mitte'], fetchPending, fetchResponse)
    }

    componentDidUpdate(prev) {
        const { collab, fetchPending, fetchResponse } = this.props

    }

    goToPublication = pub => {

    }

    handleChange = collab => {
        this.setState({ collabValue: collab })
    }

    toggleSwitch = value => {
        const { collabValue } = this.state
        this.setState({ collabValue: { ...collabValue, active: value } })
    }

    editTag = (tag, index) => {
        const hashtags = [...this.state.tags]
        const hashtag = { ...hashtags[index], editable: !hashtags[index].editable }
        hashtags.splice(index, 1, hashtag)
        this.setState({ tags: hashtags })
    }

    handleSubmit = () => {
        const { collab, updateCollab } = this.props
        const { collabValue } = this.state
        updateCollab({ details: { ...collab.current_collab.details, ...collabValue } })
        // navigation.goBack()
    }

    onThumbnailPress = () => {
        Linking.openURL('instagram://user?username=alinakazzaa')
    }


    render() {
        const { tags, collabValue } = this.state
        const { collab, navigation } = this.props

        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => navigation.goBack()} />}
                    right={<SaveButton onPress={this.handleSubmit} />}
                />
                <View style={collabStyle.viewContainer}>
                    <CollabForm toggleSwitch={this.toggleSwitch} onChange={this.handleChange}
                        collab={collabValue} />
                    <View style={collabStyle.tagsBox}>
                        <Text style={base.title}>Hashtags</Text>
                        <TagList tags={tags} onPress={this.editTag} />
                    </View>
                    {collab.pending && <LoadingScreen />}
                    <View style={base.title}>
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
    fetchResponse,
    fetchCollabInfluencer,
    setCollabsPending,
    updateCollab
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCollab)
