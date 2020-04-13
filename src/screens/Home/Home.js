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
import { colors } from '../../styles/base'
import { TagList } from '../../components/list/TagList'
import { Divider } from 'react-native-elements'
import { LoadingScreen } from '../../components/loading/LoadingScreen'

class HomeScreen extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    state = {
        recent_tags: []
    }

    componentDidMount() {
        const { user, getUserProjects } = this.props
        getUserProjects(user.current_user.id)
    }

    componentDidUpdate(prev) {
        const { user, project, fetch_job, getProjectFetchJobs } = this.props

        if (prev.project.all_projects !== project.all_projects && project.all_projects.length > 0) {
            getProjectFetchJobs(user.current_user.id, project.all_projects[0].id)
        }

        if (prev.fetch_job.all_fetch_jobs !== fetch_job.all_fetch_jobs && fetch_job.all_fetch_jobs.length > 0) {
            const completed_fetch_jobs = [...fetch_job.all_fetch_jobs.filter(fj => fj.details.status == COMPLETED && fj.related_tags)]
            const tags = [...completed_fetch_jobs[completed_fetch_jobs.length - 1].related_tags]
            this.setState({ recent_tags: tags })
        }
    }

    onTagPress = tag => {
        this.props.navigation.navigate('AddFetchJob', { tag })
    }

    render() {
        const { logOutUser, fetch_job, project } = this.props
        const { recent_tags } = this.state

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
                {project.pending || fetch_job.pending && <LoadingScreen />}
                <View style={home.container}>
                    <View style={home.top}>
                        <Text style={home.title}>Based on your previous searches</Text>
                        <Text style={home.text}>Consider these hashtagtags</Text>
                        <View style={home.itemRow}>
                            {recent_tags.length > 0 &&
                                <TagList onPress={this.onTagPress} tags={recent_tags} />}
                        </View>
                    </View>
                    <View style={home.logInMsg}>
                        <Text style={home.largeTitle}>Recent collaborations....</Text>
                    </View>
                    <Divider />
                    <View style={home.logInMsg}>
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
    fetch_job: state.fetch_job
})


const mapDispatchToProps = {
    getProjectFetchJobs,
    getUserProjects,
    logOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
