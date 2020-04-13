import * as React from 'react'
import { View, Text } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { collab_style } from './styles/collab.styles'
import { connect } from 'react-redux'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { colors, base } from '../../styles/base'
import { TabView } from '../../components/tabview/TabView'
import { Input } from 'react-native-elements'
import { getUserCollabs, setCollabsPending, setCurrentCollab, removeCollab, filterCollabs } from '../../actions/collab'
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
        let { user, setCollabsPending, getUserCollabs } = this.props
        setCollabsPending()
        getUserCollabs(user.current_user.id)
    }

    goToCollab = collab => {
        let { setCurrentCollab, navigation } = this.props
        navigation.navigate('ViewCollab')
        setCurrentCollab(collab)
    }

    deleteCollab = collab => {
        let { removeCollab } = this.props
        removeCollab(collab)
    }

    searchCollab = text => {
        const { collab } = this.props
        let filtered_collabs = searchedCollabs(collab, text)
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
                {collab.pending ?
                    <LoadingScreen text="Wait, getting your collabs" /> :
                    <View>
                        <AppHeader
                            gradient={true} />
                        <View style={collab_style.allContainer}>
                            <View style={collab_style.searchView}>
                                <Text style={collab_style.title}>Search</Text><Input
                                    onChangeText={text => this.searchCollab(text)} inputStyle={base.inputStyle} inputContainerStyle={collab_style.searchInput} />
                            </View>
                            <TabView titles={['Active', 'Completed']} onPress={this.setTab} color={colors.TERTIARY} size='46%' index={index} />
                            {collab.pending && <LoadingScreen text="Wait, getting your collabs" />}
                            {collab.error == null &&
                                index == 0 ?
                                <View>
                                    <CollabList goToCollab={this.goToCollab} deleteCollab={this.deleteCollab} collabs={isSearch ? filterCollabs(searched, true) : filterCollabs(collab.all_collabs, true)} />
                                </View> :
                                <View>
                                    <CollabList goToCollab={this.goToCollab} deleteCollab={this.deleteCollab} collabs={isSearch ? filterCollabs(searched, false) : filterCollabs(collab.all_collabs, false)} />
                                </View>}
                            {/* <Icon name='plus' type='material-community' size={40} color={colors.TERTIARY} onPress={() => this.props.navigation.navigate('AddProject')} /> */}
                        </View></View>}
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
    setCollabsPending,
    setCurrentCollab,
    removeCollab
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCollabs)
