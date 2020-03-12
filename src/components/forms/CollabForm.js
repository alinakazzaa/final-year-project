import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, TextInput, Keyboard, Button } from 'react-native';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';
import BasicInput from '../input/BasicInput';
import moment from 'moment'
import t from 'tcomb-form-native';
import { validate } from 'tcomb-form-native/lib';
import { DATE_TODAY } from '../../constants/TodayDate';

const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    controlLabel: {
        normal: {
            // display: 'none',
        },
        error: {
            color: 'Purple',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    },
    textbox: {
        normal: {
            color: '#000000',
            fontSize: 17,
            // height: 36,
            padding: 7,
            borderRadius: 4,
            borderColor: '#cccccc', // <= relevant style here
            borderWidth: 1,
            marginBottom: 5
        },
        error: {
            color: '#000000',
            fontSize: 17,
            // height: 36,
            padding: 7,
            borderRadius: 4,
            borderColor: '#a94442', // <= relevant style here
            borderWidth: 1,
            marginBottom: 5
        }
    },
    checkbox: {
        normal: {

        },
        error: {

        },
    },


}

const Collab = t.struct({
    title: t.String,
    description: t.maybe(t.String),
    influencer: t.String,
    campaign: t.String,
    date_start: t.Date,
    compensation: t.maybe(t.String)
});

const options = {
    fields: {
        title: {
            error: 'Collab requires a title!',
        },
        description: {
            multiline: true
        },
        compensation: {
            multiline: true
        },
        date_start: {
            mode: 'date',
            defaultValueText: DATE_TODAY,
            config: {
                format: date => {
                    return moment(date).format('DD/MM/YYYY');
                },
            }
        }
    },
    stylesheet: formStyles,
};


export default class CollabForm extends React.Component {

    state = {
        value: {}
    }

    componentDidMount() {
        let influencer = this.props.influencer
        let collab = this.props.value
        let current_project = this.props.current_project

        if (collab) {
            this.setState({ value: collab })
        }
        let value = { ...this.state.value, influencer: influencer.username, campaign: current_project.title }
        this.setState({ value })
    }

    onChange = value => {
        let { state_val } = this.state
        let updated_collab = { ...state_val, ...value }
        this.setState({ value: updated_collab });
        this.props.onChange(updated_collab)
    }

    render() {

        return (
            <View style={styles.container}>
                <Form
                    ref={c => this._form = c}
                    type={Collab}
                    options={options}
                    value={this.state.value}
                    onChange={(value) => this.onChange(value)}
                    onBlur={Keyboard.dismiss}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            justifyContent: 'center',
            marginTop: 50,
            padding: 20,
            backgroundColor: '#ffffff',
        },
        textInput: {
            borderWidth: 1,
        },

    });

CollabForm.propTypes = {

}

CollabForm.defaultProps = {

}




