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

const Form = t.form.Form

const Collab = t.struct({
    title: t.String,
    campaign: t.String,
    influencer: t.String,
    compensation: t.maybe(t.String)
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
                <Text style={{ ...form.inputViewLabel, marginTop: 20 }}>Date Start</Text>
                <DatePickerInput handleChange={date => onChange({ ...collab, date_start: date })} date={collab.date_start} />
            </View>
            <Text style={{ ...base.text, marginBottom: 0, padding: 0, marginTop: 20, fontSize: 12 }}>Note: active collaborations will fetch instagram hashtag media</Text>
            <View style={base.switchView}>
                <Text style={form.inputViewLabel}>Active</Text>
                <SwitchItem value={collab.active} onChange={value => toggleSwitch(value)} />
            </View>
            <View style={collabStyle.tagsBox}>
                <Text style={base.title}>Hashtags</Text>
                <TagList removeTag={removeTag} onSubmit={onEndTagEdit} onChangeText={onTagTextChange} tags={collab.tags} onPress={editTag} />
                {collab.tags.length == 1 && <Text style={{ ...base.text, fontSize: 14 }}>Add hashtags to see publication live activity</Text>}
            </View>
        </View>
    )
}




