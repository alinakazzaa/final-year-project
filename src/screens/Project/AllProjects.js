import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, Keyboard, ActivityIndicator, Dimensions } from 'react-native';
import { db } from '../../database/config/db';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';
import BasicInput from '../../components/input/BasicInput';
import { ProjectList } from '../../components/list/ProjectList';
import { Input } from 'react-native-elements';
import { removeProject, setUserProjects, setCurrentProject } from '../../actions/project'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class AllProjects extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props);
        this.state = {
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
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        let { user, setUserProjects } = this.props;
        setUserProjects(user.id)
        this.setState({ isLoading: false })
    }

    goToProject = proj => {
        let { setCurrentProject } = this.props;
        this.props.navigation.navigate('ViewProject')
        setCurrentProject(proj)
    }

    deleteProject = project => {
        let { user } = this.props;
        removeProject(user.id, project)
    }

    searchProject = text => {
        console.log("Search project")
    }

    render() {
        const { projects } = this.props;
        let { index, isLoading, selectedTabStyle, selectedTabItemStyle } = this.state

        return (
            <View style={styles.main} >
                <AppHeader
                    center={<BasicInput />}
                    right={<TextButton title="Cancel" />}
                />
                <View style={styles.tabView}>
                    <TouchableOpacity onPress={() => this.setState({ index: 0 })} style={index == 0 ? selectedTabItemStyle : styles.tabItem}><Text style={index == 0 ? selectedTabStyle : styles.tab}>Active</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ index: 1 })} style={index == 1 ? selectedTabItemStyle : styles.tabItem}><Text style={index == 1 ? selectedTabStyle : styles.tab}>Archived</Text></TouchableOpacity>
                </View>
                {index == 0 ?
                    <View>
                        {isLoading ?
                            <View>
                                <ActivityIndicator size="large" color="#5d4d50" />
                                <Text style={styles.loadingTxt}>Wait, getting your searches</Text>
                            </View> :
                            <ProjectList goToProject={this.goToProject} deleteProject={this.deleteProject} active projects={projects.active} />
                        }
                    </View> :
                    <View>
                        {isLoading ?
                            <View>
                                <ActivityIndicator size="large" color="#5d4d50" />
                                <Text style={styles.loadingTxt}>Wait, getting your searches</Text>
                            </View> :
                            <ProjectList goToProject={this.goToProject} deleteProject={this.deleteProject} active projects={projects.archived} />
                        }
                    </View>}
                <IconButton name="plus" size={40} color='#646380' onPress={() => this.props.navigation.navigate('AddProject')} />
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        main:
        {
            backgroundColor: '#f4f1f1',
            display: 'flex',
            flex: 1,
            // flexDirection: 'column',
        },
        loading: {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        txtStyle: {
            fontFamily: 'Arial',
            fontSize: 19,
            color: '#5d4d50',
        },
        inputStyle: {
            height: '87%',
            borderColor: '#b3b3cc',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
        },
        cancelBtn: {
            marginRight: 10,
            fontSize: 13
        },
        scene: {
            flex: 1,
        },
        loadingTxt: {
            fontFamily: 'Arial',
            fontSize: 15,
            color: '#5d4d50',
            padding: '4%'
        },
        addIcon: {
            alignSelf: 'center',
            backgroundColor: 'transparent'
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
    user: state.user,
    projects: state.project.projects
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setUserProjects,
    setCurrentProject
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects)
