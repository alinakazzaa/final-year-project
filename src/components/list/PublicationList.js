import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import { collabStyle } from '../../screens/Collab/styles/collab.styles'
import { base, colors, spacing } from '../../styles/base'
import { IconButton } from '../buttons/IconButton'


export const PublicationList = ({ publications, onPress }) => {
    const publicationList = (pub, index) => {
        return (
            <View style={collabStyle.listItem}>
                <TouchableOpacity key={index} onPress={() => onPress(pub)}>
                    <Image
                        style={collabStyle.thumbnail}
                        source={{
                            uri: pub.thumbnail,
                        }} />
                </TouchableOpacity>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ display: 'flex', marginTop: spacing.SMALL, flexDirection: 'row', paddingLeft: spacing.SMALL }}>
                        <IconButton
                            name='cards-heart'
                            size={25}
                            color={colors.TERTIARY}
                            type='material-community'
                        // onPress={() => createCollab(influ)}
                        />
                        <Text style={{ ...base.title, fontSize: 18 }}>{pub.likes}</Text>
                    </View>
                    <View style={{ display: 'flex', marginTop: spacing.SMALL, flexDirection: 'row', alignItems: 'center', paddingLeft: spacing.SMALL }}>
                        <IconButton
                            name='comment'
                            size={25}
                            color={colors.TERTIARY}
                            type='material-community'
                        // onPress={() => createCollab(influ)}
                        />
                        <Text style={{ ...base.title, fontSize: 18 }}>{pub.comments}</Text>
                    </View>
                    <View><Text style={{ ...base.text, fontSize: 20, marginTop: spacing.MEDIUM }}># {pub.hashtag.name}</Text></View>
                </View>
            </View>
        )
    }

    return (
        <View style={collabStyle.publicationsBox}>
            {
                publications.length > 0 && publications.map((pub, index) => {
                    return (
                        publicationList(pub, index)
                    );
                })

            }
        </View>
    )
}

PublicationList.propTypes = {
    publications: PropTypes.array,
    onPress: PropTypes.func
}

PublicationList.defaultProps = {
    publications: [],
    onPress: null
}