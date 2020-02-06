import React from 'react';
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { criteria } from '../../constants/Criteria'
import { CheckBox } from "native-base";
import { onChange } from 'react-native-reanimated';





export default class CriteriaForm extends React.Component {

    state = {
        five: false,
        ten: false,
        twenty: false,
        fifty: false,
        two_hundred: false,
        two_hundred_plus: false
    }

    onChange = value => {
        switch (value) {
            case 'five':
                this.setState({ five: !this.state.five })
                break
            case 'ten':
                this.setState({ ten: !this.state.ten })
                break
            case 'twenty':
                this.setState({ twenty: !this.state.twenty })
                break
            case 'fifty':
                this.setState({ fifty: !this.state.fifty })
                break
            case 'two_hundred':
                this.setState({ two_hundred: !this.state.two_hundred })
                break
            case 'two_hundred_plus':
                this.setState({ two_hundred_plus: !this.state.two_hundred_plus })
                break
        }
    }

    render() {
        const criteriaChecked = this.state
        return (
            <View style={styles.criteriaBox}>
                <View style={styles.column}>
                    <View style={styles.row}>
                        <CheckBox color="#826478" checked={criteriaChecked.five} onPress={() => this.onChange(criteria[0].key)} />
                        <Text style={styles.data}>{criteria[0].label}</Text>
                    </View>
                    <View style={styles.row}>
                        <CheckBox color="#826478" checked={criteriaChecked.ten} onPress={() => this.onChange(criteria[1].key)} />
                        <Text style={styles.data}>{criteria[1].label}</Text>
                    </View>
                    <View style={styles.row}>
                        <CheckBox color="#826478" checked={criteriaChecked.twenty} onPress={() => this.onChange(criteria[2].key)} />
                        <Text style={styles.data}>{criteria[2].label}</Text>
                    </View>
                </View>
                <View style={styles.column}>
                    <View style={styles.row}>
                        <CheckBox color="#826478" checked={criteriaChecked.fifty} onPress={() => this.onChange(criteria[3].key)} />
                        <Text style={styles.data}>{criteria[3].label}</Text>
                    </View>
                    <View style={styles.row}>
                        <CheckBox color="#826478" checked={criteriaChecked.two_hundred} onPress={() => this.onChange(criteria[4].key)} />
                        <Text style={styles.data}>{criteria[4].label}</Text>
                    </View>
                    <View style={styles.row}>
                        <CheckBox color="#826478" checked={criteriaChecked.two_hundred_plus} onPress={() => this.onChange(criteria[5].key)} />
                        <Text style={styles.data}>{criteria[5].label}</Text>
                    </View>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create(
    {
        criteriaBox: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
        },
        column: {
            display: 'flex',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            margin: '2%',
        },
        data: {
            fontSize: 18,
            color: '#826478',
            marginLeft: '8%',
            textAlign: 'center',
        },
    });

CriteriaForm.propTypes = {
    onChange: PropTypes.func
}

CriteriaForm.defaultProps = {
    onChange: null
}

