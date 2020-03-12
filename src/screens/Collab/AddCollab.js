import * as React from 'react';
import { View, Text, YellowBox, StyleSheet } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

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
        const { user, current_project, addCollab } = this.props
        addCollab(user.id, current_project.id, { ...this.state.collab })
        this.props.navigation.goBack()
    }

    handleChange = collab => {
        this.setState({ collab: collab });
    }

    render() {
        const { influencer, current_project } = this.props.navigation.state.params

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
                <CollabForm influencer={influencer} current_project={current_project} goBack={this.props.navigation.goBack} onChange={this.handleChange} />
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
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
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
    state: state,
    user: state.user,
    current_project: state.project.current_project
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addCollab: addCollab
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCollab)