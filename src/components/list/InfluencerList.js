import React from 'react'
import { Icon, Avatar } from 'react-native-elements'
import { StyleSheet, TouchableOpacity, Text, Keyboard, View, ScrollView } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'
import { TextButton } from '../buttons/TextButton'
import { removeInfluencer } from '../../actions/influencer'

export const InfluencerList = ({ influencers, current_project, current_fetch_job, goToInfluencer, addInfluencerByUsername, addToPotential }) => {

    const formatNumber = num => {
        let parsed
        { num ? parsed = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 'loading...' }
        return parsed
    }

    const influList = (influ, index) => {
        return (
            <View style={styles.listItem} key={index}>
                <View style={styles.itemHeader}>
                    <Text style={styles.username}>{influ.username}</Text>
                    <Icon
                        name='chevron-right'
                        size={50}
                        color="#493649"
                        type='MaterialIcons'
                        style={styles.icon}
                        onPress={() => goToInfluencer(influ)}
                    />
                </View>
                <View style={styles.middle}>
                    <View style={styles.middleLeft}>
                        <View style={styles.info}>
                            <Text style={styles.title}>Followers</Text>
                            <Text style={styles.infoText}>{formatNumber(influ.followers)}</Text>
                            <Text style={styles.title}>Following</Text>
                            <Text style={styles.infoText}>{formatNumber(influ.following)}</Text>
                            <Text style={styles.title}>No of media</Text>
                            <Text style={styles.infoText}>{formatNumber(influ.media_count)}</Text>
                        </View>
                    </View>
                    <View style={styles.middleRight}>
                        <Avatar
                            size={120}
                            rounded
                            source={{
                                uri: influ.profile_pic_url,
                            }} />
                        <View>
                            <TouchableOpacity style={styles.instaLink} onPress={() => console.log("Go to user profile....")}>
                                <Text style={styles.linkText}>Instagram</Text>
                                <IconButton
                                    name='launch'
                                    size={20}
                                    color="#493649"
                                    type='material-icons'
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.business}>
                    {influ.is_business_account && <IconButton
                        name='briefcase'
                        size={20}
                        color="#493649"
                        style={styles.icon}
                    />}
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.title}>Biography</Text>
                    <Text style={styles.bio}>{influ.biography}</Text>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footerYes}>
                        <Icon
                            name='check'
                            size={50}
                            color="green"
                            type='MaterialIcons'
                            style={styles.icon}
                        /></TouchableOpacity>
                    <TouchableOpacity style={styles.footerCollab}>
                        <Icon
                            name='create'
                            size={40}
                            color="#ded4da"
                            type='MaterialIcons'
                        /></TouchableOpacity>
                    <TouchableOpacity style={styles.footerNo}>
                        <Icon
                            name='close'
                            size={50}
                            color="red"
                            type='MaterialIcons'
                            style={styles.icon}
                            onPress={() => removeInfluencer(current_fetch_job.hashtag, influ.id)}
                        /></TouchableOpacity>
                </View>
            </View>
        )
    }

    return (

        <View>
            <View style={styles.pageHead}>
                <Text style={styles.headerTitle}>{current_project.title}</Text>
                <Text style={styles.headerTitle}>{`# fetch ${current_fetch_job.hashtag}`
                    || `location fetch ${current_fetch_job.location}`}</Text>
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
        pageHead: {
            flexDirection: 'row',
            padding: 10,
        },
        itemHeader: {
            borderBottomWidth: 0.5,
            borderColor: '#ded4da',
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        username: {
            color: '#0B0033',
            fontSize: 19,
            textTransform: 'uppercase',
            fontWeight: '400',
            fontFamily: 'ArialRoundedMTBold',
        },
        headerTitle: {
            color: '#0B0033',
            fontSize: 16,
            textTransform: 'uppercase',
            fontWeight: '700',
            fontFamily: 'ArialRoundedMTBold',
        },
        title: {
            color: '#0B0033',
            fontSize: 14,
            textTransform: 'uppercase',
            fontWeight: '700',
            fontFamily: 'ArialRoundedMTBold',
        },
        bio: {
            fontSize: 14,
            fontFamily: 'Arial',
            paddingTop: 10,
            flexWrap: 'wrap',
        },
        addIcon: {
            alignSelf: 'center',
            backgroundColor: 'transparent'
        },
        scrollContainer: {
            padding: '3%',
        },
        info: {
            justifyContent: 'space-between',
            padding: 20,
            paddingTop: 30
        },
        infoText: {
            fontSize: 18,
            fontFamily: 'Arial',
            fontWeight: '100',
            paddingBottom: 10,
            paddingTop: 10,
            flexWrap: 'wrap',
            color: '#0B0033'
        },
        instaLink: {
            flexDirection: 'row',
        },
        linkText: {
            color: "#493649",
            fontSize: 18,
            textTransform: 'uppercase',
            fontFamily: 'Arial',
            paddingRight: 5,
            fontWeight: '700'
        },
        listItem: {
            display: 'flex',
            backgroundColor: '#F5F5F5',
            borderRadius: 8,
            color: "#0B0033",
            shadowColor: '#584158',
            shadowOffset: { width: 3, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 7,
            flexDirection: 'column',
            padding: 10,
            marginBottom: 30
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            padding: 20,
            paddingLeft: 30,
            justifyContent: 'space-evenly',
        },
        middle: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        middleLeft: {
        },

        middleRight: {
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            padding: 20

        },
        bottom: {
            padding: 20
        },
        footer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            borderTopWidth: 1,
            borderTopColor: '#ded4da',
        },
        icon: {
            fontWeight: '500',
        },
        cancelBtn: {
            marginRight: 10
        },
        scene: {
            flex: 1,
        },
        business: {
            paddingLeft: 20,
            alignItems: 'flex-start'
        },
        footerYes: {
            borderRightWidth: 0.4,
            borderColor: '#ded4da',
            width: '30%'
        },
        footerCollab: {
            width: '40%',
            paddingTop: '2%'
        },
        footerNo: {
            borderLeftWidth: 0.4,
            borderColor: '#ded4da',
            width: '30%'
        }
    });

InfluencerList.propTypes = {
    influencers: PropTypes.array.isRequired,
    current_project: PropTypes.object.isRequired,
    current_fetch_job: PropTypes.object.isRequired,
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
