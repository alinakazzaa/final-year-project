import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import CollabForm from '../../components/forms/CollabForm';
import { TextButton } from '../../components/buttons/TextButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCollab } from '../../actions/collab';


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
        this.setState({ collab: collab });
    }

    render() {
        const { project, navigation } = this.props
        const { influencer } = navigation.state.params

        return (
            <View style={styles.container}>
                <AppHeader
                    left={
                        <IconButton color="#493649"
                            name='angle-left'
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                        />}
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
        );
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
    });

const mapStateToProps = state => ({
    user: state.user,
    collab: state.collab,
    project: state.project
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addCollab: addCollab
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCollab)