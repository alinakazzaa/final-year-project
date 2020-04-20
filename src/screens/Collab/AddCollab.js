import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import CollabForm from '../../components/forms/CollabForm'
import { TextButton } from '../../components/buttons/TextButton'
import { connect } from 'react-redux'
import { addCollab } from '../../actions/collab'
import { BackButton } from '../../components/buttons/BackButton'


class AddCollab extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    handleSubmit = () => {
        const { user, project, addCollab, navigation } = this.props
        addCollab(user.current_user.id, project.current_project.id, { ...this.state.collab })
        navigation.goBack()
    }

    handleChange = collab => {
        this.setState({ collab: collab })
    }

    render() {
        const { project, navigation } = this.props
        const { influencer } = navigation.state.params

        return (
            <View style={styles.container}>
                <AppHeader
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                    right={
                        <View style={styles.saveBtn}>
                            <TextButton onPress={this.handleSubmit} title="Save" />
                        </View>}
                />
                <CollabForm influencer={influencer} current_project={project.current_project} goBack={navigation.goBack} onChange={this.handleChange} />
                <View style={styles.bottomView}>
                    <TextButton style={styles.saveBtn}
                        // onPress={this.handleSubmit}
                        title="Save" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },
        text: {
            textAlign: 'center',
            color: 'black'
        },
        saveBtn: {
            padding: 6,
            fontSize: 18,
            fontWeight: '400',
            display: 'flex',
            marginRight: 10,
            borderWidth: 1.5,
            borderColor: '#493649',
            borderRadius: 5,
        },
        bottomView: {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
    })

const mapStateToProps = state => ({
    user: state.user,
    project: state.project,
    collab: state.collab
})

const mapDispatchToProps = {
    addCollab
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCollab)