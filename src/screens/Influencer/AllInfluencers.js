import * as React from 'react'
import { View, Text } from 'react-native'
import { InfluencerList } from '../../components/list/InfluencerList'
import { getAllInfluencers, setCurrentInfluencer, filterInfluencers } from '../../actions/influencer'
import { connect } from 'react-redux'
import { AppHeader } from '../../layouts/Header'
import { BackButton } from '../../components/buttons/BackButton'
import { Gradient } from '../../styles/Gradient'
import { colors, base } from '../../styles/base'
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
        const { navigation } = this.props
        navigation.navigate('AddCollab', { influencer })
    }

    searchInfluencer = text => {
        const { influencer } = this.props
        let filtered_influencers = [...influencer.all_influencers.filter(influ => influ.username.toLowerCase().includes(text.toLowerCase()))]
        this.setState({ searched: filtered_influencers, isSearch: true })
    }

    saveInfluencer = () => {

    }

    render() {
        const { influencer, project, fetch_job } = this.props
        let { index } = this.state

        return (
            <View style={influencer.container}>
                <Gradient>
                    <AppHeader
                        left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                        center={<View style={influencer_style.searchView}>
                            <Text style={influencer_style.title}>Search</Text>
                            <Input onChangeText={text => this.searchInfluencer(text)} inputStyle={base.inputStyle} inputContainerStyle={influencer_style.searchInput} />
                        </View>}
                    />
                    <TabView
                        titles={['To do', 'Saved']}
                        color={colors.TERTIARY}
                        onPress={index => this.setState({ index })}
                        size='46%'
                        index={index} />

                    {index == 0 ?
                        <View>
                            {influencer.pending ?
                                <LoadingScreen text="Wait, getting your influencers" /> :
                                <InfluencerList
                                    saveInfluencer={this.saveInfluencer}
                                    influencers={filterInfluencers(influencer.all_influencers, true)}
                                    current_project={project.current_project}
                                    current_fetch_job={fetch_job.current_fetch_job}
                                    goToInfluencer={this.goToInfluencer}
                                    createCollab={this.createCollab} />
                            }
                        </View> :
                        <View>
                            {influencer.pending ?
                                <LoadingScreen text="Wait, getting your influencers" /> :
                                <InfluencerList
                                    influencers={filterInfluencers(influencer.all_influencers, false)}
                                    current_project={project.current_project}
                                    current_fetch_job={fetch_job.current_fetch_job}
                                    goToInfluencer={this.goToInfluencer}
                                    createCollab={this.createCollab} />
                            }
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
    getAllInfluencers
}


export default connect(mapStateToProps, mapDispatchToProps)(AllInfluencers)
