import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, TextInput, Keyboard, FlatList } from 'react-native';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';
import BasicInput from '../input/BasicInput';
import t from 'tcomb-form-native';
import { CheckBox } from "native-base";
import { criteria } from '../../constants/Criteria'
import { Checkbox } from '../checkbox/Checkbox';
import { addFetchJob } from '../../database/services/FetchJobService';

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
            height: 36,
            padding: 7,
            borderRadius: 4,
            borderColor: '#cccccc', // <= relevant style here
            borderWidth: 1,
            marginBottom: 5
        },
        error: {
            color: '#000000',
            fontSize: 17,
            height: 36,
            padding: 7,
            borderRadius: 4,
            borderColor: '#a94442', // <= relevant style here
            borderWidth: 1,
            marginBottom: 5
        }
    }
}

const FetchJob = t.struct({
    hashtag: t.maybe(t.String),
    location: t.maybe(t.String),
});

const options = {
    fields: {
        hashtag: {
            label: 'Hashtag  #',
        },
        location: {
            label: 'Location',
        },
    },
    stylesheet: formStyles,
};


export default class FetchJobForm extends React.Component {

    state = {
        value: {},
        criteria: {
            five: false,
            ten: false,
            twenty: false,
            fifty: false,
            two_hundred: false,
            two_hundred_plus: false
        }
    }

    componentDidMount() {
    }

    onChangeFormValues(val) {
        this.setState({ value: val });
        const { criteria, value } = this.state
        const fj = { criteria, value }
        this.props.onChange(fj)
    }

    onChangeCriteria = val => {
        let { criteria, value } = this.state
        const fj = { criteria, value }
        switch (val) {
            case 'five':
                criteria.five = !criteria.five
                break
            case 'ten':
                criteria.ten = !criteria.ten
                break
            case 'twenty':
                criteria.twenty = !criteria.twenty
                break
            case 'fifty':
                criteria.fifty = !criteria.fifty
                break
            case 'two_hundred':
                criteria.two_hundred = !criteria.two_hundred
                break
            case 'two_hundred_plus':
                criteria.two_hundred_plus = !criteria.two_hundred_plus
                break
        }

        this.setState({ criteria })
        this.props.onChange(fj)
    }

    getCriteria = () => {
        return <View>

            <FlatList
                numColumns={2}
                data={criteria}
                renderItem={({ item }) => <Checkbox checked={this.getChecked(item.key)} criteria={item} onPress={this.onChangeCriteria} />}
                keyExtractor={item => item.key}
            /></View>
    }

    getChecked = key => {
        let checked = false
        switch (key) {
            case 'five':
                checked = this.state.criteria.five
                break
            case 'ten':
                checked = this.state.criteria.ten
                break
            case 'twenty':
                checked = this.state.criteria.twenty
                break
            case 'fifty':
                checked = this.state.criteria.fifty
                break
            case 'two_hundred':
                checked = this.state.criteria.two_hundred
                break
            case 'two_hundred_plus':
                checked = this.state.criteria.two_hundred_plus
                break
        }
        return checked
    }

    render() {

        return (
            <View style={styles.container}>
                <Form
                    ref={c => this._form = c}
                    type={FetchJob}
                    options={options}
                    value={this.state.value}
                    onChange={(value) => this.onChangeFormValues(value)}
                // onBlur={Keyboard.dismiss}
                />
                <View style={styles.midView}>
                    <Text style={styles.title}>Choose follower range</Text>
                    <View style={styles.criteriaBox}>
                        {/* {criteria.map((item, key) => {
                    return <View>{this.getCriteria(item, key)}</View>
                })} */}
                        {this.getCriteria()}
                    </View>
                </View>
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
        criteriaBox: {
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
            borderColor: '#ded4da',
        },
        midView: {
            padding: '4%',
        },
        textInput: {
            borderWidth: 1,
        },
        title: {
            fontSize: 16,
            color: '#493649',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'left',
            padding: '4%'
        },

    });

FetchJobForm.propTypes = {

}

FetchJobForm.defaultProps = {

}




