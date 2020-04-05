import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import { collab } from '../../screens/Collab/styles/collab.styles'


export const PublicationList = ({ publications, onPress }) => {
    const publicationList = (pub, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => onPress(pub)}>
                <View style={collab.listItem}>
                    <Text style={collab.text}># {pub.hashtag}</Text>
                    <Image
                        style={collab.thumbnail}
                        source={{
                            uri: pub.thumbnail,
                        }} />
                    <Text style={collab.text}>Likes: {pub.likes}</Text>
                    <Text style={collab.text}>Comments: {pub.comments}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={collab.publicationsBox}>
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