import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Tag } from '../../components/tag/Tag'
import { tag } from '../../styles/tag'


export const TagList = ({ tags, onPress }) => {
    const tagList = (tag, index) => {
        return (
            <Tag key={index} title={tag.name} editable={tag.editable} onPress={onPress} index={index} />
        )
    }

    return (
        <View style={tag.list}>
            {
                tags.length > 0 && tags.map((tag, index) => {
                    return (
                        tagList(tag, index)
                    );
                })

            }
        </View>
    )
}

TagList.propTypes = {
    tags: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired
}


