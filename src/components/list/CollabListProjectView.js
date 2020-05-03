import React from 'react'
import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import { collabStyle } from '../../screens/Collab/styles/collab.styles'
import { base, colors, fonts } from '../../styles/base'
import { Avatar } from 'react-native-elements'
import { PulseIndicator } from 'react-native-indicators'

export const CollabListProjectView = ({ collabs, goToCollab }) => {
    const collabList = (collab, index) => {

        return <TouchableOpacity style={collabStyle.collabView} key={index} onPress={() => goToCollab(collab)}><Avatar
            size={75}
            rounded
            source={{
                uri: collab.details.influencer.profile_pic_url,
            }} />
            <Text style={{ ...base.text, fontSize: 13 }}>{`${collab.details.title} \nadded ${collab.details.date_created}`}</Text>
            {collab.details.active && <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ ...base.text, padding: 0, fontSize: 13 }}>Live</Text>
                <PulseIndicator size={20} color={colors.GREEN} /></View>}
        </TouchableOpacity >
    }

    return (
        <View>
            <ScrollView horizontal>
                {collabs.length > 0 && collabs.map((collab, index) => {
                    if (index < 5)
                        return collabList(collab, index)
                })}
            </ScrollView>
        </View>
    )

}
