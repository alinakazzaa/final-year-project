import React from 'react';
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { criteria } from '../../constants/Criteria'
import { IconButton } from '../buttons/IconButton';


export const CriteriaView = ({ activeCriteria }) => {
    return <View style={styles.criteriaBox}>
        <FlatList
            numColumns={2}
            columnWrapperStyle={styles.col}
            data={criteria}
            renderItem={({ item }) =>
                <View style={styles.row}>
                    {activeCriteria.includes(item.key) ?
                        < IconButton
                            name='check'
                            size={20}
                            color='#493649' /> :
                        <IconButton
                            name='times'
                            size={20}
                            color='#e9e2e7' />}
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
    activeCriteria: PropTypes.string
}

CriteriaView.defaultProps = {
    activeCriteria: ''
}

