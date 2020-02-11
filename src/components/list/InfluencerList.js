import React from 'react'
import { Icon, Avatar } from 'react-native-elements'
import { StyleSheet, TouchableOpacity, Text, Keyboard, View, ScrollView } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'
import { TextButton } from '../buttons/TextButton'

export const InfluencerList = ({ influencers, current_project, current_fetch_job, goToInfluencer, addInfluencerByUsername, addToPotential, removeInfluencer }) => {

    const formatNumber = num => {
        let parsed
        { num ? parsed = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 'loading...' }
        return parsed
    }

    const influList = (influ, index) => {

        return (
            <View style={styles.listItem} key={index}>
                <View style={styles.itemHeader}>
                    <Text style={styles.headerTitle}>{influ.username}</Text>
                </View>
                <View style={styles.middle}>
                    <View style={styles.middleLeft}>
                        <View style={styles.info}>
                            <Text style={styles.title}>Followers</Text>
                            <Text style={styles.infoText}>{formatNumber(influ.followers)}</Text>
                            <Text style={styles.title}>Following</Text>
                            <Text style={styles.infoText}>{formatNumber(influ.following)}</Text>
                            <Text style={styles.title}>No of media</Text>
                            <Text style={styles.infoText}>{formatNumber(influ.media)}</Text>
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
                <View style={styles.bottom}>
                    <Text style={styles.title}>Biography</Text>
                    <Text style={styles.bio}>{influ.bio}</Text>
                </View>
                <View style={styles.footer}>
                    <Icon
                        name='delete'
                        size={30}
                        color="#493649"
                        type='MaterialIcons'
                        style={styles.icon}
                    // onPress={() => deleteProject(proj)}
                    />
                    <Icon
                        name='chevron-right'
                        size={50}
                        color="#493649"
                        type='MaterialIcons'
                        style={styles.icon}
                        onPress={() => console.log(influ)}
                    />
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
            justifyContent: 'space-between'
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
            fontSize: 14,
            fontFamily: 'Arial',
            paddingBottom: 10,
            paddingTop: 10,
            flexWrap: 'wrap'
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
            padding: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderTopColor: '#ded4da',
        },
        icon: {
            fontWeight: '100',
        },

        cancelBtn: {
            marginRight: 10
        },
        scene: {
            flex: 1,
        },


        // scrollContainer: {
        //     padding: '3%',
        //     paddingBottom: '10%',
        // },
        // listItem: {
        //     display: 'flex',
        //     flexDirection: 'row',
        //     borderBottomWidth: 0.5,
        //     borderColor: '#ded4da',
        //     padding: 15,
        //     marginRight: '5%',
        //     fontFamily: 'ArialRoundedMTBold',
        //     justifyContent: 'space-between'
        // },

        // title: {
        //     fontSize: 13,
        //     textAlign: 'left',
        //     padding: 5,
        //     color: '#0B0033',
        //     fontFamily: 'ArialRoundedMTBold',
        // },
        // date: {
        //     fontSize: 15,
        //     textAlign: 'left',
        //     padding: 5,
        //     fontFamily: 'ArialRoundedMTBold',
        //     color: '#0B0033',
        // },
        // hashtag: {
        //     fontSize: 13,
        //     textAlign: 'left',
        //     padding: 5,
        //     fontFamily: 'ArialRoundedMTBold',
        //     color: '#0B0033',
        // },
        // username: {
        //     fontSize: 13,
        //     padding: 5,
        //     fontFamily: 'ArialRoundedMTBold',
        //     color: '#0B0033',
        // },
        // location: {
        //     fontSize: 13,
        //     textAlign: 'left',
        //     padding: 5,
        //     fontFamily: 'ArialRoundedMTBold',
        //     color: '#0B0033',
        // },
        // startBtn: {
        //     fontSize: 15,
        //     // textAlign: 'left',
        //     // width: '25%'
        // },
        // addIcon: {
        //     alignSelf: 'center',
        //     backgroundColor: 'transparent',
        //     marginTop: '3%'
        // },
        // left: {
        //     display: 'flex',
        //     flexDirection: 'column',
        // },
        // middle: {
        //     display: 'flex',
        // },
        // right: {
        //     display: 'flex',
        // }
    });

InfluencerList.PropTypes = {
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
