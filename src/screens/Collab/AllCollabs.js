import * as React from 'react'
import { View, Text } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { connect } from 'react-redux'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { colors, base } from '../../styles/base'
import { TabView } from '../../components/tabview/TabView'
import { Input } from 'react-native-elements'
import { getUserCollabs, setCurrentCollab, removeCollab, filterCollabs } from '../../actions/collab'
import { searchedCollabs } from '../../reducers/collabReducer'
import { CollabList } from '../../components/list/CollabList'

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
        const filtered_collabs = searchedCollabs(collab, text)
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
                <AppHeader
                    gradient={true}
                    left={<View style={base.searchTxt}><Text style={base.title}>Search</Text></View>}
                    center={<View style={base.searchView}>
                        <Input
                            onChangeText={text => this.searchCollab(text)}
                            inputStyle={base.inputStyle}
                            inputContainerStyle={base.searchInput} />
                    </View>} />
                <View style={base.container}>
                    {collab.pending && <LoadingScreen size='large' />}
                    <TabView titles={['Active', 'Completed']} onPress={this.setTab}
                        color={colors.TERTIARY} size='46%' index={index} />
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
                    {collab.all_collabs.length == 0 &&
                        <View style={base.centerItems}>
                            <Text style={base.noneMessage}>No collaborations yet</Text>
                            <Text style={base.noneMessage}>Run searches and find influencers to collaborate with</Text>
                        </View>}
                </View>
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
