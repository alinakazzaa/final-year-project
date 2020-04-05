import React from 'react';
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements';
import { colors } from '../../styles/base';


export const BackButton = ({ onPress }) => {
    return <Icon
        name='arrow-left'
        size={35}
        color={colors.TERTIARY}
        type='material-community'
        onPress={onPress}
        underlayColor='transparent' />
}

BackButton.propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.object,
}

BackButton.defaultProps = {
    onPress: null,
}