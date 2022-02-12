import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useFonts, RobotoMono_100Thin } from '@expo-google-fonts/roboto-mono';

const Information = props => {
    let [fontsLoaded] = useFonts({
        RobotoMono_100Thin,
    });

    return (
        <View style={styles.container}>
        <Text style={styles.text}>WPM: {props.wpm}</Text>
        <Text style={styles.text}>Errors: {props.errors}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        top:30,
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    text:{
        color: "white",
        fontWeight: 500,
        fontFamily: 'RobotoMono_100Thin',
        marginHorizontal: 5,
    }
});


export default Information;