import React from 'react'
import { Icon, Avatar } from 'react-native-elements'
import { StyleSheet, TouchableOpacity, Text, Keyboard, View, ScrollView } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'
import { TextButton } from '../buttons/TextButton'

export const FetchJobList = ({ fetchJobs, goToFetchJob, addFetchJob, startFetchJob }) => {

    const FJList = (fj, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => goToFetchJob(fj)}>
                <View style={styles.listItem}>
                    <View style={styles.left}>
                        <Text style={styles.hashtag}>{`HASHTAG    ${fj.hashtag}`}</Text>
                        <Text style={styles.location}>{`LOCATION    ${fj.location}`}</Text>

                    </View>
                    <View style={styles.middle}>
                        <Text style={styles.date}>{fj.date_created}</Text>
                    </View>
                    <View style={styles.right}>
                        <IconButton type="foundation" name="download" size={30} onPress={() => startFetchJob(fj)} color="#493649" />
                        {/* <TextButton style={styles.startBtn} onPress={} title="Start" /> */}
                    </View>
                </View>
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
                    name='plus'
                    size={40}
                    onPress={() => addFetchJob()}
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
            padding: '3%',
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
        headerTitle: {
            color: '#0B0033',
            fontSize: 14,
            textTransform: 'uppercase',
            fontWeight: '700',
            fontFamily: 'ArialRoundedMTBold',
            width: '25%'
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
        location: {
            fontSize: 13,
            textAlign: 'left',
            padding: 5,
            fontFamily: 'ArialRoundedMTBold',
            color: '#0B0033',
        },
        startBtn: {
            fontSize: 15,
            // textAlign: 'left',
            // width: '25%'
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

FetchJobList.propTypes = {
    fetchJobs: PropTypes.array.isRequired,
    goToFetchJob: PropTypes.func,
    startFetchJob: PropTypes.func,
}

FetchJobList.defaultProps = {
    goToFetchJob: null,
    startFetchJob: null
}
