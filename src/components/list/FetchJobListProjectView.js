import React from 'react'
import { Icon, Avatar } from 'react-native-elements'
import { StyleSheet, TouchableOpacity, Text, Keyboard, View, ScrollView } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'
import { TextButton } from '../buttons/TextButton'

export const FetchJobListProjectView = ({ fetch_jobs, goToFetchJob }) => {
    const FJList = (fj, index) => {
        return <TouchableOpacity style={styles.fetchJob} key={index} onPress={() => goToFetchJob(fj)}>
            <Text style={styles.fjData}>{fj.hashtag}</Text>
            <Text style={styles.fjData}>{fj.date_created}</Text>
            {/* <Text style={styles.fjData}>{fj.no_of_influencers}</Text> */}
        </TouchableOpacity >
    }

    return (

        <View>
            {fetch_jobs.length > 0 && fetch_jobs.map((fj, index) => {
                if (index < 5)
                    return FJList(fj, index)
                return
            })}

        </View>
    )

}

const styles = StyleSheet.create(
    {
        fetchJob: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 13,
            borderBottomWidth: 0.5,
            borderColor: '#ded4da',
        },
        fjData: {
            color: '#846284',
            textTransform: 'uppercase',
            fontSize: 14,
        },
        viewAllBtn: {
            alignSelf: 'center',
            flexWrap: 'wrap'
        },
        title: {
            fontSize: 16,
            color: '#493649',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'left',
            marginBottom: '4%',
            paddingTop: '3%',
            marginLeft: '3%'
        },
    });

FetchJobListProjectView.propTypes = {
    fetch_jobs: PropTypes.array.isRequired,
    goToFetchJob: PropTypes.func,
}

FetchJobListProjectView.defaultProps = {
    goToFetchJob: null,
}
