import React from 'react';
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { criteria } from '../../constants/Criteria'


export const CriteriaView = ({ activeCriteria }) => {
    return <View style={styles.criteriaBox}>
        <View style={styles.column}>
            <View style={styles.row}>
                {activeCriteria.includes(String(criteria[0].value)) ? <Icon
                    name='check'
                    type='font-awesome'
                    size={20}
                    color='#493649'
                    style={styles.checkmark} /> : <Icon
                        name='times'
                        type='font-awesome'
                        size={20}
                        color='#e9e2e9'
                        style={styles.checkmark} />}
                <Text style={styles.data}>{criteria[0].label}</Text>
            </View>
            <View style={styles.row}>
                {activeCriteria.includes(String(criteria[1].value)) ? <Icon
                    name='check'
                    type='font-awesome'
                    size={20}
                    color='#493649'
                    style={styles.checkmark} /> : <Icon
                        name='times'
                        type='font-awesome'
                        size={20}
                        color='#e9e2e9'
                        style={styles.checkmark} />}
                <Text style={styles.data}>{criteria[1].label}</Text>
            </View>
            <View style={styles.row}>
                {activeCriteria.includes(String(criteria[2].value)) ? <Icon
                    name='check'
                    type='font-awesome'
                    size={20}
                    color='#493649'
                    style={styles.checkmark} /> : <Icon
                        name='times'
                        type='font-awesome'
                        size={20}
                        color='#e9e2e9'
                        style={styles.checkmark} />}
                <Text style={styles.data}>{criteria[2].label}</Text>
            </View>
        </View>
        <View style={styles.column}>
            <View style={styles.row}>
                {activeCriteria.includes(String(criteria[3].value)) ? <Icon
                    name='check'
                    type='font-awesome'
                    size={20}
                    color='#493649'
                    style={styles.checkmark} /> : <Icon
                        name='times'
                        type='font-awesome'
                        size={20}
                        color='#e9e2e9'
                        style={styles.checkmark} />}
                <Text style={styles.data}>{criteria[3].label}</Text>
            </View>
            <View style={styles.row}>
                {activeCriteria.includes(String(criteria[4].value)) ? <Icon
                    name='check'
                    type='font-awesome'
                    size={20}
                    color='#493649'
                    style={styles.checkmark} /> : <Icon
                        name='times'
                        type='font-awesome'
                        size={20}
                        color='#e9e2e9'
                        style={styles.checkmark} />}
                <Text style={styles.data}>{criteria[4].label}</Text>
            </View>
            <View style={styles.row}>
                {activeCriteria.includes(String(criteria[5].value)) ? <Icon
                    name='check'
                    type='font-awesome'
                    size={20}
                    color='#493649'
                    style={styles.checkmark} /> : <Icon
                        name='times'
                        type='font-awesome'
                        size={20}
                        color='#e9e2e9'
                        style={styles.checkmark} />}
                <Text style={styles.data}>{criteria[5].label}</Text>
            </View>
        </View>
    </View>



}

const styles = StyleSheet.create(
    {
        criteriaBox: {
            margin: 0,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
        },
        checkmark: {
            fontSize: 15
        },
        column: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '6%',
        },
        data: {
            fontSize: 18,
            color: '#826478',
            paddingLeft: '3%'
        },
    });

CriteriaView.propTypes = {
    activeCriteria: PropTypes.array
}

CriteriaView.defaultProps = {
    activeCriteria: []
}

