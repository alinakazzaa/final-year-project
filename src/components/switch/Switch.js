import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native';

export default class Switch extends React.Component {

    render() {
        return (
            <View>
                <Text style={styles.lbl}>{this.props.label}</Text>
                <Switch
                    value={this.props.value}
                    onValueChange={value => console.log(value)}
                    onChange={value => console.log(value)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        lbl: {
            fontSize: 18,
            color: '#5d4d50',
            textTransform: 'uppercase',
        },
    });

Switch.propTypes = {
    label: PropTypes.string,
    active: PropTypes.bool
}

Switch.defaultProps = {
    label: '',
    active: false
}