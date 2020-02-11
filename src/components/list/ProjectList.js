import React from 'react'
import { Icon, Avatar } from 'react-native-elements'
import { StyleSheet, TouchableOpacity, Text, Keyboard, View, ScrollView, Dimensions } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'

export const ProjectList = ({ active, projects, deleteProject, addProject, goToProject }) => {
    // const influList = (influ, index) => {
    //     return (
    //         <TouchableOpacity key={index} onPress={() => console.log(influ)}>
    //             <View style={styles.listItem}>
    //                 <View style={styles.left}>
    //                     <Avatar
    //                         size="medium"
    //                         rounded
    //                         source={{
    //                             uri: influ.profile_pic_url,
    //                         }} />
    //                 </View>
    //                 <View style={styles.left}>
    //                     <Text style={styles.username}>{influ.username}</Text>
    //                 </View>
    //                 <View style={styles.middle}>
    //                     <Text style={styles.hashtag}>{influ.followers}</Text>
    //                 </View>
    //                 <View style={styles.right}>
    //                     <Text style={styles.hashtag}>{influ.media_count}</Text>
    //                 </View>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }


    const projList = (proj, index) => {
        proj = { ...proj } || {}
        let collabs = proj.collabs
        // const noOfCollabs = collabs.length;
        // let extraColls;

        // if (noOfCollabs > 4) {
        //     collabs = collabs.splice(noOfCollabs - 4);
        //     extraColls = noOfCollabs - 4;
        // }
        return (
            <View style={styles.listItem} key={index}>

                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{proj.details.title}</Text>
                </View>
                <View style={{ padding: '5%' }}>
                    <View style={styles.description}>
                        <Text style={{ fontSize: 15, fontWeight: '500', marginBottom: '5%' }}>Description</Text>
                        <Text style={{ color: 'black', marginBottom: '5%', fontStyle: "italic" }}>{proj.details.description}</Text>
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: '500', marginBottom: '4%' }}>Collabs</Text>
                    {!collabs && <Text>None</Text>}
                    {collabs &&
                        <View style={styles.collabs}>
                            {collabs.length > 0 && collabs.map((collab, index) => {
                                return (
                                    <Avatar
                                        size="medium"
                                        containerStyle={styles.avatar}
                                        rounded
                                        source={{
                                            uri: collab.profileUrl,
                                        }}
                                        key={index}
                                    />
                                );
                            })}
                            {collabs.length > 3 && <Text style={{ fontSize: 14, fontFamily: 'ArialRoundedMTBold', alignSelf: 'center', marginLeft: '3%', fontWeight: '500', color: 'black', opacity: 0.4 }}>+ {collabs.length - 4} more</Text>}
                        </View>}
                    <View style={styles.footer}>
                        <Text style={{ fontSize: 13, paddingRight: '5%', fontFamily: 'ArialRoundedMTBold' }}>Date created</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'ArialRoundedMTBold' }}>{proj.details.date_created}</Text>
                    </View>
                </View>
                <View style={styles.projFooter} key={proj} >
                    <Icon
                        name='delete'
                        size={30}
                        color="#493649"
                        type='MaterialIcons'
                        style={styles.icon}
                        onPress={() => deleteProject(proj)} />
                    <Icon
                        name='chevron-right'
                        size={50}
                        color="#493649"
                        type='MaterialIcons'
                        style={styles.icon}
                        onPress={() => goToProject(proj)} />
                </View>
            </View>
        )
    }

    const screenHeight = Dimensions.get('window').height

    return (
        <ScrollView keyboardDismissMode='on-drag'
            contentContainerStyle={styles.scrollContainer}
        >
            <View style={styles.projList}>
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
        main:
        {

            // flexDirection: 'column',

        },
        addIcon: {
            alignSelf: 'center',
            backgroundColor: 'transparent'
        },
        projTab: {
            backgroundColor: '#C0C4F3'
        },
        scrollContainer: {
            padding: '3%',
        },
        addBtn: {
            borderWidth: 1,
            borderColor: '#c2c2d6',
            borderRadius: 3,
            padding: 5,
            shadowColor: '#666699',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
        },
        topSection: {
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            margin: '5%'
        },
        projFooter: {
            padding: '3%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderTopColor: '#ded4da',
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
            width: '90%',
            flexDirection: 'column',
            marginBottom: '5%',
        },
        headerTitle: {
            color: '#493649',
            fontSize: 20,
            textTransform: 'uppercase',
            fontWeight: '700',
            fontFamily: 'ArialRoundedMTBold',
            padding: '5%'
        },
        header: {
            width: '100%',
        },
        footer: {
            flexDirection: 'row',
            width: '100%',
            paddingTop: '5%',
            paddingLeft: 0
        },
        collabs: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '5%'
        },
        avatar: {
            margin: 8,
            marginLeft: 0,
        },
        description: {

        },
        icon: {
            fontWeight: '100',
        },
        projList: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            // height: '60%',
            marginTop: '4%',
            justifyContent: 'center'
        },
        colTitles: {
            color: '#0B0033',
            fontSize: 17,
            fontWeight: '700',
            justifyContent: 'flex-end',
            width: '33%',
            textAlign: 'center',
            marginRight: '1%',
        },
        itemData: {
            color: '#0B0033',
            margin: '1%',
            paddingTop: '1%',
            paddingBottom: '1%',
            width: '33%',
            fontSize: 16,
            textAlign: 'center',
        },
        listHeader: {
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 20,
            justifyContent: 'space-evenly',
        },
        txtStyle: {
            fontFamily: 'ArialRoundedMTBold',
            fontSize: 19,
            color: '#33334d',
        },

        inputStyle: {
            height: 45,
            width: 270,
            borderColor: '#c2c2d6',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,

        },
        cancelBtn: {
            marginRight: 10
        },
        scene: {
            flex: 1,
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
