import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import { collabStyle } from '../../screens/Collab/styles/collab.styles'


export const PublicationList = ({ publications, onPress }) => {
    const publicationList = (pub, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => onPress(pub)}>
                <View style={collabStyle.listItem}>
                    <Text style={collabStyle.text}># {pub.hashtag}</Text>
                    <Image
                        style={collabStyle.thumbnail}
                        source={{
                            uri: pub.thumbnail,
                        }} />
                    <Text style={collabStyle.text}>Likes: {pub.likes}</Text>
                    <Text style={collabStyle.text}>Comments: {pub.comments}</Text>
                </View>
            </TouchableOpacity>
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