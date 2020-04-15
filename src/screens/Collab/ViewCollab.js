import * as React from 'react'
import { View, Text } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { BackButton } from '../../components/buttons/BackButton'
import { connect } from 'react-redux'
import { collab_style } from './styles/collab.styles'
import CollabForm from '../../components/forms/CollabForm'
import { TagList } from '../../components/list/TagList'
import { getInfluByUsername } from '../../actions/influencer'
import { fetchUserMedia } from '../../web/fetchUserMedia'
import { fetchPending, fetchResponse } from '../../actions/fetch'
import { PublicationList } from '../../components/list/PublicationList'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { SaveButton } from '../../components/buttons/SaveButton'


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

        if (influ.id) {
            fetchUserMedia(influ.id, ['berghain', 'mitte'], fetchPending, fetchResponse)
        }
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
                <View style={collab_style.viewContainer}>
                    <View>
                        <View style={collab_style.header}>
                            <Text style={collab_style.title}>Details</Text>
                        </View>
                        <View style={collab_style.detailsBox}>
                            <View style={collab_style.labelsCol}>
                                <Text style={collab_style.label}>Title</Text>
                                {/* <Text style={collab_style.label}>Date created</Text> */}
                                {/* <Text style={collab_style.label}>Date Start</Text> */}
                                <Text style={collab_style.label}>Campaign</Text>
                                <Text style={collab_style.label}>Influencer</Text>
                                <Text style={collab_style.label}>Compensation</Text>
                                <Text style={collab_style.label}>Description</Text>
                            </View>
                            <CollabForm onChange={this.handleChange} collab={collab.current_collab} />
                        </View>
                    </View>
                    <View style={collab_style.tagsBox}>
                        <Text style={collab_style.title}>Hashtags</Text>
                        <TagList tags={tags} onPress={this.editTag} />
                    </View>
                    {collab.pending && <LoadingScreen />}
                    <View style={collab_style.header}>
                        <Text style={collab_style.title}>Publications</Text>
                    </View>
                    {collab.current_collab.details.active ?
                        <PublicationList publications={collab.current_collab.publications} /> :
                        <View style={collab_style.listView}><Text style={collab_style.noneMsg}>No publications yet</Text></View>}
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
