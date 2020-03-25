import * as React from 'react';
import { View, Text, YellowBox } from 'react-native';
import { AppHeader } from '../../layouts/Header';
import { collab } from './styles/collab.styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoadingScreen } from '../../components/loading/LoadingScreen';
import { colors, base } from '../../styles/base';
import TabView from '../../components/tabview/TabView';
import { Input, Icon } from 'react-native-elements';
import { getUserCollabs, setCollabsPending, setCurrentCollab, removeCollab } from '../../actions/collab';
import { completedCollabs, activeCollabs, searchedCollabs } from '../../reducers/collabReducer';
import { CollabList } from '../../components/list/CollabList';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


class AllCollabs extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            searched: [],
            isSearch: false
        }
    }

    componentDidMount() {
        let { user, setCollabsPending, getUserCollabs } = this.props
        setCollabsPending()
        getUserCollabs(user.id)
    }

    goToCollab = collab => {
        let { setCurrentCollab } = this.props
        this.props.navigation.navigate('ViewCollab')
        setCurrentCollab(collab)
    }

    deleteCollab = collab => {
        let { removeCollab } = this.props
        removeCollab(collab)
    }

    searchCollab = text => {
        const { state } = this.props
        let filtered_collabs = searchedCollabs(state, text)
        this.setState({ searched: filtered_collabs, isSearch: true })
    }

    setTab = index => {
        this.setState({ index })
    }

    render() {
        const { index, searched, isSearch } = this.state
        const { active, completed, pending, error } = this.props

        return (
            <View>
                {pending ?
                    <LoadingScreen text="Wait, getting your collabs" /> :
                    <View>
                        <AppHeader
                            gradient={true} />
                        <View style={collab.allContainer}>
                            <View style={collab.searchView}>
                                <Text style={collab.title}>Search</Text><Input
                                    onChangeText={text => this.searchCollab(text)} inputStyle={base.inputStyle} inputContainerStyle={collab.searchInput} />
                            </View>
                            <TabView titles={['Active', 'Completed']} onPress={this.setTab} color={colors.TERTIARY} size='46%' index={index} />
                            {!error && !pending &&
                                index == 0 ?
                                <View>
                                    <CollabList goToCollab={this.goToCollab} deleteCollab={this.deleteCollab} collabs={isSearch ? [...searched.filter(c => c.active == true)] : active} />
                                </View> :
                                <View>
                                    <CollabList goToCollab={this.goToCollab} deleteCollab={this.deleteCollab} collabs={isSearch ? [...searched.filter(c => c.active == false)] : completed} />
                                </View>}
                            {/* <Icon name='plus' type='material-community' size={40} color={colors.TERTIARY} onPress={() => this.props.navigation.navigate('AddProject')} /> */}
                        </View></View>}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    state: state,
    user: state.user.current_user,
    pending: state.collab.pending,
    error: state.collab.error,
    active: activeCollabs(state),
    completed: completedCollabs(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getUserCollabs: getUserCollabs,
    setCollabsPending: setCollabsPending,
    setCurrentCollab: setCurrentCollab,
    removeCollab: removeCollab

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AllCollabs)
