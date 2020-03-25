import React from 'react';
import { View, Keyboard } from 'react-native';
import moment from 'moment'
import t from 'tcomb-form-native';
import { DATE_TODAY } from '../../constants/TodayDate';
import { projectForm } from '../../screens/Project/styles/project.styles';
import { collab } from '../../screens/Collab/styles/collab.styles';

const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    ...projectForm
}

const Collab = t.struct({
    title: t.String,
    date_created: t.String,
    // date_start: t.Date,
    campaign: t.String,
    influencer: t.String,
    compensation: t.maybe(t.String),
    description: t.maybe(t.String)
});

const options = {
    auto: 'none',
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
        const { collab } = this.props
        console.log(collab)
        if (collab) {
            this.setState({ value: collab.details })
        }
    }

    onChange = value => {
        let { state_val } = this.state
        let updated_collab = { ...state_val, ...value }
        this.setState({ value: updated_collab });
        this.props.onChange(updated_collab)
    }

    render() {

        return (
            <View style={collab.inputBox}>
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

CollabForm.propTypes = {

}

CollabForm.defaultProps = {

}




