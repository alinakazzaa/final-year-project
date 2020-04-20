import React from 'react'
import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { PulseIndicator } from 'react-native-indicators'
import { Icon } from 'react-native-elements'
import { IN_PROGRESS } from '../../constants/index'
import { colors } from '../../styles/base'
import { fetch_job_style } from '../../screens/FetchJob/styles/fetchJob.styles'

export const FetchJobList = ({ fetch_jobs, goToFetchJob, deleteFetchJob }) => {
    const FJList = (fj, index) => {

        return (
            <TouchableOpacity key={index} onPress={() => goToFetchJob(fj)}>
                <View style={fetch_job_style.listItem}>
                    <View style={fetch_job_style.left}>
                        <Text style={fetch_job_style.hashtag}>{fj.details.hashtag}</Text>
                    </View>
                    <View>
                        <Text style={fetch_job_style.date}>{fj.details.date_created}</Text>
                    </View>
                    {fj.details.status != IN_PROGRESS && <View>
                        <Icon name='delete-outline' type="material-community" size={25} color={colors.TERTIARY} onPress={() => deleteFetchJob(fj)} />
                    </View>}
                    <View>
                        {fj.details.status == IN_PROGRESS &&
                            <PulseIndicator size={20} color="green" />}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (

        <View>
            <View style={fetch_job_style.listHead}>
                <Text style={fetch_job_style.title}>Title</Text>
                <Text style={fetch_job_style.title}>Date</Text>
                <Text style={fetch_job_style.title}>Hashtag</Text>
                <Text style={fetch_job_style.title}>Location</Text>
            </View>
            <ScrollView keyboardDismissMode='on-drag'
                contentContainerStyle={fetch_job_style.scrollContainer}>
                {fetch_jobs.map((fj, index) => {
                    return FJList(fj, index)
                })}
            </ScrollView>
        </View>
    )

}

FetchJobList.propTypes = {
    fetch_jobs: PropTypes.array.isRequired,
    goToFetchJob: PropTypes.func,
}

FetchJobList.defaultProps = {
    goToFetchJob: null,
}
