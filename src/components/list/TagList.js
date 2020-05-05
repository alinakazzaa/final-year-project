import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Tag } from '../../components/tag/Tag'
import { tagStyles } from '../tag/styles/tag.styles'


export const TagList = ({ tags, onPress, onChangeText, onSubmit, removeTag }) => {
    const tagList = (tag, index) => {
        return (
            <Tag key={index} removeTag={removeTag} title={tag.name} onSubmit={onSubmit} editable={tag.editable} onChangeText={onChangeText} onPress={onPress} index={index} />
        )
    }

    return (
        <View
            style={tagStyles.list}
        >
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
    onPress: PropTypes.func.isRequired,
    onChangeText: PropTypes.func,
    onSubmit: PropTypes.func,
    removeTag: PropTypes.func
}

TagList.defaultProps = {
    tags: '',
    onChangeText: null,
    onSubmit: null,
    removeTag: null
}
