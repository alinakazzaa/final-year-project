import React from 'react';
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements';
import { colors } from '../../styles/base';


export const BackButton = ({ onPress }) => {
    return <Icon
        name='arrow-left'
        size={40}
        color={colors.WHITE}
        type='material-community'
        onPress={onPress}
        underlayColor='transparent' />
}

BackButton.propTypes = {
    onPress: PropTypes.func
}

BackButton.defaultProps = {
    onPress: null,
}