import React from 'react';
import PropTypes from 'prop-types'
import { colors, fonts, spacing } from '../../styles/base';
import RangeSlider from 'rn-range-slider';
import { View } from 'native-base';
import { base } from '../../styles/base';

export default class Slider extends React.Component {

    render() {
        const { min, max, initial_min, initial_max, step, onChange } = this.props
        return (
            <View style={base.slider}>
                <RangeSlider
                    style={{ width: '100%', height: 26 }}
                    lineWidth={20}
                    labelStyle="none"
                    thumbRadius={13}
                    thumbBorderWidth={1}
                    min={min}
                    max={max}
                    initialLowValue={initial_min}
                    initialHighValue={initial_max}
                    step={step}
                    onValueChanged={(low, high) => {
                        onChange(low, high)
                        this.setState({ min: low, max: high })
                    }}
                    selectionColor={colors.PRIMARY}
                />
            </View>
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