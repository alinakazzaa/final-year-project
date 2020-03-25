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
import { colors } from 'react-native-elements';
import { BackButton } from '../../components/buttons/BackButton';


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

        const { tag } = this.props.navigation.state.params || null

        return (
            <View>
                <AppHeader
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                    gradient={true}
                />
                <View style={fetchJobStyle.container}>
                    <FetchJobForm goBack={this.props.navigation.goBack} tag={tag} handleSubmit={this.handleSubmit} />
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
    addFetchJob: addFetchJob
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddFetchJob)
