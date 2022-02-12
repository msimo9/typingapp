import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Slider from '@react-native-community/slider';
import { useFonts, RobotoMono_100Thin } from '@expo-google-fonts/roboto-mono';
import { changeTimerValue } from '../redux/redux';

const TimerSlider = () => {

    const [sliderValue, setSliderValue] = useState(useSelector(state => state.timerValue))

    let [fontsLoaded] = useFonts({
        RobotoMono_100Thin,
    });

    const dispatch = useDispatch();
    const changeSliderV = (value) => {
        setSliderValue(value);
        dispatch(changeTimerValue(value));
    }

    useEffect(() => {
        
    }, [sliderValue]);

    return (
        <View
            style={styles.container}
        >
            <Slider
                style={{width: 200, height: 40}}
                onValueChange={value => changeSliderV(value)}
                value={sliderValue}
                step={10}
                minimumValue={30}
                maximumValue={180}
                minimumTrackTintColor="#00ADB5"
                maximumTrackTintColor="#303841"
                tapToSeek={true}
                thumbTintColor={"#00ADB5"}
            />
            <Text style={styles.text}>{sliderValue} seconds</Text>
        </View>
    )
}

export default TimerSlider;

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
    },
    text:{
        fontFamily: 'RobotoMono_100Thin',
        color: "white",
    },
})