import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { RadioButton } from 'react-native-paper';
import {useState} from 'react';
import { useFonts, RobotoMono_100Thin } from '@expo-google-fonts/roboto-mono';
import {useSelector, useDispatch} from 'react-redux';
import { changeLanguage } from '../redux/redux';

export default function RadioButtons() {
    const initialLang = useSelector(state => state.language);
    const [checked, setChecked] = useState(initialLang);

    let [fontsLoaded] = useFonts({
        RobotoMono_100Thin,
    });

    const dispatch = useDispatch();
    const changeCheckedValue = (value) =>{
        setChecked(value);
        dispatch(changeLanguage(value));
    }

    const langs = ["en", "de", "es", "zh"];

    return (
        <View style={styles.container}>
            <Text style={styles.text}>language</Text>

            {langs.map(element => {
                return(
                    <View style={styles.innerContainer}>
                        <RadioButton
                            value={element}
                            status={checked === element ? "checked" : "unchecked"}
                            onPress={() => changeCheckedValue(element)}
                        />
                        <Text style={styles.text}>{element}</Text>
                    </View>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 50,
        width: 200,
    },
    innerContainer:{
        flexDirection: "row",
        alignItems: "center"
    },
    text:{
        fontFamily: 'RobotoMono_100Thin',
        color: "white",
    },
})