import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { ApplicationStack } from './ApplicationStack'
import { BottomNavigator } from './BottomNavigation'
import { YellowBox } from 'react-native'
import { IN_PROGRESS } from '../constants'
import { COMPLETED_FETCH, COMPLETED_GET_USERS, GET_MEDIA_SUCCESS, GET_USER_ERROR, GET_USER_SUCCESS } from '../constants/response/types'
import { fetchNextPage } from '../web/fetchNextPage'
import { fetchInfluencer } from '../web/fetchInfluencer'
import { fetchPending, fetchResponse } from '../actions/fetch'
import { setCurrentFetchJob, updateFetchJob } from '../actions/fetchJob'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])
console.disableYellowBox = true;
const LogIn = createAppContainer(ApplicationStack)
const MainApp = createAppContainer(BottomNavigator)

class Router extends Component {

    componentDidUpdate(prev) {
        const { running_fetch, fetchPending, fetchResponse, setCurrentFetchJob, updateFetchJob } = this.props

        if (prev.running_fetch.details.status != running_fetch.details.status) {
            setCurrentFetchJob(running_fetch)
            updateFetchJob(running_fetch)
        }

        if (running_fetch.response !== null) {
            if (running_fetch.details.status == IN_PROGRESS) {
                if (running_fetch.influencers.success.length >= Number(running_fetch.details.no_profiles) && running_fetch.response.type !== COMPLETED_FETCH) {
                    fetchResponse({
                        type: COMPLETED_FETCH
                    })

                } else {
                    if (running_fetch.response.type == COMPLETED_GET_USERS && running_fetch.has_next_page &&
                        running_fetch.progress.total == running_fetch.progress.done) {

                        let ref = setInterval(() => {
                            fetchNextPage(running_fetch, fetchPending, fetchResponse)
                            clearInterval(ref)
                        }, 10000)

                    } else if (running_fetch.response.type == GET_MEDIA_SUCCESS ||
                        running_fetch.response.type == GET_USER_ERROR ||
                        running_fetch.response.type == GET_USER_SUCCESS) {
                        let ref = setInterval(() => {
                            fetchInfluencer(running_fetch.influencers.pending[running_fetch.influencers.pending.length - 1], running_fetch,
                                fetchPending, fetchResponse)
                            clearInterval(ref)
                        }, 8000)
                    }
                }
            }
        }
    }

    render() {
        let { user } = this.props

        return (
            user.current_user.id == null ? <LogIn /> : <MainApp />
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    running_fetch: state.running_fetch,
    fetch_job: state.fetch_job
})

const mapDispatchToProps = {
    fetchPending,
    fetchResponse,
    setCurrentFetchJob,
    updateFetchJob
}




export default connect(mapStateToProps, mapDispatchToProps)(Router)