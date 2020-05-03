import React from 'react'
import { TouchableOpacity, Text, View, ScrollView, Image } from 'react-native'
import { collabStyle } from '../../screens/Collab/styles/collab.styles'
import { base, colors, fonts } from '../../styles/base'
import { Avatar, Divider } from 'react-native-elements'
import { PulseIndicator } from 'react-native-indicators'
import { Gradient } from '../../styles/Gradient'

export const CollabListProjectView = ({ collabs, goToCollab, isHome }) => {
    const collabList = (collab, index) => {

        return <Gradient style={collabStyle.collabView}><TouchableOpacity key={index} onPress={() => goToCollab(collab)}>
            <Avatar
                size={90}
                rounded
                containerStyle={{ alignSelf: 'center', marginBottom: 10 }}
                source={{
                    uri: collab.details.influencer.profile_pic_url,
                }} />
            <Divider />
            <Text style={{ ...base.title, color: colors.WHITE, alignSelf: 'center', fontSize: 12, padding: 5 }}>{`${collab.details.title}`}</Text>
            <Divider />
            {collab.details.active ?
                <View style={{
                    display: 'flex', flexDirection: 'row'
                }}>
                    <Text style={{ ...base.text, color: colors.WHITE, paddingTop: 18, fontSize: 13, margin: 0 }}>Live</Text>
                    <PulseIndicator size={20} color={colors.GREEN} />
                </View> : <Text style={{ ...base.text, color: colors.WHITE, paddingTop: 18, fontSize: 13, margin: 0 }}>{`start ${collab.details.date_start}`}</Text>
            }
        </TouchableOpacity >
        </Gradient>
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
