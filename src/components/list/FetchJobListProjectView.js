import React from 'react'
import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { project_style } from '../../screens/Project/styles/project.styles'
import { base, colors } from '../../styles/base'
import { COMPLETED } from '../../constants'
import { IconButton } from '../buttons/IconButton'

export const FetchJobListProjectView = ({ fetch_jobs, goToFetchJob }) => {
    const FJList = (fj, index) => {
        let status = () => {
            if (fj.details.status == "IN_PROGRESS") {
                return "In progress"
            }

            return fj.details.status
        }

        return <TouchableOpacity style={project_style.fetchJob} key={index} onPress={() => goToFetchJob(fj)}>
            <Text style={{ ...base.text, padding: 0, fontSize: 13, color: colors.PRIMARY }}>{`# ${fj.details.hashtag}`}</Text>
            <Text style={{ ...base.text, padding: 0, fontSize: 15, color: colors.SECONDARY }}>{status()}</Text>
            {fj.details.status == COMPLETED ? <Text style={{ ...base.text, padding: 0, fontSize: 13 }}>
                {`found ${fj.influencers && fj.influencers.success.length || 0} influencers`}
            </Text> : <IconButton
                    name='account-search-outline'
                    size={30}
                    color={colors.TERTIARY}
                    type='material-community' />}
        </TouchableOpacity >
    }

    return (

        <ScrollView horizontal>
            {fetch_jobs.length > 0 && fetch_jobs.map((fj, index) => {
                if (index < 5)
                    return FJList(fj, index)
                return
            })}
        </ScrollView>
    )

}

FetchJobListProjectView.propTypes = {
    fetch_jobs: PropTypes.array.isRequired,
    goToFetchJob: PropTypes.func,
}

FetchJobListProjectView.defaultProps = {
    goToFetchJob: null,
}
