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
            autoCapitalize='none'
            style={{ textTransform: 'lowercase' }}
            inputStyle={tagStyles.inputStyle}
            onChangeText={text => onChangeText(text, index)}
            onEndEditing={() => onSubmit(index)}
            inputContainerStyle={tagStyles.editContainer}
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

    // <Gradient horizontal={true} style={tag.container}>
    //    </Gradient>
}

Tag.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    onChangeTag: PropTypes.func,
    removeTag: PropTypes.func,
    onSubmit: PropTypes.func,
    editable: PropTypes.bool,
    index: PropTypes.number
}

Tag.defaultProps = {
    title: '',
    editable: false,
    index: null,
    onChangeTag: null,
    onSubmit: null,
    removeTag: null
}

