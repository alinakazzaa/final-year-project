import React from 'react';
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { criteria } from '../../constants/Criteria'


export const CriteriaView = ({ activeCriteria }) => {
    return <View style={styles.criteriaBox}>
        <FlatList
            numColumns={2}
            columnWrapperStyle={styles.col}
            data={criteria}
            renderItem={({ item }) =>
                <View style={styles.row}>
                    {activeCriteria.includes(item.key) ?
                        < Icon
                            name='check'
                            type='font-awesome'
                            size={20}
                            color='#493649'
                            style={styles.checkmark} /> :
                        <Icon
                            name='times'
                            type='font-awesome'
                            size={20}
                            color='#e9e2e7'
                            style={styles.checkmark} />}
                    <Text style={styles.data}>{item.label}</Text>
                </View>}
            keyExtractor={item => item.key}
        />
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
            fontSize: 13
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '6%',
            width: '50%'
        },
        col: {
            display: 'flex',
        },
        data: {
            fontSize: 15,
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

