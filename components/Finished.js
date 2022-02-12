import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import ToggleModalButton from './ToggleModalButton';
import { useSelector } from 'react-redux';

export default function Finished() {
  return (
    <View
            style={styles.container}
        >   
            <View style={styles.wordsContainer}>
                <Text style={styles.text}>press SPACEBAR to restart</Text>
                <Text style={styles.text}>WPM: {useSelector(state => state.wpm)}</Text>
            </View>
            
            <ToggleModalButton style={{zIndex: 99}}/>
        </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#303841",
        width: "100%",
        height: "100%",
    },
    text:{
        color: "#EEEEEE",
        fontWeight: 500,
        fontFamily: 'RobotoMono_100Thin',
    },
    wordsContainer:{
        width: "80%",
        alignItems: "center",
        marginVertical: 5,
    },
})