import React from 'react'
import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { project } from '../../screens/Project/styles/project.styles'
import { Icon } from 'react-native-elements'
import { colors } from '../../styles/base'


export const ProjectList = ({ projects, deleteProject, goToProject }) => {
    const projList = (proj, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => goToProject(proj)}>
                <View style={project.listItem}>
                    <View style={project.left}>
                        <Text style={project.title}>{proj.title}</Text>
                    </View>
                    <View style={project.middle}>
                        <Text style={project.title}>{proj.date_created}</Text>
                    </View>
                    <View style={project.right}>
                        <Icon name='delete-outline' type="material-community" size={25} color={colors.TERTIARY} onPress={() => deleteProject(proj)} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView keyboardDismissMode='on-drag'
            contentContainerStyle={project.scrollContainer}
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
    active: PropTypes.bool,
    projects: PropTypes.array,
    deleteProject: PropTypes.func,
    addProject: PropTypes.func,
    goToProject: PropTypes.func
}

ProjectList.defaultProps = {
    active: 'false',
    projects: [],
    deleteProject: null,
    addProject: null,
    goToProject: null
}

