import * as React from 'react';
import { View, Text, YellowBox, StyleSheet } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { createStackNavigator } from 'react-navigation-stack';
import FetchJobForm from '../../components/forms/FetchJobForm';
import { AppHeader } from '../../layouts/Header';
import { TextButton } from '../../components/buttons/TextButton';
import { IconButton } from '../../components/buttons/IconButton';
import { criteria } from '../../constants/Criteria';
import * as projectActions from '../../actions/project';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DATE_TODAY } from '../../constants/TodayDate'
import { addFetchJob } from '../../database/services/FetchJobService';


class AddFetchJob extends React.Component {

    state = {
        fetch_job: {}
    }

    handleSubmit = () => {
        let { fetch_job } = this.state
        const { user, current_project } = this.props

        fetch_job.value.date_created = DATE_TODAY
        fetch_job.value.title = 'Fetch: ' + fetch_job.value.hashtag && fetch_job.value.location ?
            `hashtag: ${fetch_job.value.value.hashtag} & location: ${fetch_job.value.value.location} ` :
            fetch_job.value.location ? 'location:' + fetch_job.value.location : 'hashtag:' + fetch_job.value.hashtag

        // filter active criteria
        let criteria = Object.entries(fetch_job.criteria);
        let active_criteria = []

        criteria.forEach(element => {
            if (element[1] == true)
                active_criteria.push(element[0])
        })
        fetch_job.criteria = active_criteria


        addFetchJob(user.id, current_project.id, { ...this.state.fetch_job })
        this.props.navigation.goBack()
    }

    handleChange = fj => {
        this.setState({ fetch_job: fj });
    }

    render() {

        const { current_project, user } = this.props

        return (
            <View style={styles.container}>
                <AppHeader
                    left={
                        <IconButton color="#493649"
                            name='angle-left'
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                        />}
                />
                <FetchJobForm goBack={this.props.navigation.goBack} onChange={this.handleChange} />
                <View style={styles.bottomView}>
                    <TextButton style={styles.saveBtn} onPress={this.handleSubmit} title="Save" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        saveBtn: {
            padding: 6,
            fontSize: 18,
            fontWeight: '400',
            display: 'flex',
            marginRight: 10,
            borderWidth: 1.5,
            borderColor: '#493649',
            borderRadius: 5,
        },
        bottomView: {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
        text: {
            textAlign: 'center',
            color: 'black'
        }
    });

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project
});

const ActionCreators = Object.assign(
    {},
    projectActions
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFetchJob)
