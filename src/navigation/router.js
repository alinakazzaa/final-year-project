import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { ApplicationStack } from './ApplicationStack'
import { BottomNavigator } from './BottomNavigation'

const LogIn = createAppContainer(ApplicationStack)
const MainApp = createAppContainer(BottomNavigator)

class Router extends Component {

    render() {
        let { user } = this.props

        return (
            user.current_user.username == null ? <LogIn /> : <MainApp />
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Router)