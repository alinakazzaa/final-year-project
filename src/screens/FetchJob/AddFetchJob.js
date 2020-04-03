import * as React from 'react';
import { View, YellowBox, Text } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import FetchJobForm from '../../components/forms/FetchJobForm';
import { AppHeader } from '../../layouts/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DATE_TODAY } from '../../constants/TodayDate'
import { addFetchJob, setCurrentFetchJob } from '../../actions/fetchJob';
import { fetchJob } from './styles/fetchJob.styles'
import { BackButton } from '../../components/buttons/BackButton';
import { TextButton } from '../../components/buttons/TextButton';


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
        if (this.props.navigation.state.params)
            this.setState({ fetch_job: { hashtag: this.props.navigation.state.params.tag } })

    }

    handleChange = updated_fetch_job => {
        this.setState({ fetch_job: updated_fetch_job })
    }

    handleSubmit = () => {
        const { fetch_job } = this.state
        const { user, current_project, addFetchJob, setCurrentFetchJob } = this.props
        fetch_job.title = 'Hashtag search: ' + fetch_job.hashtag
        addFetchJob(user.id, current_project.id, fetch_job)
        setCurrentFetchJob({ details: fetch_job })
        this.props.navigation.goBack()
        this.props.navigation.navigate('FetchJobView')
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
                    right={<TextButton containerStyle={fetchJob.saveBtn} onPress={this.handleSubmit} title="Save" />}
                    gradient={true}
                />
                <View style={fetchJob.addContainer}>
                    <View style={fetchJob.info}>
                        <Text style={fetchJob.text}>Search users by hashtag</Text>
                    </View>
                    {/* {!hash_tag && <View style={fetchJob.info}>
                        <Text style={fetchJob.text}>Avoid overly specific tags</Text></View>} */}
                    <FetchJobForm fetch_job={fetch_job} handleChange={this.handleChange} />
                    <View style={fetchJob.info}><Text style={fetchJob.text}>To consider: the more influencers you fetch, the longer it will take</Text></View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    state: state,
    user: state.user.current_user,
    current_project: state.project.current_project
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addFetchJob: addFetchJob,
    setCurrentFetchJob: setCurrentFetchJob
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddFetchJob)
