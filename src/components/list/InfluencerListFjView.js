import React from 'react'
import { Icon, Avatar } from 'react-native-elements'
import { StyleSheet, TouchableOpacity, Text, Keyboard, View, ScrollView } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'
import { TextButton } from '../buttons/TextButton'
import { spacing } from '../../styles/base'

export const InfluencerListFjView = ({ influencers, goToInfluencer, addInfluencerByUsername, addToPotential, removeInfluencer }) => {
    let COUNT = 0
    const influList = (influ, index) => {
        return (
            <View style={styles.listItem} key={index}>
                <TouchableOpacity key={index} onPress={() => goToInfluencer(influ)}>
                    <Avatar
                        size="large"
                        rounded
                        source={{
                            uri: influ.profile_pic_url,
                        }} />
                    <Text style={styles.userName}>{influ.username}</Text>
                </TouchableOpacity></View>
        )
    }

    return (

        <View>
            <ScrollView
                horizontal
                keyboardDismissMode='on-drag'
                contentContainerStyle={styles.scrollContainer}>

                {influencers.length > 0 && influencers.map((i, index) => {
                    COUNT++
                    return COUNT < 5 && influList(i, index)
                })}
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create(
    {
        listHead: {
            // display: 'flex',
            // flexDirection: 'row',
            // color: '#5d4d50',
            // justifyContent: 'space-around',
        },
        scrollContainer: {
            paddingTop: spacing.LARGE,
            paddingBottom: spacing.LARGE

        },
        listItem: {
            display: 'flex',
            borderLeftWidth: 0.5,
            borderColor: '#ded4da',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            alignContent: 'center',
            paddingLeft: 10,
            fontFamily: 'ArialRoundedMTBold',
        },
        headerTitle: {
            // color: '#0B0033',
            // fontSize: 14,
            // textTransform: 'uppercase',
            // fontWeight: '700',
            // fontFamily: 'ArialRoundedMTBold',
            // width: '25%'
        },
        title: {
            // fontSize: 13,
            // textAlign: 'left',
            // padding: 5,
            // color: '#0B0033',
            // fontFamily: 'ArialRoundedMTBold',
        },
        userName: {
            fontSize: 11,
            textAlign: 'left',
            padding: 5,
            fontFamily: 'ArialRoundedMTBold',
            color: '#0B0033',
        },
        hashtag: {
            // fontSize: 13,
            // textAlign: 'left',
            // padding: 5,
            // fontFamily: 'ArialRoundedMTBold',
            // color: '#0B0033',
        },
        location: {
            // fontSize: 13,
            // textAlign: 'left',
            // padding: 5,
            // fontFamily: 'ArialRoundedMTBold',
            // color: '#0B0033',
        },
        startBtn: {
            fontSize: 15,
            // textAlign: 'left',
            // width: '25%'
        },
        addIcon: {
            // alignSelf: 'center',
            // backgroundColor: 'transparent',
            // marginTop: '3%'
        },
        left: {
            // display: 'flex',
            // flexDirection: 'column',
        },
        middle: {
            // display: 'flex',
        },
        right: {
            // display: 'flex',
        }
    });

InfluencerListFjView.propTypes = {
    influencers: PropTypes.array.isRequired,
    goToInfluencer: PropTypes.func,
    addInfluencerByUsername: PropTypes.func,
    addToPotential: PropTypes.func,
    removeInfluencer: PropTypes.func,
    criteria: PropTypes.object
}

InfluencerListFjView.defaultProps = {
    goToInfluencer: null,
    addInfluencerByUsername: null,
    addToPotential: null,
    removeInfluencer: null,
    criteria: {}
}
