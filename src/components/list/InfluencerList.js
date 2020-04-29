import React from 'react'
import { Avatar, Icon } from 'react-native-elements'
import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'
import { formatNumber } from '../../actions/base'
import { influencer_style } from '../../screens/Influencer/styles/influencer.styles'
import { colors, base } from '../../styles/base'

export const InfluencerList = ({ influencers, goToInfluencer, createCollab, removeInfluencer, saveInfluencer, goToProfile }) => {

    const influList = (influ, index) => {
        if (influ !== null)
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
                    <View>
                        <View style={influencer_style.top}>
                            <Avatar
                                size={170}
                                rounded
                                source={{
                                    uri: influ.profile_pic_url,
                                }} />
                            <Text style={{ ...base.title, fontSize: 20, marginTop: 20 }}>{influ.username}</Text>
                        </View>
                        <View style={influencer_style.middle}>
                            <View style={influencer_style.infoBox}>
                                <View style={influencer_style.info}>
                                    <Text style={{ ...base.title, fontSize: 20 }}>Followers</Text>
                                    <Text style={{ ...base.text, fontSize: 20 }}>{formatNumber(influ.followers)}</Text>
                                </View>
                                <View style={influencer_style.info}>
                                    <Text style={{ ...base.title, fontSize: 20 }}>Media count</Text>
                                    <Text style={{ ...base.text, fontSize: 20 }}>{formatNumber(influ.media_count)}</Text>
                                </View>
                            </View>
                            <View><TouchableOpacity style={{ ...influencer_style.linkView, alignSelf: 'center' }} onPress={() => goToProfile(influ.profile_url)}>
                                <Text style={{ ...base.title, fontSize: 20 }}>Instagram profile</Text>
                                <IconButton
                                    name='launch'
                                    size={22}
                                    color={colors.TERTIARY}
                                    type='material-icons'
                                />
                            </TouchableOpacity></View>
                        </View>
                    </View>
                    <View style={influencer_style.footer}>
                        {influ.to_do && <TouchableOpacity style={influencer_style.voteOption}>
                            <IconButton
                                name='check'
                                size={50}
                                color={colors.GREEN}
                                type='material-icons'
                                onPress={() => saveInfluencer(influ)}
                            /></TouchableOpacity>}
                        <TouchableOpacity style={influencer_style.createCollab}>
                            <IconButton
                                name='account-multiple-plus-outline'
                                size={60}
                                color={colors.TERTIARY}
                                type='material-community'
                                onPress={() => createCollab(influ)}
                            /></TouchableOpacity>
                        <TouchableOpacity style={influencer_style.voteOption}>
                            <IconButton
                                name='close'
                                size={50}
                                color={colors.RED}
                                type='material-icons'
                                onPress={() => removeInfluencer(influ.id)}
                            /></TouchableOpacity>
                    </View>
                </View >
            )
    }

    return (

        <View style={{ marginBottom: 300 }}>
            <ScrollView keyboardDismissMode='on-drag'
                contentContainerStyle={base.scrollContainer}>
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
