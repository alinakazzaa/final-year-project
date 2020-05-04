import React from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { IconButton } from '../../components/buttons/IconButton'
import { connect } from 'react-redux'
import { getUserProjects, clearProjectState, setCurrentProject } from '../../actions/project'
import { getProjectFetchJobs, clearFetchJobState } from '../../actions/fetchJob'
import { COMPLETED } from '../../constants'
import { logOutUser } from '../../actions/user'
import { colors, base, dimensions } from '../../styles/base'
import { TagList } from '../../components/list/TagList'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { getAllInfluencers, setCurrentInfluencer } from '../../actions/influencer'
import { getUserCollabs, setCurrentCollab, clearCollabState } from '../../actions/collab'
import { form } from '../../styles/form'
import { CollabListProjectView } from '../../components/list/CollabListProjectView'
import { InfluencerListFjView } from '../../components/list/InfluencerListFjView'
import { Icon, Input } from 'react-native-elements'
import { AppLogo } from '../../components/logo/AppLogo'
import { Dialog } from 'react-native-simple-dialogs'
import SelectInput from 'react-native-select-input-ios'



class HomeScreen extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    state = {
        recent_tags: [],
        recent_job: '',
        confirmProject: false,
        selectedProject: 'test'
    }

    componentDidMount() {
        const { user, project, getUserProjects, getUserCollabs, clearFetchJobState, clearCollabState, clearProjectState } = this.props
        // clearFetchJobState()
        // clearProjectState()
        // clearCollabState()
        getUserProjects(user.current_user.id)
        getUserCollabs(user.current_user.id)
        this.setState({ selected: 0 })
    }

    componentDidUpdate(prev) {
        const { user, project, fetch_job, getProjectFetchJobs, collab, getAllInfluencers } = this.props

        if (prev.project != project && project.all_projects.length > 0) {
            const activeProjects = project.all_projects.filter(proj => proj.active)
            getProjectFetchJobs(user.current_user.id, activeProjects[activeProjects.length - 2].id)
        }

        if (prev.fetch_job != fetch_job && fetch_job.all_fetch_jobs.length > 0) {
            const completed_fetch_jobs = [...fetch_job.all_fetch_jobs.filter(fj => fj.details.status == COMPLETED && fj.related_tags)]

            if (completed_fetch_jobs.length > 0) {
                const latestJob = { ...completed_fetch_jobs[completed_fetch_jobs.length - 1] }
                const tags = latestJob.related_tags ? latestJob.related_tags : []
                this.setState({ recent_tags: tags, recent_job: completed_fetch_jobs[completed_fetch_jobs.length - 1].details.hashtag })

                if (prev.collab.all_collabs !== collab.all_collabs && collab.all_collabs.length > 0) {
                    getAllInfluencers(latestJob)
                }
            }
        }
    }

    onTagPress = tag => {
        this.setState({ confirmProject: true, selectedTag: tag })
    }

    createNewSearch = () => {
        const { project, setCurrentProject } = this.props
        setCurrentProject(project.all_projects[this.state.selected])
        this.props.navigation.navigate('AddFetchJob', { tag: this.state.selectedTag || '' })
        this.setState({ confirmProject: false })
    }

    goToCollab = collab => {
        const { setCurrentCollab, navigation } = this.props
        navigation.navigate('ViewCollab')
        setCurrentCollab(collab)
    }

    goToInfluencer = influ => {
        const { navigation, setCurrentInfluencer } = this.props
        setCurrentInfluencer(influ)
        navigation.goBack()
        navigation.navigate('ViewInfluencer')
    }

    startNewSearch = () => {
        const { navigation, project } = this.props
        if (project.all_projects.length == 0) {
            Alert.alert("First, add your marketing campaign")
            navigation.navigate("AddProject")
        } else {
            this.setState({ confirmProject: true })
        }
    }

    render() {
        const { user, logOutUser, fetch_job, project, collab, influencer, setCurrentProject } = this.props
        const { recent_tags, recent_job, selectedProject } = this.state
        const recentCollabs = [...collab.all_collabs.sort((a, b) => {
            if (a.details.date_start > b.details.date_start) {
                return -1
            } else {
                return 1
            }
        })]
        const campaigns = [...project.all_projects.map((c, index) => { return { value: index, label: c.title } })]
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
                    left={<AppLogo small={true} />}
                    center={<Text style={{ ...base.title, color: colors.WHITE, fontSize: 20 }}>
                        {`Hi, ${user.current_user.name}`}</Text>}
                />
                <Dialog
                    visible={this.state.confirmProject}
                    title="Choose campaign"
                    positiveButton={{
                        style: { color: colors.PRIMARY },
                        title: "Confirm",
                        onPress: () => setCurrentProject({ ...project.all_projects.find(p => p.title == selectedProject) })
                    }}
                    onTouchOutside={() => this.setState({ confirmProject: false })} >
                    <View>
                        <View><SelectInput
                            container
                            onSubmitEditing={val => {
                                this.setState({ selected: val })
                            }}
                            style={{ ...base.inputStyle, borderWidth: 0.5, borderColor: colors.BORDER, borderRadius: 5, padding: 7, marginBottom: 10 }}
                            labelStyle={{ fontSize: 15 }}
                            value={this.state.selected} options={campaigns} /></View>
                        <IconButton
                            name='check'
                            size={30}
                            color={colors.TERTIARY}
                            type='material-icons'
                            onPress={() => this.createNewSearch()}
                        />
                    </View>
                </Dialog>
                <ScrollView style={base.container} contentContainerStyle={base.scrollContainer}>
                    {project.pending || fetch_job.pending && <LoadingScreen />}
                    <View style={{ marginBottom: dimensions.fullHeight * 0.2 }}>
                        <View>
                            <View style={form.header}>
                                <Text style={{ ...base.title, fontSize: 13 }}>
                                    WELCOME BACK</Text>
                            </View>
                            <View style={{
                                ...form.detailsBox,
                                flexDirection: 'column',
                                paddingTop: 20
                            }}>
                                {project.error !== null &&
                                    <View><Text style={{ ...base.text, fontSize: 14 }}>Create campaigns and find influencers to match your marketing needs!</Text></View>}
                                {fetch_job.error !== null && <View><Text style={base.noneMessage}>Run a search and find the right influencers!</Text></View>}
                                {recent_tags.length > 0 &&
                                    <View>
                                        <View style={form.header}>
                                            <Text style={{ ...base.title, fontSize: 13 }}>
                                                {`Because you searched # ${recent_job}`}</Text>
                                        </View>
                                        <View style={{
                                            ...form.detailsBox,
                                            flexDirection: 'column'

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
                                {recentCollabs.length > 0 && <View style={base.centerItems}>
                                    <Text style={base.noneMessage}>Get in touch with recent influencers</Text>
                                    <Icon name='arrow-downward' type="material" size={40} color={colors.TERTIARY} />
                                </View>}
                            </View>
                        </View>
                        <View>
                            <View style={form.header}>
                                <Text style={{
                                    ...base.title,
                                    fontSize: 13
                                }}>Your recent collaborations</Text></View>
                            <View style={{
                                ...form.detailsBox, flexDirection: 'row', paddingTop: 10
                            }}>
                                {collab.pending && <LoadingScreen />}
                                {collab.pending == false && recentCollabs.length > 0 && <CollabListProjectView isHome={true} collabs={recentCollabs} goToCollab={this.goToCollab} />}
                                {collab.error !== null && <View style={{ marginTop: 20, ...base.centerItems }}>
                                    <Text style={base.noneMessage}>You haven't collaborated with any influencers yet.</Text>
                                    {fetch_job.pending == false && fetch_job.error == null && <Text style={base.noneMessage}>Check out your recent searches to find potential brand ambassadors</Text>}
                                </View>}
                            </View>
                        </View>
                        <View>
                            <View style={form.header}>
                                <Text style={{
                                    ...base.title,
                                    fontSize: 13
                                }}>Check out your recent influencers</Text></View>
                            <View style={{ ...form.detailsBox, flexDirection: 'column' }}>
                                {influencer.pending && <LoadingScreen />}
                                {influencer.error || influencer.all_influencers.length == 0 && <View style={{ marginTop: 20, ...base.centerItems }}>
                                    <Text style={base.noneMessage}>Start a search to find the perfect brand ambassador</Text>
                                    <IconButton
                                        name='account-search-outline'
                                        size={45}
                                        color={colors.SECONDARY}
                                        style={{ alignSelf: 'center' }}
                                        type='material-community'
                                        onPress={() => this.startNewSearch()} />
                                </View>}
                                {influencer.pending == false && !influencer.error &&
                                    <InfluencerListFjView goToInfluencer={this.goToInfluencer} isHome={true}
                                        influencers={toDoInfluencers} />}
                            </View>
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
    setCurrentInfluencer,
    clearFetchJobState,
    clearCollabState,
    clearProjectState,
    setCurrentProject
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
