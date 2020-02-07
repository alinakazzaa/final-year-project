import React from 'react'
import { Icon, Avatar } from 'react-native-elements'
import { StyleSheet, TouchableOpacity, Text, Keyboard, View, ScrollView } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'
import { TextButton } from '../buttons/TextButton'

export const InfluencerList = ({ criteria, influencers, goToInfluencer, addInfluencerByUsername, addToPotential, removeInfluencer }) => {
    const influList = (influ, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => console.log(influ)}>
                <View style={styles.listItem}>
                    <View style={styles.left}>
                        <Text style={styles.hashtag}>{influ.id}</Text>
                    </View>
                    <View style={styles.middle}>
                        <Text style={styles.hashtag}>{influ.followers}</Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.hashtag}>{influ.media_count}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (

        <View>
            {/* {criteria.hashtag && `# ${criteria.hashtag}`}
            {criteria.location && `Location ${criteria.location}`} */}
            <View style={styles.listHead}>
                <Text style={styles.headerTitle}>Username</Text>
                <Text style={styles.headerTitle}>Followers</Text>
                <Text style={styles.headerTitle}>Media</Text>
            </View>
            <ScrollView keyboardDismissMode='on-drag'
                contentContainerStyle={styles.scrollContainer}>
                {influencers.map((i, index) => {
                    return influList(i, index)
                })}
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

InfluencerList.PropTypes = {
    influencers: PropTypes.array.isRequired,
    goToInfluencer: PropTypes.func,
    addInfluencerByUsername: PropTypes.func,
    addToPotential: PropTypes.func,
    removeInfluencer: PropTypes.func,
    criteria: PropTypes.object
}

InfluencerList.defaultProps = {
    goToInfluencer: null,
    addInfluencerByUsername: null,
    addToPotential: null,
    removeInfluencer: null,
    criteria: {}
}
