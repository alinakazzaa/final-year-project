import * as React from 'react'
import { View, Text } from 'react-native'
import FetchJobForm from '../../components/forms/FetchJobForm'
import { AppHeader } from '../../layouts/Header'
import { connect } from 'react-redux'
import { addFetchJob, setCurrentFetchJob } from '../../actions/fetchJob'
import { fetch_job_style } from './styles/fetchJob.styles'
import { BackButton } from '../../components/buttons/BackButton'
import { SaveButton } from '../../components/buttons/SaveButton'
import { DATE_TODAY } from '../../constants/TodayDate'

class AddFetchJob extends React.Component {

    state = {
        fetch_job: {
            id: '',
            title: '',
            hashtag: '',
            criteria: { follower_min: 0, follower_max: 100000 },
            status: ''
        },
    }

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { fetch_job } = this.state

        if (this.props.navigation.state.params)
            this.setState({
                fetch_job: {
                    ...fetch_job,
                    hashtag: this.props.navigation.state.params.tag,
                    date_created: DATE_TODAY
                }
            })
        else
            this.setState({ fetch_job: { ...fetch_job, date_created: DATE_TODAY } })
    }

    handleChange = updated_fetch_job => {
        this.setState({ fetch_job: updated_fetch_job })
    }

    handleSubmit = () => {
        const { fetch_job } = this.state
        const { user, project, addFetchJob, setCurrentFetchJob, navigation } = this.props
        fetch_job.title = 'Hashtag search: ' + fetch_job.hashtag
        addFetchJob(user.current_user.id, project.current_project.id, fetch_job)
        setCurrentFetchJob({ details: fetch_job })
        navigation.goBack()
        navigation.navigate('AllFetchJobs')
    }

    componentWillUnmount() {
        this.setState({ fetch_job: {} })
    }

    render() {
        const { fetch_job } = this.state

        return (
            <View>
                <AppHeader
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                    right={<SaveButton onPress={this.handleSubmit} />}
                    gradient={true}
                />
                <View style={fetch_job_style.addContainer}>
                    <View style={fetch_job_style.info}>
                        <Text style={fetch_job_style.text}>Search users by hashtag</Text>
                    </View>
                    {fetch_job.hashtag == null && <View style={fetch_job_style.info}>
                        <Text style={fetch_job_style.text}>Avoid overly specific tags</Text></View>}
                    <FetchJobForm fetch_job={fetch_job} handleChange={this.handleChange} />
                    <View style={fetch_job_style.info}><Text style={fetch_job_style.text}>To consider: the more influencers you fetch, the longer it will take</Text></View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    project: state.project
})

const mapDispatchToProps = {
    addFetchJob,
    setCurrentFetchJob
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFetchJob)
