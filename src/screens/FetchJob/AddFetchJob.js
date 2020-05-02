import * as React from 'react'
import { View, Text, Alert } from 'react-native'
import FetchJobForm from '../../components/forms/FetchJobForm'
import { AppHeader } from '../../layouts/Header'
import { connect } from 'react-redux'
import { addFetchJob, setCurrentFetchJob } from '../../actions/fetchJob'
import { BackButton } from '../../components/buttons/BackButton'
import { SaveButton } from '../../components/buttons/SaveButton'
import { DATE_TODAY } from '../../constants/TodayDate'
import { base } from '../../styles/base'
import { followerRanges } from '../../constants/Criteria'

class AddFetchJob extends React.Component {

    state = {
        fetchJob: {
            id: '',
            title: '',
            hashtag: '',
            criteria: { followerMin: followerRanges.micro.min, followerMax: followerRanges.micro.max },
            status: ''
        },
    }

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { fetchJob } = this.state

        if (this.props.navigation.state.params)
            this.setState({
                fetchJob: {
                    ...fetchJob,
                    hashtag: this.props.navigation.state.params.tag,
                    date_created: DATE_TODAY
                }
            })
        else
            this.setState({ fetchJob: { ...fetchJob, date_created: DATE_TODAY } })
    }

    handleChange = updatedFetchJob => {
        this.setState({ fetchJob: updatedFetchJob })
    }

    handleSubmit = () => {
        const { fetchJob } = this.state
        const { user, project, addFetchJob, setCurrentFetchJob, navigation, fetch_job } = this.props
        fetchJob.title = 'Hashtag search: ' + fetchJob.hashtag

        if (fetch_job.all_fetch_jobs.find(job => job.details.hashtag == fetchJob.hashtag)) {
            Alert.alert("Search with hashtag already exists.\n\nTry something different.")
        } else {
            Alert.alert("Search added")
            addFetchJob(user.current_user.id, project.current_project.id, fetchJob)
            navigation.goBack()
            navigation.navigate("FetchJobView")
        }
    }

    componentWillUnmount() {
        this.setState({ fetchJob: {} })
    }

    render() {
        const { fetchJob } = this.state

        return (
            <View>
                <AppHeader
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                    right={<SaveButton onPress={this.handleSubmit} />}
                    gradient={true}
                />
                <View style={base.container}>
                    <FetchJobForm fetchJob={fetchJob} handleChange={this.handleChange} />
                    <View><Text style={base.text}>To consider: the more influencers you fetch, the longer it will take</Text></View>
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
    addFetchJob,
    setCurrentFetchJob
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFetchJob)
