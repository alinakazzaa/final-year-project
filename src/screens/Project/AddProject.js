import * as React from 'react';
import { View, Text, YellowBox, StyleSheet } from 'react-native';
import { AppHeader } from '../../layouts/Header';
import ProjectForm from '../../components/forms/ProjectForm';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class AddProject extends React.Component {

    state = {
        title: '',
        description: '',
        date_created: '',
        active: null
    }

    handleChange = item => {
        // console.log(project);
        this.setState({ item });
    }

    handleSubmit = () => {
        console.log(this.state)
        // db.addProject(this.state.project);
        // db.addProject(this.refs.form.getValue());
        // console.log(this.refs.form.getValue)
        // this.props.navigation.navigate('Projects')
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader
                    left={
                        <IconButton color="#493649"
                            type='angle-left'
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                        />}
                    right={
                        <View style={styles.saveBtn}>
                            <TextButton onPress={this.handleSubmit} title="Save" />
                        </View>}
                />
                {/* <Text style={styles.text}>Add Project</Text> */}
                <ProjectForm onChange={this.handleChange} />
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
        // text: {
        //     textAlign: 'center',
        //     color: 'black'
        // },
        saveBtn: {
            marginRight: 10,
        },
    });

export default AddProject
