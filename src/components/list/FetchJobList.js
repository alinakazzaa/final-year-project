import React from 'react'
import { Icon, Avatar } from 'react-native-elements'
import { StyleSheet, TouchableOpacity, Text, Keyboard, View, ScrollView } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'
import { PulseIndicator } from 'react-native-indicators';

import { IN_PROGRESS } from '../../constants/index'

export const FetchJobList = ({ fetchJobs, goToFetchJob, addFetchJob, deleteFetchJob }) => {
    const FJList = (fj, index) => {

        return (
            <TouchableOpacity key={index} onPress={() => goToFetchJob(fj)}>
                <View style={styles.listItem}>
                    <View style={styles.left}>
                        <Text style={styles.hashtag}>{`HASHTAG    ${fj.details.hashtag}`}</Text>
                        <Text style={styles.location}>{`LOCATION    ${fj.details.location}`}</Text>

                    </View>
                    <View>
                        <Text style={styles.date}>{fj.details.date_created}</Text>
                    </View>
                    {fj.details.status != IN_PROGRESS && <View>
                        <IconButton name="delete" type="MaterialIcons" size={23} color="#0B0033" onPress={() => deleteFetchJob(fj)} />
                    </View>}
                    <View>
                        {fj.details.status == IN_PROGRESS &&
                            <PulseIndicator size={20} color="green" />}
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
            justifyContent: 'space-between',
            alignItems: 'center'
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
    });

FetchJobList.propTypes = {
    fetchJobs: PropTypes.array.isRequired,
    goToFetchJob: PropTypes.func,
}

FetchJobList.defaultProps = {
    goToFetchJob: null,
}
