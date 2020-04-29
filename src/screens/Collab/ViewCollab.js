import * as React from 'react'
import { View, Text, Linking } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { BackButton } from '../../components/buttons/BackButton'
import { connect } from 'react-redux'
import { collabStyle } from './styles/collab.styles'
import { CollabForm } from '../../components/forms/CollabForm'
import { fetchPending, fetchResponse } from '../../actions/fetch'
import { PublicationList } from '../../components/list/PublicationList'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { SaveButton } from '../../components/buttons/SaveButton'
import { base } from '../../styles/base'
import { fetchUserMedia } from '../../web/fetchUserMedia'
import { fetchCollabInfluencer, setCollabsPending, updateCollab, clearCurrentCollab } from '../../actions/collab'
import { ScrollView } from 'react-native-gesture-handler'


class ViewCollab extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        collabValue: { tags: [], active: false }
    }

    componentDidMount() {
        const { collab, fetchUserMedia } = this.props
        let collabValue = {
            ...collab.current_collab.details,
            influencer: collab.current_collab.details.influencer.username
        }

        // if (collab.current_collab.details.tags && collab.current_collab.details.tags.length > 0)
        collabValue = {
            ...collabValue,
            tags: [...collab.current_collab.details.tags || [], { name: '+', editable: false }]
        }

        this.setState({ collabValue })

        if (collab.current_collab.details.active && collab.current_collab.details.tags &&
            collab.current_collab.details.tags.length > 0)
            fetchUserMedia(collab.current_collab.details.influencer.id, collab.current_collab.details.tags)

    }

    // componentDidUpdate(prev) {
    //     const { collab, fetchPending, fetchResponse } = this.props
    //     if (collab.current_collab.details.influencer !== prev.collab.current_collab.details.influecer)
    //        
    // }

    goToPublication = pub => {

    }

    handleChange = collab => {
        this.setState({ collabValue: collab })
    }

    toggleSwitch = value => {
        const { collabValue } = this.state
        this.setState({ collabValue: { ...collabValue, active: value } })
    }

    handleSubmit = () => {
        const { collab, updateCollab } = this.props
        updateCollab({
            details: {
                ...collab.current_collab.details,
                influencer: collab.current_collab.details.influencer
            }
        })
    }

    onThumbnailPress = publication => {
        const url = `https://www.instagram.com/p/${publication.shortcode}/`
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url)
            } else {
                console.log("Don't know how to open URI: " + url)
            }
        })
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
        updatedTags.push({ name: '+', editable: false })

        this.setState({ collabValue: { ...this.state.collabValue, tags: updatedTags } })
    }

    onTagTextChange = (text, index) => {
        const { collabValue } = this.state
        const updatedTags = [...collabValue.tags]
        updatedTags[index] = { ...updatedTags[index], name: text }
        this.setState({ collabValue: { ...collabValue, tags: updatedTags } })
    }

    componentWillUnmount() {
        const { clearCurrentCollab } = this.props
        clearCurrentCollab()
    }

    render() {
        const { collabValue } = this.state
        const { collab, navigation } = this.props

        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => navigation.goBack()} />}
                    right={<SaveButton onPress={this.handleSubmit} />}
                />
                <ScrollView style={{ marginBottom: 100 }}>
                    <View style={collabStyle.viewContainer}>
                        {collabValue.tags && collabValue.tags.length > 0 &&
                            <CollabForm editTag={this.editTag} onEndTagEdit={this.onEndTagEdit}
                                onTagTextChange={this.onTagTextChange} tags={collabValue.tags}
                                toggleSwitch={this.toggleSwitch} onChange={this.handleChange}
                                collab={collabValue} />
                        }
                        {collab.pending && <LoadingScreen />}
                        {collabValue.active && <View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={base.title}>Publications</Text>
                            </View>
                            {collab.current_collab.publications && collab.current_collab.publications.length > 0 ?
                                <PublicationList publications={collab.current_collab.publications}
                                    onPress={this.onThumbnailPress} /> :
                                <View style={base.centered}><Text style={base.noneMessage}>No publications yet</Text></View>}
                        </View>}
                    </View>
                </ScrollView>
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
    updateCollab,
    fetchUserMedia,
    clearCurrentCollab
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCollab)
