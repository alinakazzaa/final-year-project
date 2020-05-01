import React from 'react'
import { View, Text, Keyboard } from 'react-native'
// @ts-ignore
import t from 'tcomb-form-native'
import { formStyle, form } from '../../styles/form'
import { base } from '../../styles/base'
import { SwitchItem } from '../switch/Switch'
import { DatePickerInput } from '../datepicker/DatePickerInput'
import { collabStyle } from '../../screens/Collab/styles/collab.styles'
import { TagList } from '../list/TagList'
import { Input } from 'react-native-elements'
import { tag } from '../../styles/tag'

const Form = t.form.Form

const Collab = t.struct({
    title: t.String,
    campaign: t.String,
    influencer: t.String,
    compensation: t.maybe(t.String),
    description: t.maybe(t.String)
})

const options = {
    stylesheet: { ...Form.stylesheet, ...formStyle },
    auto: 'none',
    fields: {
        influencer: {
            editable: false
        },
        campaign: {
            editable: false
        },
        description: {
            multiline: true
        },
        compensation: {
            multiline: true
        }
    }

}

export const CollabForm = ({ collab, onChange, removeTag, onTagTextChange, toggleSwitch, editTag, onEndTagEdit }) => {
    return (
        <View style={base.formContainer}>
            <View style={form.header}>
                <Text style={base.title}>Details</Text>
            </View>
            <View style={form.detailsBox}>
                <View style={form.labelsCol}>
                    <Text style={form.inputViewLabel}>Title</Text>
                    <Text style={form.inputViewLabel}>Campaign</Text>
                    <Text style={form.inputViewLabel}>Influencer</Text>
                    <Text style={form.inputViewLabel}>Compensation</Text>
                    <Text style={form.inputViewLabel}>Description</Text>

                </View>
                <View style={form.inputBox}>
                    <Form
                        type={Collab}
                        options={options}
                        value={collab}
                        onChange={(value) => onChange(value)}
                        onBlur={Keyboard.dismiss}
                    />
                </View>
            </View>
            <View style={base.dateView}>
                <Text style={{ ...form.inputViewLabel, marginRight: 55 }}>Date Start</Text>
                <DatePickerInput handleChange={date => onChange({ ...collab, date_start: date })} date={collab.date_start} />
            </View>
            <View style={base.switchView}>
                <Text style={form.inputViewLabel}>Active</Text>
                <SwitchItem value={collab.active} onChange={value => toggleSwitch(value)} />
            </View>
            <View style={collabStyle.tagsBox}>
                <Text style={base.title}>Hashtags</Text>
                <TagList removeTag={removeTag} onSubmit={onEndTagEdit} onChangeText={onTagTextChange} tags={collab.tags} onPress={editTag} />
            </View>
        </View>
    )
}




