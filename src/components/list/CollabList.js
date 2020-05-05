import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { collabStyle } from '../../screens/Collab/styles/collab.styles'
import { Avatar } from 'react-native-elements'
import { colors, base, dimensions } from '../../styles/base'
import { IconButton } from '../buttons/IconButton'


export const CollabList = ({ collabs, deleteCollab, goToCollab }) => {
    const collabList = (collab, index) => {
        return (
            <View key={index}>
                <View style={collabStyle.listItem}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingLeft: 0, alignItems: 'center' }}>
                        <Text style={{ ...base.title, color: colors.PRIMARY }}>{collab.details.title}</Text>
                    </View>
                    <View style={collabStyle.top}>
                        <Avatar
                            size={130}
                            rounded
                            containerStyle={{ alignSelf: 'center', marginBottom: 20, marginTop: 20 }}
                            source={{
                                uri: collab.details.influencer.profile_pic_url,
                            }} />
                    </View>
                    <View style={collabStyle.middle}>
                        <View>
                            <Text style={{ ...base.text, fontSize: 12, padding: 0 }}>Date start(ing)</Text>
                            <Text style={{ ...base.title, fontSize: 14 }}>{collab.details.date_start}</Text>
                        </View>
                        <View>
                            <Text style={{ ...base.text, fontSize: 12, padding: 0 }}>Influencer</Text>
                            <Text style={{ ...base.title, fontSize: 14 }}>{collab.details.influencer.username}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <Text style={{ ...base.text, fontSize: 12, padding: 0 }}>Campaign</Text>
                        <Text style={{ ...base.title, fontSize: 14, color: colors.SECONDARY, }}>{collab.details.campaign}</Text>
                    </View>
                    <View style={collabStyle.bottom}>
                        <IconButton
                            name='delete-outline' type="material-community" size={30} color={colors.TERTIARY} onPress={() => deleteCollab(collab)} />
                        <IconButton
                            name='chevron-right'
                            size={50}
                            color={colors.TERTIARY}
                            type='material-icons'
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => goToCollab(collab)}
                        />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <ScrollView keyboardDismissMode='on-drag'
            contentContainerStyle={base.scrollContainer}
        >
            <View style={{ marginBottom: dimensions.fullHeight * 0.45 }}>
                {
                    collabs.length > 0 && collabs.map((collab, index) => {
                        return (
                            collabList(collab, index)
                        );
                    })

                }
            </View>
        </ScrollView >
    )
}

CollabList.propTypes = {
    collabs: PropTypes.array,
    deleteCollab: PropTypes.func,
    goToCollab: PropTypes.func
}

CollabList.defaultProps = {
    collabs: [],
    deleteCollab: null,
    goToCollab: null
}

