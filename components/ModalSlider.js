import {StyleSheet, ScrollView, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { useFonts, RobotoMono_100Thin } from '@expo-google-fonts/roboto-mono';
import { changeSliderValue } from '../redux/redux';
import {useSelector, useDispatch} from 'react-redux';

const ModalSlider = () => {
    const [scrollEnabled, setScroll] = useState(true);
    const values = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    const initalSliderValue = useSelector(state => state.sliderValue);
    const [sliderValue, setSliderValue] = useState(initalSliderValue);

    const dispatch = useDispatch();
    const changeSliderV = (value) => {
        dispatch(changeSliderValue(value));
        setSliderValue(value);
    }

    let [fontsLoaded] = useFonts({
        RobotoMono_100Thin,
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>number of words</Text>

            <Slider
                style={{width: 200, height: 40}}
                onValueChange={value => changeSliderV(value)}
                value={sliderValue}
                step={10}
                minimumValue={10}
                maximumValue={100}
                minimumTrackTintColor="#00ADB5"
                maximumTrackTintColor="#303841"
                tapToSeek={true}
                thumbTintColor={"#00ADB5"}
            />

            <Text style={styles.text}>{sliderValue}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{

    },
    text:{
        fontFamily: 'RobotoMono_100Thin',
        color: "white",
    },
})

export default ModalSlider;