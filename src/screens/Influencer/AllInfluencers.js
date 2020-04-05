import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
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
        isLoading: false,
        index: 0,
        selectedTabStyle: {
            color: 'white',
            textAlign: 'center',
            padding: '5%',
            fontSize: 14,
            textTransform: 'uppercase'
        },
        selectedTabItemStyle: {
            width: '50%',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            justifyContent: 'center',
            backgroundColor: '#646380',
            borderColor: "#b3b3cc",
        }
    }

    componentDidMount() {
        const { getAllInfluencers, current_fetch_job } = this.props
        getAllInfluencers(current_fetch_job)
    }

    goToInfluencer = influ => {
        const { setCurrentInfluencer } = this.props
        setCurrentInfluencer(influ)
        this.props.navigation.navigate('ViewInfluencer')
    }

    createCollab = influencer => {
        const { current_project } = this.props
        this.props.navigation.navigate('AddCollab', { influencer, current_project })
    }


    render() {
        const { influencers, current_project, current_fetch_job } = this.props
        let { index, isLoading, selectedTabStyle, selectedTabItemStyle } = this.state
        console.log(this.props.state.influencer)
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
                <View style={styles.tabView}>
                    <TouchableOpacity onPress={() => this.setState({ index: 0 })} style={index == 0 ? selectedTabItemStyle : styles.tabItem}><Text style={index == 0 ? selectedTabStyle : styles.tab}>Potential</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ index: 1 })} style={index == 1 ? selectedTabItemStyle : styles.tabItem}><Text style={index == 1 ? selectedTabStyle : styles.tab}>To Do</Text></TouchableOpacity>
                </View>
                {index == 0 ?
                    <View>
                        {this.props.state.influencer.pending ?
                            <View>
                                <ActivityIndicator size="large" color="#5d4d50" />
                                <Text style={styles.loadingTxt}>Wait, getting your influencers</Text>
                            </View> :
                            <InfluencerList influencers={influencers} current_project={current_project} current_fetch_job={current_fetch_job} goToInfluencer={this.goToInfluencer} createCollab={this.createCollab} />
                        }
                    </View> :
                    <View>
                        {this.props.state.influencer.pending ?
                            <View>
                                <ActivityIndicator size="large" color="#5d4d50" />
                                <Text style={styles.loadingTxt}>Wait, getting your influencers</Text>
                            </View> :
                            <InfluencerList influencers={influencers} current_project={current_project} current_fetch_job={current_fetch_job} goToInfluencer={this.goToInfluencer} createCollab={this.createCollab} />
                        }
                    </View>}
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
        },
        tabView: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10
        },
        tabItem: {
            justifyContent: 'center',
            width: '45%',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderColor: "#b3b3cc",
        },
        tab: {
            textTransform: 'uppercase',
            textAlign: 'center',
            padding: '5%',
            color: "#5d4d50",
            borderColor: "#b3b3cc",
        },
    });

const mapStateToProps = state => ({
    state: state,
    user: state.user.current_user,
    current_project: state.project.current_project,
    current_fetch_job: state.fetch_job.current_fetch_job,
    influencers: state.influencer.influencers
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentInfluencer,
    getAllInfluencers: getAllInfluencers
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AllInfluencers)
