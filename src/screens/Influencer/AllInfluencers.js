import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, ActivityIndicator } from 'react-native';
import { InfluencerList } from '../../components/list/InfluencerList'
import * as influencerAtions from '../../actions/influencer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


class AllInfluencers extends React.Component {

    state = {
        isLoading: false
    }

    componentDidMount() {
        const { influencers } = this.props


        // let account = {}
        // const { navigation } = this.props;
        // let fj = navigation.getParam('job')

        // influencersRef.on('value', snapshot => {
        //     snapshot.forEach(item => {
        //         account = { id: item.key, ...item.val() }
        //         influencers.push(account)
        //     })
        // })
        // this.setState({ top_posts: influencers })
        // this.setState({ isLoading: false })
    }


    render() {
        const { influencers, current_project, current_fetch_job } = this.props
        return (
            <View style={styles.container}>
                {this.state.isLoading ?
                    <View>
                        <ActivityIndicator size="large" color="#5d4d50" />
                        <Text style={styles.loadingTxt}>Wait, getting influencers for you</Text>
                    </View>
                    : <InfluencerList influencers={influencers} current_project={current_project} current_fetch_job={current_fetch_job} />}

            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        loadingTxt: {
            fontFamily: 'Arial',
            fontSize: 15,
            color: '#5d4d50',
            padding: '4%'
        }
    });

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project,
    current_fetch_job: state.fetch_job.current_fetch_job,
    influencers: state.influencer.influencers
});

const ActionCreators = Object.assign(
    {},
    influencerAtions
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(AllInfluencers)
