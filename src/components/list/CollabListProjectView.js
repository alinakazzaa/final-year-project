import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { project_style } from '../../screens/Project/styles/project.styles'
import { base, colors } from '../../styles/base'
import { Avatar } from 'react-native-elements'
import { PulseIndicator } from 'react-native-indicators'

export const CollabListProjectView = ({ collabs, goToCollab }) => {
    const collabList = (collab, index) => {

        return <TouchableOpacity style={project_style.fetchJob} key={index} onPress={() => goToCollab(collab)}>
            <Avatar
                size={110}
                rounded
                containerStyle={{ alignSelf: 'center' }}
                source={{
                    uri: collab.details.influencer.profile_pic_url,
                }} />
            <Text style={base.text}>{collab.details.title}</Text>
            <Text style={base.text}>{collab.details.active && <PulseIndicator size={20} color={colors.GREEN} />}</Text>
        </TouchableOpacity >
    }

    return (

        <View>
            {collabs.length > 0 && collabs.map((collab, index) => {
                if (index < 5)
                    return collabList(collab, index)
                return
            })}

        </View>
    )

}
