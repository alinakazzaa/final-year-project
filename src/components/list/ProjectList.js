import React from 'react'
import { Icon, Avatar } from 'react-native-elements'
import { StyleSheet, TouchableOpacity, Text, Keyboard, View, ScrollView, Dimensions } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'
import { SceneMap, TabView } from 'react-native-tab-view'

const FirstRoute = () => (
    < View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };


export const ProjectList = ({ active, projects, deleteProject, addProject, goToProject }) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const projList = (proj, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => goToProject(proj)}>
                <View style={styles.listItem}>
                    <View style={styles.left}>
                        <Text style={styles.username}>{proj.title}</Text>
                    </View>
                    <View style={styles.middle}>
                        <Text style={styles.hashtag}>{proj.date_created}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView keyboardDismissMode='on-drag'
            contentContainerStyle={styles.scrollContainer}
        >
            <View>
                {
                    projects.length > 0 && projects.map((proj, index) => {
                        return (
                            projList(proj, index)
                        );
                    })

                }
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create(
    {
        scrollContainer: {
            padding: '4%',
            paddingBottom: '7%',
        },
        listItem: {
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth: 0.7,
            borderColor: '#ded4da',
            padding: 15,
            fontFamily: 'ArialRoundedMTBold',
            justifyContent: 'space-between'
        },

        title: {
            fontSize: 13,
            textAlign: 'left',
            padding: 5,
            color: '#0B0033',
            fontFamily: 'ArialRoundedMTBold',
        },
        date: {
            fontSize: 15,
            fontFamily: 'ArialRoundedMTBold',
            color: '#0B0033',
        },
        hashtag: {
            fontSize: 13,
            fontFamily: 'ArialRoundedMTBold',
            color: '#0B0033',
        },
        username: {
            fontSize: 13,
            fontFamily: 'ArialRoundedMTBold',
            color: '#0B0033',
        },
        location: {
            fontSize: 13,
            fontFamily: 'ArialRoundedMTBold',
            color: '#0B0033',
        },
        startBtn: {
            fontSize: 15,
        },
        addIcon: {
            alignSelf: 'center',
            backgroundColor: 'transparent',
            marginTop: '3%'
        },
        left: {
            display: 'flex',
        },
        middle: {
            display: 'flex',
        },
        right: {
            display: 'flex',
        },
    });

ProjectList.propTypes = {
    active: PropTypes.bool,
    projects: PropTypes.array,
    deleteProject: PropTypes.func,
    addProject: PropTypes.func,
    goToProject: PropTypes.func
}

ProjectList.defaultProps = {
    active: 'false',
    projects: [],
    deleteProject: null,
    addProject: null,
    goToProject: null
}

