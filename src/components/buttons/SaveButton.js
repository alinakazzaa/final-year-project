import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import { Icon, Tooltip } from 'react-native-elements'
import { colors } from '../../styles/base'



export const SaveButton = ({ onPress }) => {
    return <Tooltip popover={<Text>Saved</Text>}><Icon
        name='check'
        size={40}
        color={colors.SCREEN}
        type='material-community'
        onPress={onPress}
        underlayColor='transparent'
    /></Tooltip>
}


SaveButton.propTypes = {
    onPress: PropTypes.func
}

SaveButton.defaultProps = {
    onPress: null
}