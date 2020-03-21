import React from 'react';
import PropTypes from 'prop-types'
import { Text, View, Switch } from 'react-native';
import { base, colors } from '../../styles/base';

export const SwitchItem = ({ label, value, onChange }) => {

    return <View>
        {label !== null && <Text style={base.inputLabel}>{label}</Text>}
        <Switch
            value={value}
            onValueChange={onChange}
            trackColor={{ false: colors.WHITE, true: colors.SECONDARY }}
        />
    </View>
}

SwitchItem.propTypes = {
    label: PropTypes.string,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}

SwitchItem.defaultProps = {
    label: null,
}