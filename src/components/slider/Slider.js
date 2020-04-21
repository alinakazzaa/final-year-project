import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../../styles/base'
import RangeSlider from 'rn-range-slider'
import { View } from 'native-base'
import { sliderStyle } from './styles/slider.styles'

export default class Slider extends React.Component {

    render() {
        const { min, max, step, onChange } = this.props
        return (<RangeSlider
            style={sliderStyle.bar}
            lineWidth={23}
            thumbBorderColor={colors.SECONDARY}
            thumbColor={colors.SCREEN}
            labelStyle="none"
            thumbRadius={13}
            thumbBorderWidth={2}
            min={min}
            max={max}
            initialLowValue={min}
            initialHighValue={max}
            step={step}
            onValueChanged={(low, high) => {
                onChange(low, high)
            }}
            selectionColor={colors.SECONDARY}
        />
        )
    }
}

Slider.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    initial_max: PropTypes.number,
    initial_min: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
}

Slider.defaultProps = {
    min: 0,
    max: 1000000,
    initial_max: 0,
    initial_min: 1000000,
    step: 1000,
    onChange: null,
}