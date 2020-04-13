import React from 'react'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'
import { removeInfluencer } from '../../actions/influencer'
import { formatNumber } from '../../actions/base'
import { influencer_style } from '../../screens/Influencer/styles/influencer.styles'
import { colors } from '../../styles/base'

export const InfluencerList = ({ influencers, current_fetch_job, goToInfluencer, createCollab, addInfluencerByUsername, saveInfluencer }) => {

    const influList = (influ, index) => {
        return (
            <View style={influencer_style.listItem} key={index}>
                <View style={influencer_style.header}>
                    <IconButton
                        name='chevron-right'
                        size={50}
                        color={colors.TERTIARY}
                        type='material-icons'
                        onPress={() => goToInfluencer(influ)}
                    />
                </View>
                <View style={influencer_style.middle}>
                    <View style={influencer_style.middleLeft}>
                        <Avatar
                            size={160}
                            rounded
                            source={{
                                uri: influ.profile_pic_url,
                            }} />
                        <TouchableOpacity style={influencer_style.linkView} onPress={() => console.log("Go to user profile....")}>
                            <Text style={influencer_style.linkText}>Instagram</Text>
                            <IconButton
                                name='launch'
                                size={22}
                                color={colors.TERTIARY}
                                type='material-icons'
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={influencer_style.middleRight}>
                        <View style={influencer_style.info}>
                            <Text style={influencer_style.title}>Followers</Text>
                            <Text style={influencer_style.infoText}>{formatNumber(influ.followers)}</Text>
                            <Text style={influencer_style.title}>No of media</Text>
                            <Text style={influencer_style.infoText}>{formatNumber(influ.media_count)}</Text>
                        </View>
                    </View>
                </View>
                <View style={influencer_style.footer}>
                    <TouchableOpacity style={influencer_style.voteOption}>
                        <IconButton
                            name='check'
                            size={50}
                            color={colors.GREEN}
                            type='material-icons'
                            onPress={() => saveInfluencer(current_fetch_job, influ.id)}
                        /></TouchableOpacity>
                    <TouchableOpacity style={influencer_style.createCollab}>
                        <IconButton
                            name='create'
                            size={40}
                            color={colors.SECONDARY}
                            type='material-icons'
                            onPress={() => createCollab(influ)}
                        /></TouchableOpacity>
                    <TouchableOpacity style={influencer_style.voteOption}>
                        <IconButton
                            name='close'
                            size={50}
                            color={colors.RED}
                            type='material-icons'
                            onPress={() => removeInfluencer(current_fetch_job, influ.id)}
                        /></TouchableOpacity>
                </View>
            </View>
        )
    }

    return (

        <View>
            <ScrollView keyboardDismissMode='on-drag'
                contentContainerStyle={influencer_style.scrollContainer}>
                {influencers.map((i, index) => {
                    return influList(i, index)
                })}
            </ScrollView>
        </View>
    )

}

InfluencerList.propTypes = {
    influencers: PropTypes.array.isRequired,
    current_project: PropTypes.object.isRequired,
    current_fetch_job: PropTypes.object.isRequired,
    goToInfluencer: PropTypes.func,
    addInfluencerByUsername: PropTypes.func,
    saveInfluencer: PropTypes.func,
    removeInfluencer: PropTypes.func,
    criteria: PropTypes.object
}

InfluencerList.defaultProps = {
    goToInfluencer: null,
    addInfluencerByUsername: null,
    saveInfluencer: null,
    removeInfluencer: null,
    criteria: {}
}
