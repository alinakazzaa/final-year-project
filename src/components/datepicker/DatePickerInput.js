import React from 'react'
import DatePicker from 'react-native-datepicker'
import { DATE_TODAY } from '../../constants/TodayDate'
import { inputView } from '../../styles/form'

export const DatePickerInput = ({ date, handleChange }) => {

    return (
        <DatePicker
            style={{ ...inputView, borderBottomWidth: 0 }}
            date={date}
            mode="date"
            placeholder="select date"
            format="DD/MM/YYYY"
            minDate={String(DATE_TODAY)}
            maxDate="31/12/2025"
            confirmBtnText="Save"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={date => handleChange(date)}
        />
    )
}