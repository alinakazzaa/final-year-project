import * as React from 'react'
import { View, Text } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { connect } from 'react-redux'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { colors, base } from '../../styles/base'
import { TabView } from '../../components/tabview/TabView'
import { Input } from 'react-native-elements'
import { getUserCollabs, setCurrentCollab, removeCollab, filterCollabs } from '../../actions/collab'
import { CollabList } from '../../components/list/CollabList'
import { Gradient } from '../../styles/Gradient'
import { AppLogo } from '../../components/logo/AppLogo'

class AllCollabs extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        index: 0,
        searched: [],
        isSearch: false
    }

    componentDidMount() {
        const { user, getUserCollabs } = this.props
        getUserCollabs(user.current_user.id)
    }

    goToCollab = collab => {
        const { setCurrentCollab, navigation } = this.props
        navigation.navigate('ViewCollab')
        setCurrentCollab(collab)
    }

    deleteCollab = collab => {
        const { removeCollab } = this.props
        removeCollab(collab)
    }

    searchCollab = text => {
        const { collab } = this.props
        let filtered_collabs = [...collab.all_collabs.filter(c => c.details.title.toLowerCase().includes(text.toLowerCase()) ||
            c.details.influencer.username.toLowerCase().includes(text.toLowerCase()))]
        this.setState({ searched: filtered_collabs, isSearch: true })
    }

    setTab = index => {
        this.setState({ index })
    }

    render() {
        const { index, searched, isSearch } = this.state
        const { collab } = this.props

        return (
            <View>
                <Gradient style={base.container}>
                    <AppHeader
                        left={<AppLogo small={true} />}
                        center={<Text style={{ ...base.title, color: colors.WHITE, fontSize: 15 }}>Your Collaborations</Text>} />
                    <View>
                        {collab.pending && <LoadingScreen size='large' />}
                        <View style={base.searchView}>
                            <Text style={base.title}>Search</Text>
                            <Input
                                onChangeText={text => this.searchCollab(text)}
                                inputStyle={base.inputStyle}
                                inputContainerStyle={base.searchInput} />
                        </View>
                        <TabView titles={['Active', 'Archived']} onPress={this.setTab}
                            color={colors.TERTIARY} size='46%' index={index} />
                        {collab.error &&
                            <View style={base.centerItems}>
                                <Text style={{ ...base.text, color: colors.WHITE, fontSize: 20, padding: 0, margin: 0, alignSelf: 'center', textAlign: 'center' }}>No collaborations</Text>
                                <Text style={{ ...base.text, color: colors.WHITE, fontSize: 14, padding: 0, margin: 0, alignSelf: 'center', textAlign: 'center' }}>Hint: create collaboration with influencers from your search</Text>
                            </View>}
                        {collab.all_collabs.length > 0 &&
                            index == 0 ?
                            <View>
                                <CollabList goToCollab={this.goToCollab} deleteCollab={this.deleteCollab}
                                    collabs={isSearch ? filterCollabs(searched, true) :
                                        filterCollabs(collab.all_collabs, true)} />
                            </View> :
                            <View>
                                <CollabList goToCollab={this.goToCollab} deleteCollab={this.deleteCollab}
                                    collabs={isSearch ? filterCollabs(searched, false) :
                                        filterCollabs(collab.all_collabs, false)} />
                            </View>}
                    </View>
                </Gradient>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    collab: state.collab
})

const mapDispatchToProps = {
    getUserCollabs,
    setCurrentCollab,
    removeCollab
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCollabs)
