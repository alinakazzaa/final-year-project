import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, ActivityIndicator } from 'react-native';
import { InfluencerList } from '../../components/list/InfluencerList'
import { getAllInfluencers, setCurrentInfluencer } from '../../actions/influencer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


class AllInfluencers extends React.Component {

    static navigationOptions = {
        headerShown: false
    }


    state = {
        isLoading: false
    }

    goToInfluencer = influ => {
        const { setCurrentInfluencer } = this.props
        setCurrentInfluencer(influ)
        this.props.navigation.navigate('ViewInfluencer')
    }


    render() {
        const { influencers, current_project, current_fetch_job } = this.props
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
                {this.state.isLoading ?
                    <View>
                        <ActivityIndicator size="large" color="#5d4d50" />
                        <Text style={styles.loadingTxt}>Wait, getting influencers for you</Text>
                    </View>
                    : <InfluencerList influencers={influencers} current_project={current_project} current_fetch_job={current_fetch_job} goToInfluencer={this.goToInfluencer} />}

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

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentInfluencer,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AllInfluencers)
