import React from 'react';
import PropTypes from 'prop-types'
import { Input } from 'react-native-elements';
import { StyleSheet, Keyboard, View } from 'react-native';


export default class BasicInput extends React.Component {
    render() {
        const props = this.props
        return (
            <View style={{ width: '50%' }}>
                <Input
                    disabled={props.disabled}
                    multiline={props.multiline}
                    leftIcon={props.leftIcon}
                    labelStyle={styles.lbl}
                    label={props.label}
                    errorMessage={props.errorMessage}
                    onChangeText={this.props.onChange}
                    containerStyle={styles.container}
                    inputContainerStyle={styles.input}
                    value={props.disabled ? props.value : null}
                    onSubmitEditing={() => Keyboard.dismiss}
                    onEndEditing={Keyboard.dismiss}
                    inputStyle={styles.inputStyle}
                />
            </View>
        )
    }
}

BasicInput.propTypes = {
    disabled: PropTypes.bool,
    multiline: PropTypes.bool,
    leftIcon: PropTypes.object,
    label: PropTypes.string,
    errorMessage: PropTypes.string,
    onChangeText: PropTypes.func,
    containerStyle: PropTypes.string,
    inputContainerStyle: PropTypes.string,
    labelStyle: PropTypes.string,
    value: PropTypes.string
}

BasicInput.defaultProps = {
    disabled: false,
    multiline: false,
    leftIcon: null,
    label: null,
    errorMessage: null,
    onChangeText: null,
    containerStyle: '',
    inputContainerStyle: '',
    labelStyle: '',
    value: null
}

const styles = StyleSheet.create(
    {
        input: {
            borderBottomWidth: 0,

        },
        inputStyle: {
            color: '#826478',
            fontFamily: 'ArialRoundedMTBold',
            fontSize: 18,
        },
        container: {
            padding: 10,
            paddingRight: 0,
            paddingLeft: 0,
        },
        lbl: {
            fontSize: 13,
            color: '#5d4d50',
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
    });

