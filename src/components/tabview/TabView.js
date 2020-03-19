import React from 'react';
import PropTypes from 'prop-types'
import { Input } from 'react-native-elements';
import { View, Text, TouchableOpacity } from 'react-native';
import { tabview } from '../../styles/tabview'
import { Gradient } from '../../styles/Gradient';

export default class TabView extends React.Component {

    render() {
        const { double, titles, index, onPress } = this.props
        return (
            <View style={tabview.container}>
                <TouchableOpacity onPress={() => onPress(0)} style={index == 0 ? tabview.selectedTabItem : tabview.tabItem}><Text style={index == 0 ? tabview.selectedTab : tabview.tab}>{titles[0]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => onPress(1)} style={index == 1 ? tabview.selectedTabItem : tabview.tabItem}><Text style={index == 1 ? tabview.selectedTab : tabview.tab}>{titles[1]}</Text></TouchableOpacity>
                {!double && <TouchableOpacity onPress={() => onPress(2)} style={index == 2 ? tabview.selectedTabItem : tabview.tabItem}><Text style={index == 2 ? tabview.selectedTab : tabview.tab}>{titles[2]}</Text></TouchableOpacity>}

            </View>
        )
    }
}

TabView.propTypes = {
    double: PropTypes.bool,
    titles: PropTypes.array,
    index: PropTypes.number,
    onPress: PropTypes.func
}

TabView.defaultProps = {
    double: false,
    titles: [],
    index: 0,
    onPress: null
}