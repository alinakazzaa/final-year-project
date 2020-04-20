import React from 'react';
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements';
import { colors } from '../../styles/base';


export const SaveButton = ({ onPress }) => {
    return <Icon
        name='check'
        size={40}
        color={colors.SCREEN}
        type='material-community'
        onPress={onPress}
        underlayColor='transparent' />
}

SaveButton.propTypes = {
    onPress: PropTypes.func
}

SaveButton.defaultProps = {
    onPress: null
}