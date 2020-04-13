import React from 'react';
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native';
import { twoTabs, threeTabs } from './styles/tabview'

export const TabView = ({ three, titles, index, onPress, color, size }) => {

    let style = twoTabs

    if (three) {
        style = threeTabs
    }

    return <View style={style(color, size).container}>
        <TouchableOpacity onPress={() => onPress(0)} style={index == 0 ? style(color, size).selectedTabItem : style(color, size).tabItem}><Text style={index == 0 ? style(color, size).selectedTab : style(color, size).tab}>{titles[0]}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => onPress(1)} style={index == 1 ? style(color, size).selectedTabItem : style(color, size).tabItem}><Text style={index == 1 ? style(color, size).selectedTab : style(color, size).tab}>{titles[1]}</Text></TouchableOpacity>
        {three && <TouchableOpacity onPress={() => onPress(2)} style={index == 2 ? style(color, size).selectedTabItem : style(color, size).tabItem}><Text style={index == 2 ? style(color, size).selectedTab : style(color, size).tab}>{titles[2]}</Text></TouchableOpacity>}

    </View>
}

TabView.propTypes = {
    three: PropTypes.bool,
    titles: PropTypes.array,
    index: PropTypes.number,
    onPress: PropTypes.func
}

TabView.defaultProps = {
    three: false,
    titles: [],
    index: 0,
    onPress: null
}