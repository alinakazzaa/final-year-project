import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { tag } from '../../styles/tag'
import { Gradient } from '../../styles/Gradient'
import { Input } from 'react-native-elements'


export const Tag = ({ title, onPress, editable, index }) => {

    return editable ? <View style={tag.container}><Input autoFocus={true} containerStyle={tag.input} inputStyle={tag.inputStyle} /></View> : <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => index !== null ? onPress(title, index) : onPress(title)}
        containerStyle={tag.container}>
        {<Text style={tag.title}># {title}</Text>}
    </TouchableOpacity>
    // <Gradient horizontal={true} style={tag.container}>
    //    </Gradient>
}

Tag.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    index: PropTypes.number
}

Tag.defaultProps = {
    title: '',
    editable: false,
    index: null
}

