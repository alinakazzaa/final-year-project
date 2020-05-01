import * as React from 'react'
import { View, Text } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { IconButton } from '../../components/buttons/IconButton'
import { connect } from 'react-redux'
import { getUserProjects } from '../../actions/project'
import { getProjectFetchJobs } from '../../actions/fetchJob'
import { COMPLETED } from '../../constants'
import { logOutUser } from '../../actions/user'
import { home } from './styles/home.styles'
import { colors, base } from '../../styles/base'
import { TagList } from '../../components/list/TagList'
import { Divider } from 'react-native-elements'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { getAllInfluencers } from '../../actions/influencer'
import { getUserCollabs } from '../../actions/collab'



class HomeScreen extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    state = {
        recent_tags: [],
        recent_collabs: []
    }

    componentDidMount() {
        // const { user, getUserProjects } = this.props
        // getUserProjects(user.current_user.id)
    }

    componentDidUpdate(prev) {
        // const { user, project, fetch_job, getProjectFetchJobs, getUserCollabs, collab } = this.props

        // if (prev.project.all_projects !== project.all_projects && project.all_projects.length > 0) {
        //     getProjectFetchJobs(user.current_user.id, project.all_projects[0].id)
        // }

        // if (prev.fetch_job.all_fetch_jobs !== fetch_job.all_fetch_jobs && fetch_job.all_fetch_jobs.length > 0) {
        //     const completed_fetch_jobs = [...fetch_job.all_fetch_jobs.filter(fj => fj.details.status == COMPLETED && fj.related_tags)]
        //     if (completed_fetch_jobs.length > 0) {
        //         const tags = [...completed_fetch_jobs[completed_fetch_jobs.length - 1].related_tags]
        //         this.setState({ recent_tags: tags })
        //         getUserCollabs(user.current_user.id)
        //     }

        // }

        // const recent_collabs = []
        // const collab_length = collab.all_collabs.length

        // if (prev.collab.all_collabs !== collab.all_collabs && collab_length > 0) {

        //     for (var i = length; i > length - 3; i--) {
        //         recent_collabs.push(collab.all_collabs[i])
        //     }
        //     this.setState({ ...this.state, recent_collabs })
        // }
    }

    onTagPress = tag => {
        this.props.navigation.navigate('AddFetchJob', { tag })
    }

    render() {
        const { logOutUser, fetch_job, project, collab, influencer } = this.props
        const { recent_tags, recent_collabs } = this.state

        return (
            <View>
                <AppHeader
                    gradient={true}
                    right={<View style={home.iconContainer}><IconButton color={colors.WHITE}
                        name='logout'
                        size={30}
                        onPress={() => logOutUser()}
                    /></View>}
                />
                <View style={home.container}>
                    {project.pending || fetch_job.pending && <LoadingScreen />}
                    {/* <View style={home.top}>
                        {(project.error !== null || fetch_job.error !== null) &&
                            <View><Text style={base.title}>Create campaigns and find influencers to match your marketing needs!</Text>
                                <Text style={base.title}>Run instagram profile searches by hashtags you associate with your product</Text></View>}
                        {recent_tags.length > 0 && <View><Text style={base.title}>Based on your previous searches</Text>
                            <Text style={base.text}>Consider these hashtags</Text>
                            <View style={home.itemRow}>
                                <TagList onPress={this.onTagPress} tags={recent_tags} />
                            </View></View>}
                    </View> */}
                    <View style={home.middle}>
                        <Text style={home.largeTitle}>Recent collaborations....</Text>
                    </View>
                    <Divider />
                    <View style={base.text}>
                        <Text style={home.largeTitle}>Influencers to do....</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    project: state.project,
    fetch_job: state.fetch_job,
    collab: state.collab,
    influencer: state.influencer
})


const mapDispatchToProps = {
    getProjectFetchJobs,
    getUserProjects,
    logOutUser,
    getUserCollabs,
    getAllInfluencers
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
