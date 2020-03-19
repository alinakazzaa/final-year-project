import React from 'react';
import PropTypes from 'prop-types'
import { colors, fonts, spacing } from '../../styles/base';
import RangeSlider from 'rn-range-slider';
import { View } from 'native-base';
import { base } from '../../styles/base';

export default class Slider extends React.Component {

    render() {
        const { min, max, step, onChange, setMinMax } = this.props
        return (
            <View style={base.slider}>
                <RangeSlider
                    style={{ width: '100%', height: 26 }}
                    lineWidth={20}
                    labelStyle="none"
                    thumbRadius={13}
                    thumbBorderWidth={1}
                    // gravity={'center'}
                    min={min}
                    max={max}
                    step={step}
                    onValueChanged={(low, high) => {
                        onChange(low, high)
                        this.setState({ min: low, max: high })
                    }}
                    selectionColor={colors.BORDER}
                />
            </View>
        )
    }
}

Slider.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
}

Slider.defaultProps = {
    min: 0,
    max: 1000000,
    step: 1000,
    onChange: null,
}