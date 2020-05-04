import React from 'react'
import { Avatar, Image } from 'react-native-elements'
import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'
import { formatNumber } from '../../actions/base'
import { influencer_style } from '../../screens/Influencer/styles/influencer.styles'
import { colors, base, dimensions } from '../../styles/base'

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
                            <View><Avatar
                                size={150}
                                rounded
                                source={{
                                    uri: influ.profile_pic_url,
                                }} />
                                <Text style={{ ...base.text, fontSize: 20, padding: 0, margin: 0, paddingTop: 20 }}>{influ.username}</Text>
                            </View>
                            <View style={influencer_style.infoBox}>
                                <View style={influencer_style.info}>
                                    <Text style={{ ...base.text, fontSize: 16, padding: 0, margin: 0 }}>Followers</Text>
                                    <Text style={{ ...base.title, fontSize: 18, padding: 0, margin: 0 }}>{formatNumber(influ.followers)}</Text>
                                </View>
                                <View style={influencer_style.info}>
                                    <Text style={{ ...base.text, fontSize: 16, padding: 0, margin: 0 }}>Media count</Text>
                                    <Text style={{ ...base.title, fontSize: 18, padding: 0, margin: 0 }}>{formatNumber(influ.media_count)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={influencer_style.middle}>
                            <View><TouchableOpacity style={{ ...influencer_style.linkView, alignSelf: 'center', alignItems: 'center' }} onPress={() => goToProfile(influ.profile_url)}>
                                <Image style={{ height: 60, width: 60 }} source={require(
                                    // @ts-ignore
                                    '../../assets/resources/images/instagram-logo.png')} />
                                <Text style={{ ...base.text, fontSize: 14, padding: 0, margin: 0 }}>Go to profile</Text>
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
                                size={35}
                                color={colors.TERTIARY}
                                type='material-community'
                                onPress={() => createCollab(influ)}
                            />
                            <Text style={{ ...base.text, fontSize: 14, padding: 0, margin: 0 }}>New collab</Text>
                        </TouchableOpacity>
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

        <View>
            <ScrollView keyboardDismissMode='on-drag'
                contentContainerStyle={base.scrollContainer}>
                <View style={{ marginBottom: dimensions.fullHeight * 0.4 }}>
                    {influencers.map((i, index) => {
                        return influList(i, index)
                    })}
                </View>
            </ScrollView >
        </View >
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
