import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { tagStyles } from './styles/tag.styles'
import { Gradient } from '../../styles/Gradient'
import { Input } from 'react-native-elements'
import { colors, fonts, base, spacing } from '../../styles/base'
import { IconButton } from '../buttons/IconButton'


export const Tag = ({ title, onPress, editable, index, onChangeText, onSubmit, removeTag }) => {

    return editable ?
        <Input
            value={title}
            autoFocus={true}
            style={{ textTransform: 'lowercase' }}
            inputStyle={tagStyles.inputStyle}
            onChangeText={text => onChangeText(text, index)}
            onEndEditing={() => onSubmit(index)}
            inputContainerStyle={tagStyles.editContainer}
        />
        : <View style={tagStyles.container}><TouchableOpacity
            activeOpacity={0.8}
            onPress={() => index !== null ? onPress(title, index) : onPress(title)}>
            <Text style={{ ...base.title, color: colors.WHITE }}>{title == '+' ? title : `# ${title}`}</Text>
        </TouchableOpacity >
            {title !== '+' && <IconButton
                name='window-close'
                size={19}
                color={colors.WHITE}
                type='material-community'
                onPress={() => removeTag(title)}
                style={{ marginLeft: 3, marginTop: 1 }}
            />}
        </View>

    // <Gradient horizontal={true} style={tag.container}>
    //    </Gradient>
}

Tag.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    onChangeTag: PropTypes.func,
    editable: PropTypes.bool,
    index: PropTypes.number
}

Tag.defaultProps = {
    title: '',
    editable: false,
    index: null,
    onChangeTag: null
}

