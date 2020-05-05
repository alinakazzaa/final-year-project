import React from 'react'
import DatePicker from 'react-native-datepicker'
import { DATE_TODAY } from '../../constants/TodayDate'
import { inputView } from '../../styles/form'
import { colors, fonts, dimensions } from '../../styles/base'

export const DatePickerInput = ({ date, handleChange }) => {

    return (
        <DatePicker
            style={{ ...inputView, borderBottomWidth: 0, margin: 0 }}
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
            customStyles={{
                placeholderText: {
                    color: colors.TERTIARY,
                    fontWeight: fonts.WEIGHT_LEIGHT,
                    fontSize: fonts.MEDIUM,
                    borderBottomWidth: 0
                },
                dateText: {
                    color: colors.TERTIARY,
                    fontWeight: fonts.WEIGHT_LEIGHT,
                    fontSize: fonts.MEDIUM

                },
                dateInput: {
                    ...inputView,
                    borderRadius: 5,
                    width: dimensions.fullWidth * 0.4,
                    borderColor: colors.BORDER,
                    borderBottomWidth: 0.7,
                    margin: 0
                }
            }}
        />
    )
}