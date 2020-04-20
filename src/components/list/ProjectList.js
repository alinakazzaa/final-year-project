import React from 'react'
import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { project_style } from '../../screens/Project/styles/project.styles'
import { Icon } from 'react-native-elements'
import { colors } from '../../styles/base'


export const ProjectList = ({ projects, deleteProject, goToProject }) => {
    const projList = (proj, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => goToProject(proj)}>
                <View style={project_style.listItem}>
                    <View style={project_style.left}>
                        <Text style={base.title}>{proj.title}</Text>
                    </View>
                    <View style={project_style.middle}>
                        <Text style={base.title}>{proj.date_created}</Text>
                    </View>
                    <View style={project_style.right}>
                        <Icon name='delete-outline' type="material-community" size={25} color={colors.TERTIARY} onPress={() => deleteProject(proj)} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView keyboardDismissMode='on-drag'
            contentContainerStyle={project_style.scrollContainer}
        >
            <View>
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

