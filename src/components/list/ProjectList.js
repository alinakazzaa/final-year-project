import React from 'react'
import { Icon, Avatar } from 'react-native-elements'
import { StyleSheet, TouchableOpacity, Text, Keyboard, View, ScrollView, Dimensions } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'

export const ProjectList = ({ active, projects, deleteProject, addProject, goToProject }) => {
    const projList = (proj, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => goToProject(proj)}>
                <View style={styles.listItem}>
                    <View style={styles.left}>
                    </View>
                    <View style={styles.left}>
                        <Text style={styles.username}>{proj.title}</Text>
                    </View>
                    <View style={styles.middle}>
                        <Text style={styles.hashtag}>{proj.date_created}</Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.hashtag}>{proj.active}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const screenHeight = Dimensions.get('window').height

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
            padding: '3%',
            paddingBottom: '10%',
        },
        listItem: {
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth: 0.5,
            borderColor: '#ded4da',
            padding: 15,
            marginRight: '5%',
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
            textAlign: 'left',
            padding: 5,
            fontFamily: 'ArialRoundedMTBold',
            color: '#0B0033',
        },
        hashtag: {
            fontSize: 13,
            textAlign: 'left',
            padding: 5,
            fontFamily: 'ArialRoundedMTBold',
            color: '#0B0033',
        },
        username: {
            fontSize: 13,
            padding: 5,
            fontFamily: 'ArialRoundedMTBold',
            color: '#0B0033',
        },
        location: {
            fontSize: 13,
            textAlign: 'left',
            padding: 5,
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
            flexDirection: 'column',
        },
        middle: {
            display: 'flex',
        },
        right: {
            display: 'flex',
        }
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
