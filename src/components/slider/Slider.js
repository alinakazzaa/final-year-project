import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../../styles/base'
import RangeSlider from 'rn-range-slider'
import { View } from 'native-base'
import { sliderStyle } from './styles/slider.styles'
import { followerRanges } from '../../constants/Criteria'

export default class Slider extends React.Component {

    render() {
        const { min, max, step, onChange, initialMin, initialMax } = this.props
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
            initialLowValue={initialMin}
            initialHighValue={initialMax}
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
    initialMax: PropTypes.number,
    initialMin: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
}

Slider.defaultProps = {
    min: followerRanges.micro.min,
    max: followerRanges.micro.max,
    initialMax: followerRanges.micro.min,
    initialMin: followerRanges.micro.max,
    step: 1000,
    onChange: null,
}