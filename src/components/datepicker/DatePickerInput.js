import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { DATE_TODAY } from '../../constants/TodayDate'
import { inputView } from '../../styles/form'
import { fonts, colors, dimensions } from '../../styles/base'

export default class DatePickerInput extends Component {
    constructor(props) {
        super(props)
        this.state = { date: "15/05/2016" }
    }

    render() {
        console.log(String(DATE_TODAY))
        return (
            <DatePicker
                style={{ ...inputView, borderBottomWidth: 0 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="DD/MM/YYYY"
                minDate="01/01/2020"
                maxDate="31/12/2025"
                confirmBtnText="Save"
                cancelBtnText="Cancel"
                showIcon={false}
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
                        borderRadius: 4,
                        width: dimensions.fullWidth * 0.4,
                        borderColor: colors.BORDER,
                        borderWidth: 0.7
                    }
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
            />
        )
    }
}