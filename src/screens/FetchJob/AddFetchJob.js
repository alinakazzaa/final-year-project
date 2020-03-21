import * as React from 'react';
import { View, YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import FetchJobForm from '../../components/forms/FetchJobForm';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DATE_TODAY } from '../../constants/TodayDate'
import { addFetchJob } from '../../actions/fetchJob';
import { fetchJobStyle } from './fetchJob.style'


class AddFetchJob extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    handleSubmit = fetch_job => {
        const { user, current_project, addFetchJob } = this.props

        fetch_job.date_created = DATE_TODAY
        fetch_job.title = 'Fetch: ' + fetch_job.hashtag

        addFetchJob(user.id, current_project.id, fetch_job)
        this.props.navigation.goBack()
    }

    render() {

        return (
            <View>
                <AppHeader
                    left={
                        <IconButton color="#493649"
                            name='angle-left'
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    gradient={true}
                />
                <View style={fetchJobStyle.container}>
                    <FetchJobForm goBack={this.props.navigation.goBack} handleSubmit={this.handleSubmit} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addFetchJob: addFetchJob
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddFetchJob)
