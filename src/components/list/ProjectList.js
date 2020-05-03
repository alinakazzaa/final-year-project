import React from 'react'
import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { project_style } from '../../screens/Project/styles/project.styles'
import { Icon, Divider } from 'react-native-elements'
import { colors, base, dimensions } from '../../styles/base'
import { IconButton } from '../buttons/IconButton'

export const ProjectList = ({ projects, deleteProject, goToProject }) => {
    const projList = (proj, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => goToProject(proj)}>
                <View style={project_style.listItem}>
                    <IconButton
                        name='chevron-right'
                        size={50}
                        color={colors.TERTIARY}
                        type='material-icons'
                        style={{ alignSelf: 'flex-end' }}
                        onPress={() => goToProject(proj)}
                    />
                    <Divider />
                    <View style={project_style.top}>
                        <View>
                            <Text style={{ ...base.text, fontSize: 12, padding: 0 }}>Title</Text>
                            <Text style={{ ...base.title, fontSize: 14 }}>{proj.title}</Text>
                        </View>
                        <View>
                            <Text style={{ ...base.text, fontSize: 12, padding: 0 }}>Date added</Text>
                            <Text style={{ ...base.title, fontSize: 14 }}>{proj.date_created}</Text>
                        </View>
                    </View>
                    <Divider />
                    <View style={project_style.bottom}>
                        <IconButton
                            name='delete-outline'
                            size={35}
                            color={colors.TERTIARY}
                            type='material-community'
                            style={{ display: 'flex', alignSelf: 'flex-end' }}
                            onPress={() => deleteProject(proj)}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView keyboardDismissMode='on-drag'
            contentContainerStyle={base.scrollContainer}
        >
            <View style={{ paddingBottom: dimensions.fullHeight * .38 }}>
                {
                    projects.length > 0 && projects.map((proj, index) => {
                        return (
                            projList(proj, index)
                        );
                    })

                }
            </View>
        </ScrollView >
    )
}

ProjectList.propTypes = {
    projects: PropTypes.array,
    deleteProject: PropTypes.func,
    addProject: PropTypes.func,
    goToProject: PropTypes.func
}

ProjectList.defaultProps = {
    projects: [],
    deleteProject: null,
    addProject: null,
    goToProject: null
}

