import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../../database/config/db';
import { FetchJobList } from '../../components/list/FetchJobList'
import { addFetchJob } from '../../database/services/FetchJobService'
import { criteria } from '../../constants/Criteria'
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

let usersRef = db.ref('/Users');

class AllFetchJobs extends React.Component {
    state = {
        fetchJobs: [],
    }

    componentDidMount() {
        usersRef.on('value', (snapshot) => {
            snapshot.forEach(userSnapshot => {
                if (userSnapshot.val().username == 'alinakazzaa') {
                    let projectsRef = usersRef.child(`${userSnapshot.key}/Projects`)
                    projectsRef.on('value', (snapshot) => {
                        snapshot.forEach(projectSnapshot => {
                            if (projectSnapshot.val().title == 'Test Project for Alinakazzaa 2') {
                                let fetchJobsRef = projectsRef.child(`${projectSnapshot.key}/FetchJobs`)
                                fetchJobsRef.on('value', (snapshot) => {
                                    let data = snapshot.val();
                                    let fetchJobs = Object.values(data);
                                    this.setState({ fetchJobs });
                                });
                            }
                        })
                    });
                }
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader />
                <FetchJobList
                    fetchJobs={this.state.fetchJobs}
                    goToFetchJob={fj => this.props.navigation.navigate('ViewFetchJob', { fj })}
                    addFetchJob={() => this.props.navigation.navigate('AddFetchJob')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            textAlign: 'center',
            color: 'black'
        }
    });

export default AllFetchJobs
