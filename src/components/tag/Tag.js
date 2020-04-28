import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { tagStyles } from './styles/tag.styles'
import { Gradient } from '../../styles/Gradient'
import { Input } from 'react-native-elements'
import { colors, fonts } from '../../styles/base'


export const Tag = ({ title, onPress, editable, index, onChangeText, onSubmit }) => {

    return editable ?
        <Input
            value={title}
            autoFocus={true}
            inputStyle={tagStyles.inputStyle}
            onChangeText={text => onChangeText(text, index)}
            onEndEditing={() => onSubmit(index)}
            inputContainerStyle={tagStyles.editContainer}
        />
        : <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => index !== null ? onPress(title, index) : onPress(title)}
            style={tagStyles.container}>
            <Text style={tagStyles.title}>{title == '+' ? title : `#${title}`}</Text>
        </TouchableOpacity >
    // <Gradient horizontal={true} style={tag.container}>
    //    </Gradient>
}

Tag.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    onChangeTag: PropTypes.func,
    editable: PropTypes.bool,
    index: PropTypes.number
}

Tag.defaultProps = {
    title: '',
    editable: false,
    index: null,
    onChangeTag: null
}

