import React from 'react';
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { criteria } from '../../constants/Criteria'
import { CheckBox } from 'native-base';


export const Checkbox = ({ checked, criteria, onPress }) => {
    return <View style={styles.row}>
        <CheckBox color="#826478" checked={checked} onPress={() => onPress(criteria.key)} />
        <Text style={styles.data}>{criteria.label}</Text>
    </View>
}

const styles = StyleSheet.create(
    {
        row: {
            flex: 1,
            flexDirection: 'row',
            marginTop: '2.5%',
            marginBottom: '2.5%',
        },
        data: {
            fontSize: 13,
            fontWeight: '600',
            color: '#826478',
            paddingLeft: '9%',
        },
    });

Checkbox.propTypes = {
    checked: PropTypes.bool,
    criteria: PropTypes.object,
    onPress: PropTypes.func
}

Checkbox.defaultProps = {
    checked: false,
    criteria: null,
    onPress: null
}

