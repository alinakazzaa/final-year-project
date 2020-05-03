import * as React from 'react'
import { View, Text, Linking } from 'react-native'
import { InfluencerList } from '../../components/list/InfluencerList'
import { getAllInfluencers, setCurrentInfluencer, filterInfluencers, updateInfluencer, removeInfluencer } from '../../actions/influencer'
import { connect } from 'react-redux'
import { AppHeader } from '../../layouts/Header'
import { BackButton } from '../../components/buttons/BackButton'
import { Gradient } from '../../styles/Gradient'
import { colors, base, dimensions } from '../../styles/base'
import { Input } from 'react-native-elements'
import { influencer_style } from './styles/influencer.styles'
import { TabView } from '../../components/tabview/TabView'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { updateFetchJob } from '../../actions/fetchJob'

class AllInfluencers extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        isLoading: false,
        index: 0,
        isSearch: false,
        searched: []
    }

    componentDidMount() {
        const { getAllInfluencers, fetch_job } = this.props
        getAllInfluencers(fetch_job.current_fetch_job)
    }

    goToInfluencer = influ => {
        const { setCurrentInfluencer, navigation } = this.props
        setCurrentInfluencer(influ)
        navigation.navigate('ViewInfluencer')
    }

    createCollab = influencer => {
        this.props.navigation.navigate('AddCollab', { influencer })
    }

    searchInfluencer = text => {
        const { influencer } = this.props
        let filtered_influencers = [...influencer.all_influencers.filter(influ => influ.username.toLowerCase().includes(text.toLowerCase()))]
        this.setState({ searched: filtered_influencers, isSearch: true })
    }

    saveInfluencer = influencer => {
        const { updateInfluencer } = this.props
        updateInfluencer({ ...influencer, to_do: false })
    }

    deleteInflu = id => {
        const { fetch_job, removeInfluencer, updateFetchJob } = this.props
        const current = { ...fetch_job.current_fetch_job }
        current.influencers.success = [...current.influencers.success.filter(influ_id => influ_id !== id)]
        updateFetchJob(current)
        removeInfluencer(id)
    }

    goToProfile = url => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url)
            } else {
                console.log("Don't know how to open URI: " + url)
            }
        })
    }

    render() {
        const { influencer, project } = this.props
        let { index } = this.state

        return (
            <View>
                <Gradient style={base.container}>
                    <AppHeader
                        left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                        center={<View style={base.searchView}>
                            <Text style={base.title}>Search</Text>
                            <Input
                                onChangeText={text => this.searchInfluencer(text)}
                                inputStyle={base.inputStyle}
                                inputContainerStyle={base.searchInput} />
                        </View>}
                    />
                    {influencer.pending && <LoadingScreen />}
                    {!influencer.pending && !influencer.error &&
                        <View>
                            {influencer.pending && <LoadingScreen size='large' />}
                            <TabView
                                titles={['To do', 'Saved']}
                                color={colors.TERTIARY}
                                onPress={index => this.setState({ index })}
                                size='46%'
                                index={index} />

                            {influencer.all_influencers.length > 0 && index == 0 ?
                                <View>
                                    <InfluencerList
                                        goToProfile={this.goToProfile}
                                        saveInfluencer={this.saveInfluencer}
                                        influencers={filterInfluencers(influencer.all_influencers, true)}
                                        current_project={project.current_project}
                                        goToInfluencer={this.goToInfluencer}
                                        createCollab={this.createCollab}
                                        removeInfluencer={this.deleteInflu} />
                                </View> :
                                <View>
                                    <InfluencerList
                                        influencers={filterInfluencers(influencer.all_influencers, false)}
                                        current_project={project.current_project}
                                        goToInfluencer={this.goToInfluencer}
                                        createCollab={this.createCollab}
                                        removeInfluencer={this.deleteInflu} />
                                </View>}
                        </View>}
                </Gradient>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    project: state.project,
    fetch_job: state.fetch_job,
    influencer: state.influencer
})

const mapDispatchToProps = {
    setCurrentInfluencer,
    getAllInfluencers,
    updateInfluencer,
    removeInfluencer,
    updateFetchJob
}


export default connect(mapStateToProps, mapDispatchToProps)(AllInfluencers)
