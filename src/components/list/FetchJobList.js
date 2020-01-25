import React from 'react'
import { Icon, Avatar } from 'react-native-elements'
import { StyleSheet, TouchableOpacity, Text, Keyboard, View, ScrollView } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'

export const FetchJobList = ({ fetchJobs, goToFetchJob }) => {
    const FJList = (fj, index) => {
        return (
            <TouchableOpacity style={styles.listItem} key={index} onPress={() => goToFetchJob(fj)}>
                <Text style={styles.rowTxt}>{fj.title}</Text>
                <Text style={styles.rowTxt}>{fj.date_created}</Text>
                <Text style={styles.rowTxt}>{fj.hashtag}</Text>
                <Text style={styles.rowTxt}>{fj.location}</Text>
            </TouchableOpacity>
        )
    }

    return (

        <View>
            <View style={styles.listHead}>
                <Text style={styles.headerTitle}>Title</Text>
                <Text style={styles.headerTitle}>Date</Text>
                <Text style={styles.headerTitle}>Hashtag</Text>
                <Text style={styles.headerTitle}>Location</Text>
            </View>
            <ScrollView keyboardDismissMode='on-drag'
                contentContainerStyle={styles.scrollContainer}>
                {fetchJobs.map((fj, index) => {
                    return FJList(fj, index)
                })}
                <IconButton
                    // raised
                    color="#493649"
                    type='plus'
                    size={40}
                    // onPress={() => addProject()}
                    style={styles.addIcon}
                // reverse
                />
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create(
    {
        listHead: {
            display: 'flex',
            flexDirection: 'row',
            color: '#5d4d50',
            justifyContent: 'space-around',
            padding: 13,
            marginRight: '2%',
            marginLeft: '2%',
        },
        scrollContainer: {
            paddingTop: '3%',
            paddingBottom: '10%',
            height: '100%'
        },
        listItem: {
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth: 0.5,
            borderColor: '#ded4da',
            padding: 10,
            fontFamily: 'ArialRoundedMTBold',
            height: '13%',
            marginRight: '2%',
            marginLeft: '2%',
        },
        headerTitle: {
            color: '#0B0033',
            fontSize: 14,
            textTransform: 'uppercase',
            fontWeight: '700',
            fontFamily: 'ArialRoundedMTBold',
            width: '25%'
        },
        rowTxt: {
            fontSize: 17,
            textAlign: 'left',
            width: '25%'
        },
        addIcon: {
            alignSelf: 'center',
            backgroundColor: 'transparent',
            marginTop: '3%'
        },
    });

FetchJobList.PropTypes = {
    fetchJobs: PropTypes.array.isRequired,
    goToFetchJob: PropTypes.func,
}

FetchJobList.defaultProps = {
    goToFetchJob: null
}
