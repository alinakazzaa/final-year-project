import React from 'react'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { base } from '../../styles/base'
import { influencer_style } from '../../screens/Influencer/styles/influencer.styles'

export const InfluencerListFjView = ({ influencers, goToInfluencer }) => {
    let COUNT = 0
    const influList = (influ, index) => {
        return (
            <View style={influencer_style.fjListItem} key={index}>
                <TouchableOpacity key={index} onPress={() => goToInfluencer(influ)}>
                    <Avatar
                        size={100}
                        rounded
                        containerStyle={{ alignSelf: 'center' }}
                        source={{
                            uri: influ.profile_pic_url,
                        }} />
                    <Text style={influencer_style.influUsername}>{influ.username}</Text>
                </TouchableOpacity></View>
        )
    }

    return (
        <ScrollView
            keyboardDismissMode='on-drag'
            horizontal
            contentContainerStyle={base.scrollContainer}>
            <View style={influencer_style.influList}>
                {influencers.length > 0 && influencers.map((i, index) => {
                    COUNT++
                    return COUNT < 5 && influList(i, index)
                })}
            </View>
        </ScrollView>

    )

}

InfluencerListFjView.propTypes = {
    influencers: PropTypes.array.isRequired,
    goToInfluencer: PropTypes.func
}

InfluencerListFjView.defaultProps = {
    goToInfluencer: null
}
