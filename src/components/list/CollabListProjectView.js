import React from 'react'
import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import { collabStyle } from '../../screens/Collab/styles/collab.styles'
import { base, colors } from '../../styles/base'
import { Avatar } from 'react-native-elements'
import { PulseIndicator } from 'react-native-indicators'

export const CollabListProjectView = ({ collabs, goToCollab }) => {
    const collabList = (collab, index) => {

        return <TouchableOpacity style={collabStyle.collabView} key={index} onPress={() => goToCollab(collab)}>
            <Avatar
                size={70}
                rounded
                source={{
                    uri: collab.details.influencer.profile_pic_url,
                }} />
            <Text style={base.text}>{collab.details.title}</Text>
        </TouchableOpacity >
    }

    return (

        <ScrollView horizontal style={base.scrollContainer}>
            {collabs.length > 0 && collabs.map((collab, index) => {
                if (index < 5)
                    return collabList(collab, index)
            })}

        </ScrollView>
    )

}
