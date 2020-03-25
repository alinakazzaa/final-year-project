import React from 'react'
import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { collab } from '../../screens/Collab/styles/collab.styles'
import { Icon } from 'react-native-elements'
import { colors } from '../../styles/base'


export const CollabList = ({ collabs, deleteCollab, goToCollab }) => {
    const collabList = (collab, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => goToCollab(collab)}>
                <View style={collab.listItem}>
                    <View style={collab.left}>
                        <Text style={collab.title}>{collab.details.title}</Text>
                    </View>
                    <View style={collab.middle}>
                        <Text style={collab.title}>{collab.details.date_created}</Text>
                    </View>
                    <View style={collab.right}>
                        <Icon name='delete-outline' type="material-community" size={25} color={colors.TERTIARY} onPress={() => deleteCollab(collab)} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView keyboardDismissMode='on-drag'
            contentContainerStyle={collab.scrollContainer}
        >
            <View>
                {
                    collabs.length > 0 && collabs.map((collab, index) => {
                        return (
                            collabList(collab, index)
                        );
                    })

                }
            </View>
        </ScrollView >
    )
}

CollabList.propTypes = {
    collabs: PropTypes.array,
    deleteCollab: PropTypes.func,
    goToCollab: PropTypes.func
}

CollabList.defaultProps = {
    collabs: [],
    deleteCollab: null,
    goToCollab: null
}

