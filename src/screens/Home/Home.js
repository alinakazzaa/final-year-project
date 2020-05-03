import * as React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { IconButton } from '../../components/buttons/IconButton'
import { connect } from 'react-redux'
import { getUserProjects } from '../../actions/project'
import { getProjectFetchJobs } from '../../actions/fetchJob'
import { COMPLETED } from '../../constants'
import { logOutUser } from '../../actions/user'
import { colors, base } from '../../styles/base'
import { TagList } from '../../components/list/TagList'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { getAllInfluencers, setCurrentInfluencer } from '../../actions/influencer'
import { getUserCollabs, setCurrentCollab } from '../../actions/collab'
import { form } from '../../styles/form'
import { CollabListProjectView } from '../../components/list/CollabListProjectView'
import { InfluencerListFjView } from '../../components/list/InfluencerListFjView'



class HomeScreen extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    state = {
        recent_tags: [],
        recent_collabs: [],
        recent_job: ''
    }

    componentDidMount() {
        const { user, getUserProjects } = this.props
        getUserProjects(user.current_user.id)
        getUserCollabs(user.current_user.id)
    }

    componentDidUpdate(prev) {
        const { user, project, fetch_job, getProjectFetchJobs, collab, getAllInfluencers } = this.props
        const activeProjects = project.all_projects.filter(proj => proj.active)
        if (prev.project.all_projects !== project.all_projects && project.all_projects.length > 0) {
            getProjectFetchJobs(user.current_user.id, activeProjects[activeProjects.length - 1].id)
        }

        if (prev.fetch_job.all_fetch_jobs !== fetch_job.all_fetch_jobs && fetch_job.all_fetch_jobs.length > 0) {
            const completed_fetch_jobs = [...fetch_job.all_fetch_jobs.filter(fj => fj.details.status == COMPLETED && fj.related_tags)]
            if (completed_fetch_jobs.length > 0) {
                const latestJob = { ...completed_fetch_jobs[completed_fetch_jobs.length - 1] }
                const tags = latestJob.related_tags ? latestJob.related_tags : []
                tags.forEach((tag, index) => {
                    tag = { name: tag, editable: false, index }
                    tags[index] = tag
                })
                this.setState({ recent_tags: tags, recent_job: completed_fetch_jobs[completed_fetch_jobs.length - 1].details.hashtag })

                if (prev.collab.all_collabs !== collab.all_collabs && collab.all_collabs.length > 0) {
                    getAllInfluencers(latestJob)
                }
            }
        }
    }

    onTagPress = tag => {
        this.props.navigation.navigate('AddFetchJob', { tag })
    }

    goToCollab = collab => {
        let { setCurrentCollab, navigation } = this.props
        navigation.navigate('ViewCollab')
        setCurrentCollab(collab)
    }

    goToInfluencer = influ => {
        const { navigation, setCurrentInfluencer } = this.props
        setCurrentInfluencer(influ)
        navigation.goBack()
        navigation.navigate('ViewInfluencer')
    }

    render() {
        const { logOutUser, fetch_job, project, collab, influencer } = this.props
        const { recent_tags, recent_collabs, recent_job } = this.state
        const recentCollabs = [...collab.all_collabs.sort((a, b) => {
            if (a.details.date_start > b.details.date_start) {
                return -1
            } else {
                return 1
            }
        })]
        const toDoInfluencers = [...influencer.all_influencers.filter(influ => influ.to_do)]
        return (
            <View>
                <AppHeader
                    gradient={true}
                    right={<IconButton color={colors.WHITE}
                        name='logout'
                        size={30}
                        onPress={() => logOutUser()}
                    />}
                    left={<IconButton color={colors.WHITE}
                        name='home'
                        size={35}
                        style={{ marginTop: 7 }}
                    />}
                />
                <ScrollView style={base.container} contentContainerStyle={base.scrollContainer}>
                    {project.pending || fetch_job.pending && <LoadingScreen />}
                    <View>
                        {(project.error !== null || fetch_job.error !== null) &&
                            <View><Text style={base.title}>Create campaigns and find influencers to match your marketing needs!</Text>
                                <Text style={base.title}>Run instagram profile searches by hashtags you associate with your product</Text></View>}
                        {recent_tags.length > 0 &&
                            <View>
                                <View style={form.header}>
                                    <Text style={{ ...base.title, fontSize: 13 }}>
                                        {`Because you searched # ${recent_job}`}</Text>
                                </View>
                                <View style={{
                                    ...form.detailsBox,
                                    flexDirection: 'column',
                                    padding: 0, margin: 0
                                }}>
                                    <Text style={{
                                        ...base.text, fontSize: 14
                                    }}>Try these hashtags...</Text>
                                    <TagList onPress={this.onTagPress} tags={recent_tags} />
                                    <Text style={{
                                        ...base.text, paddingTop: 10, padding: 0,
                                        alignSelf: 'center', fontSize: 14
                                    }}>Click tag to add new search</Text>
                                </View>
                            </View>}
                    </View>
                    <View>
                        <View style={form.header}>
                            <Text style={{
                                ...base.title,
                                fontSize: 13
                            }}>Recent collaborations</Text></View>
                        <View style={{
                            ...form.detailsBox, flexDirection: 'row', paddingTop: 10
                        }}>
                            <CollabListProjectView isHome={true} collabs={recentCollabs} goToCollab={this.goToCollab} />
                        </View>
                    </View>
                    <View>
                        <View style={form.header}>
                            <Text style={{
                                ...base.title,
                                fontSize: 13
                            }}>Recent influencers to check out</Text></View>
                        <View style={{ ...form.detailsBox, flexDirection: 'column' }}>
                            {influencer.pending && <LoadingScreen />}
                            {influencer.pending == false && !influencer.error ?
                                <InfluencerListFjView goToInfluencer={this.goToInfluencer} isHome={true}
                                    influencers={toDoInfluencers} /> :
                                <View style={base.centerItems}>
                                    <Text style={base.text}>{influencer.error.message}</Text>
                                </View>}
                        </View>
                    </View>
                </ScrollView>
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
    getAllInfluencers,
    setCurrentCollab,
    setCurrentInfluencer
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
