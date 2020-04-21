import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { project_style } from '../../screens/Project/styles/project.styles'
import { base } from '../../styles/base'

export const FetchJobListProjectView = ({ fetch_jobs, goToFetchJob }) => {
    const FJList = (fj, index) => {

        return <TouchableOpacity style={project_style.fetchJob} key={index} onPress={() => goToFetchJob(fj)}>
            <Text style={base.text}>{fj.details.hashtag}</Text>
            <Text style={base.text}>{fj.details.date_created}</Text>
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
