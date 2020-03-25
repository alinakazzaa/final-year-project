import React from 'react'
import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { PulseIndicator } from 'react-native-indicators'
import { Icon } from 'react-native-elements'

import { IN_PROGRESS } from '../../constants/index'
import { colors } from '../../styles/base'
import { fetchJob } from '../../screens/FetchJob/styles/fetchJob.styles'

export const FetchJobList = ({ fetchJobs, goToFetchJob, deleteFetchJob }) => {
    const FJList = (fj, index) => {

        return (
            <TouchableOpacity key={index} onPress={() => goToFetchJob(fj)}>
                <View style={fetchJob.listItem}>
                    <View style={fetchJob.left}>
                        <Text style={fetchJob.hashtag}>{fj.details.hashtag}</Text>
                    </View>
                    <View>
                        <Text style={fetchJob.date}>{fj.details.date_created}</Text>
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
            <View style={fetchJob.listHead}>
                <Text style={fetchJob.title}>Title</Text>
                <Text style={fetchJob.title}>Date</Text>
                <Text style={fetchJob.title}>Hashtag</Text>
                <Text style={fetchJob.title}>Location</Text>
            </View>
            <ScrollView keyboardDismissMode='on-drag'
                contentContainerStyle={fetchJob.scrollContainer}>
                {fetchJobs.map((fj, index) => {
                    return FJList(fj, index)
                })}
            </ScrollView>
        </View>
    )

}

FetchJobList.propTypes = {
    fetchJobs: PropTypes.array.isRequired,
    goToFetchJob: PropTypes.func,
}

FetchJobList.defaultProps = {
    goToFetchJob: null,
}
