import * as React from 'react'
import { View, Text } from 'react-native'
import { InfluencerList } from '../../components/list/InfluencerList'
import {
    getAllInfluencers, setCurrentInfluencer, filterInfluencers,
    updateInfluencer, removeInfluencer
} from '../../actions/influencer'
import { connect } from 'react-redux'
import { AppHeader } from '../../layouts/Header'
import { BackButton } from '../../components/buttons/BackButton'
import { Gradient } from '../../styles/Gradient'
import { colors, base, dimensions } from '../../styles/base'
import { Input } from 'react-native-elements'
import { influencer_style } from './styles/influencer.styles'
import { TabView } from '../../components/tabview/TabView'
import { LoadingScreen } from '../../components/loading/LoadingScreen'

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
        const { fetch_job, removeInfluencer } = this.props
        removeInfluencer(fetch_job.current_fetch_job, id)
    }

    render() {
        const { influencer, project } = this.props
        let { index } = this.state

        return (
            <View style={influencer.container}>
                <Gradient style={{ height: dimensions.fullHeight }}>
                    <AppHeader
                        left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                        center={<View style={base.searchView}>
                            <Text style={influencer_style.title}>Search</Text>
                            <Input
                                onChangeText={text => this.searchInfluencer(text)}
                                inputStyle={base.inputStyle}
                                inputContainerStyle={base.searchInput} />
                        </View>}
                    />
                    {influencer.pending && <LoadingScreen size='large' />}
                    {!influencer.pending && !influencer.error &&
                        <View>
                            <TabView
                                titles={['To do', 'Saved']}
                                color={colors.TERTIARY}
                                onPress={index => this.setState({ index })}
                                size='46%'
                                index={index} />

                            {index == 0 ?
                                <View>

                                    <InfluencerList
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
    removeInfluencer
}


export default connect(mapStateToProps, mapDispatchToProps)(AllInfluencers)
