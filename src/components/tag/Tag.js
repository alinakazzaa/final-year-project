import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { tagStyles } from './styles/tag.styles'
import { Input } from 'react-native-elements'
import { colors, fonts, base } from '../../styles/base'
import { IconButton } from '../buttons/IconButton'


export const Tag = ({ title, onPress, editable, index, onChangeText, onSubmit, removeTag }) => {

    return editable ?
        <Input
            value={title}
            autoFocus={true}
            autoCapitalize='none'
            style={{ textTransform: 'lowercase' }}
            inputStyle={tagStyles.inputStyle}
            onChangeText={text => onChangeText(text, index)}
            onEndEditing={() => onSubmit(index)}
            inputContainerStyle={tagStyles.editContainer}
            autoCorrect={false}
        />
        : <View style={tagStyles.container}><TouchableOpacity
            activeOpacity={0.8}
            onPress={() => index !== null ? onPress(title, index) : onPress(title)}>
            <Text style={{ ...base.title, textTransform: 'lowercase', fontSize: fonts.SMALL * 0.8, color: colors.WHITE }}>{title == '+' ? title : `# ${title}`}</Text>
        </TouchableOpacity >
            {title !== '+' && removeTag !== null && <IconButton
                name='window-close'
                size={16}
                color={colors.WHITE}
                type='material-community'
                onPress={() => removeTag(title)}
                style={{ marginLeft: 2 }}
            />}
        </View>
}

Tag.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    index: PropTypes.number,
    onChangeText: PropTypes.func,
    onSubmit: PropTypes.func,
    removeTag: PropTypes.func
}

Tag.defaultProps = {
    title: '',
    editable: false,
    index: null,
    onChangeText: null,
    onSubmit: null,
    removeTag: null
}

