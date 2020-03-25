import React from 'react'
import { Icon, Avatar } from 'react-native-elements'
import { StyleSheet, TouchableOpacity, Text, Keyboard, View, ScrollView } from 'react-native'
import { IconButton } from '../buttons/IconButton'
import PropTypes from 'prop-types'
import { TextButton } from '../buttons/TextButton'
import { project } from '../../screens/Project/styles/project.styles'

export const FetchJobListProjectView = ({ fetch_jobs, goToFetchJob }) => {
    const FJList = (fj, index) => {
        return <TouchableOpacity style={project.fetchJob} key={index} onPress={() => goToFetchJob(fj)}>
            <Text style={project.text}>{fj.details.hashtag}</Text>
            <Text style={project.text}>{fj.details.date_created}</Text>
        </TouchableOpacity >
    }

    return (

        <View>
            {fetch_jobs.length > 0 && fetch_jobs.map((fj, index) => {
                if (index < 5)
                    return FJList(fj, index)
                return
            })}

        </View>
    )

}

FetchJobListProjectView.propTypes = {
    fetch_jobs: PropTypes.array.isRequired,
    goToFetchJob: PropTypes.func,
}

FetchJobListProjectView.defaultProps = {
    goToFetchJob: null,
}
