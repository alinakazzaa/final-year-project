import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, TextInput, Keyboard } from 'react-native';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';
import BasicInput from '../input/BasicInput';
// import { Form, Field } from 'simple-react-form'


export default class ProjectForm extends React.Component {

    render() {
        const props = this.props
        return (
            <View>
                <TextInput
                    style={styles.textInput}
                    onBlur={Keyboard.dismiss}
                    onChangeText={text => props.onChange({ title: text })} />
                <TextInput
                    style={styles.textInput}
                    onBlur={Keyboard.dismiss}
                    onChangeText={text => props.onChange({ description: text })} />
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        textInput: {
            borderWidth: 1,
        },

    });

ProjectForm.propTypes = {

}

ProjectForm.defaultProps = {

}




