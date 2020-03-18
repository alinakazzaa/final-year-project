import React from 'react';
import PropTypes from 'prop-types'
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { tag } from '../../styles/tag'
import { Gradient } from '../../styles/Gradient';


export const Tag = ({ title, onPress }) => {
    return <TouchableOpacity activeOpacity={0.8} onPress={onPress} containerStyle={tag.container}>
        <Text style={tag.title}># {title}</Text>
    </TouchableOpacity>
    // <Gradient horizontal={true} style={tag.container}>
    //    </Gradient>
}

Tag.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func
}

Tag.defaultProps = {
    title: '',
    onPress: null
}

