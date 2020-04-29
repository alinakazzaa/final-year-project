import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Avatar, Tooltip } from 'react-native-elements'
import { IconButton } from '../../components/buttons/IconButton'
import { AppHeader } from '../../layouts/Header'
import { formatNumber } from '../../actions/base'
import { Gradient } from '../../styles/Gradient'
import { base, fonts, colors, spacing } from '../../styles/base'
import { BackButton } from '../../components/buttons/BackButton'
import { form } from '../../styles/form'
import { influencer_style } from './styles/influencer.styles'
import { updateInfluencer, removeInfluencer } from '../../actions/influencer'
import { updateFetchJob, updateStateFetchJob } from '../../actions/fetchJob'

class ViewInfluencer extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    createCollab = influencer => {
        this.props.navigation.navigate('AddCollab', { influencer })
    }

    saveInfluencer = influencer => {
        const { updateInfluencer } = this.props
        updateInfluencer({ ...influencer, to_do: false })
    }

    deleteInflu = id => {
        const { fetch_job, removeInfluencer, updateStateFetchJob } = this.props
        const current = { ...fetch_job.current_fetch_job }
        current.influencers.success = [...current.influencers.success.filter(influ_id => influ_id !== id)]
        updateStateFetchJob(current)
        updateFetchJob(current)
        removeInfluencer(id)
        this.props.navigation.goBack()
    }

    goToProfile = url => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url)
            } else {
                console.log("Don't know how to open URI: " + url)
            }
        })
    }

    render() {
        const { influencer, navigation, fetch_job } = this.props

        return (
            <View>
                <Gradient style={base.container}>
                    <AppHeader
                        left={<BackButton onPress={() => navigation.goBack()} />}
                    />
                    <ScrollView>
                        <View style={influencer_style.topView}>
                            <Avatar
                                size={200}
                                rounded
                                containerStyle={styles.avatar}
                                source={{
                                    uri: influencer.current_influencer.profile_pic_url,
                                }} />
                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%', marginTop: spacing.LARGE, paddingTop: spacing.LARGE, borderTopWidth: 0.7, borderColor: colors.TERTIARY }}>
                                <Text style={{ ...form.inputViewLabel, fontSize: fonts.LARGE, fontWeight: '700' }}>Username</Text>
                                <Text style={{ ...form.inputViewLabel, fontSize: fonts.LARGE, fontWeight: '700' }}>{influencer.current_influencer.username}</Text>
                            </View>
                            <View><TouchableOpacity style={{ ...influencer_style.linkViewInflu, alignSelf: 'center' }} onPress={() => this.goToProfile(influencer.current_influencer.profile_url)}>
                                <Text style={{ ...base.title, fontSize: 25 }}>Instagram profile</Text>
                                <IconButton
                                    name='launch'
                                    size={30}
                                    color={colors.TERTIARY}
                                    type='material-icons'
                                />
                            </TouchableOpacity></View>
                        </View>

                        <View style={influencer_style.middleView}>
                            <View style={form.header} >
                                <Text style={base.title}>Details</Text>
                            </View>
                            <View style={{ ...form.detailsBox, borderColor: colors.TERTIARY }}>
                                <View style={form.labelsCol}>
                                    <Text style={{ ...form.inputViewLabel, color: colors.WHITE, fontSize: fonts.LARGE }}>Followers</Text>
                                    <Text style={{ ...form.inputViewLabel, color: colors.WHITE, fontSize: fonts.LARGE }}>Media Count</Text>
                                    <Text style={{ ...form.inputViewLabel, color: colors.WHITE, fontSize: fonts.LARGE }}>Date added</Text>
                                </View>
                                <View style={form.inputBox}>
                                    <Text style={{ ...form.inputViewLabel, fontSize: fonts.LARGE, color: colors.WHITE, fontWeight: '700' }}>{formatNumber(influencer.current_influencer.followers)}</Text>
                                    <Text style={{ ...form.inputViewLabel, fontSize: fonts.LARGE, color: colors.WHITE, fontWeight: '700' }}>{formatNumber(influencer.current_influencer.media_count)}</Text>
                                    {/* <Text style={{ ...form.inputViewLabel, fontSize: fonts.LARGE }}>{fetch_job.current_fetch_job.details.date_fetch_run}</Text> */}
                                    <Text style={{ ...form.inputViewLabel, fontSize: fonts.LARGE, color: colors.WHITE, fontWeight: '700' }}>{fetch_job.current_fetch_job.details.date_created}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ ...base.centered, display: 'flex', marginTop: spacing.MEDIUM, flexDirection: 'row', justifyContent: 'space-between' }}>
                            {/* <Tooltip popover={<Text>Influencer saved</Text>}> */}
                            <TouchableOpacity>
                                <IconButton
                                    name='check'
                                    size={60}
                                    color={colors.GREEN}
                                    type='material-icons'
                                    onPress={() => this.saveInfluencer(influencer.current_influencer)}
                                />
                            </TouchableOpacity>
                            {/* </Tooltip> */}
                            <TouchableOpacity>
                                <IconButton
                                    name='account-multiple-plus-outline'
                                    size={60}
                                    color={colors.WHITE}
                                    type='material-community'
                                    onPress={() => this.createCollab(influencer.current_influencer)}
                                /></TouchableOpacity>
                            <TouchableOpacity>
                                {/* <Tooltip popover={<Text>Influencer removed</Text>}> */}
                                <IconButton
                                    name='close'
                                    size={60}
                                    color={colors.RED}
                                    type='material-icons'
                                    onPress={() => this.deleteInflu(influencer.current_influencer.id)}
                                />
                                {/* </Tooltip> */}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Gradient>
            </View >
        )
    }
}

const styles = StyleSheet.create(
    {

        bottomView: {
            display: 'flex',
            flexDirection: 'column',
        },
        listHead: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        infoContainer: {
            margin: 20,
        },
        infoBox: {
            flexDirection: 'column',
            marginTop: 20
        },
        avatar: {
            marginTop: 30
        },
        title: {
            fontSize: 13,
            color: '#493649',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'left',

        },
        itemRow: {
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth: 0.2,
            borderBottomColor: '#b3b3cc',
            padding: 10,
            justifyContent: 'space-between',
        },
        itemCol: {
            display: 'flex',
            flexDirection: 'column',
            borderBottomWidth: 0.2,
            borderBottomColor: '#b3b3cc',
            padding: 10,
        },
        checkInfo: {
            flexDirection: 'row',
            justifyContent: 'flex-start'
        },
        lbl: {
            fontSize: 15,
            color: '#5d4d50',
            textTransform: 'uppercase',
        },
        data: {
            fontSize: 15,
            color: '#826478',
            fontWeight: '700',
            paddingLeft: '10%'
        },
        biography: {
            fontSize: 15,
            color: '#826478',
            paddingTop: 20
        },
        influName: {
            color: '#846284',
            textTransform: 'uppercase',
            fontSize: 14,
        },
        fjData: {
            color: '#846284',
            textTransform: 'uppercase',
            fontSize: 14,
            width: '40%'
        },
        viewAllBtn: {
            alignSelf: 'center',
            flexWrap: 'wrap'
        }
    })

const mapStateToProps = state => ({
    fetch_job: state.fetch_job,
    influencer: state.influencer
})

const mapDispatchToProps = {
    updateInfluencer,
    removeInfluencer,
    updateStateFetchJob
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewInfluencer)
