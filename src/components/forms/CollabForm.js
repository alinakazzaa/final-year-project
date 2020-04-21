import React from 'react'
import { View, Text, Keyboard } from 'react-native'
import moment from 'moment'
import t from 'tcomb-form-native'
import { DATE_TODAY } from '../../constants/TodayDate'
import { formStyle, form } from '../../styles/form'
import { base } from '../../styles/base'

const Form = t.form.Form

const Collab = t.struct({
    title: t.String,
    // date_created: t.String,
    // date_start: t.Date,
    campaign: t.String,
    influencer: t.String,
    compensation: t.maybe(t.String),
    description: t.maybe(t.String),
    isActive: t.Boolean
})

const options = {
    stylesheet: { ...Form.stylesheet, ...formStyle },
    auto: 'none',
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
                return moment(date).format('DD/MM/YYYY')
            },
        }
    }
}

export default class CollabForm extends React.Component {

    state = {
        value: {}
    }

    componentDidMount() {
        const { collab } = this.props
        if (collab) {
            this.setState({ value: collab.details })
        }
    }

    onChange = value => {
        let { state_val } = this.state
        let updated_collab = { ...state_val, ...value }
        this.setState({ value: updated_collab })
        this.props.onChange(updated_collab)
    }

    render() {
        const { collab, onChange } = this.props
        return (
            <View>
                <View style={form.header}>
                    <Text style={base.title}>Details</Text>
                </View>
                <View style={form.detailsBox}>
                    <View style={form.labelsCol}>
                        <Text style={form.inputViewLabel}>Title</Text>
                        {/* <Text style={form.inputViewLabel}>Date created</Text> */}
                        {/* <Text style={form.inputViewLabel}>Date Start</Text> */}
                        <Text style={form.inputViewLabel}>Campaign</Text>
                        <Text style={form.inputViewLabel}>Influencer</Text>
                        <Text style={form.inputViewLabel}>Compensation</Text>
                        <Text style={form.inputViewLabel}>Description</Text>
                        <Text style={form.inputViewLabel}>Active</Text>
                    </View>
                    <View style={form.inputBox}>
                        <Form
                            ref={c => this._form = c}
                            type={Collab}
                            options={options}
                            value={collab}
                            onChange={(value) => onChange(value)}
                            onBlur={Keyboard.dismiss}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

CollabForm.propTypes = {

}

CollabForm.defaultProps = {

}




