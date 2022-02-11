import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState} from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, RobotoMono_100Thin } from '@expo-google-fonts/roboto-mono';
import keyListener from '../hooks/keyListener';
import Information from './Information';
import ToggleModalButton from './ToggleModalButton';
import Finished from './Finished';

import {useSelector} from 'react-redux'

const TypingTest = () => {
    let initalArr = [''];
    const [text, setText] = useState('');
    const [randomWords, setRandomWords] = useState(initalArr);
    const [isReady, setIsReady] = useState(false);
    const [counter, setCounter] = useState(0);
    const [totalCounter, setTotalCounter] = useState(0);
    const [underline, setUnderline] = useState(true);
    const [hasStarted, setHasStarted] = useState(false);

    const [currentChar, setCurrentChar] = useState('');
    const [errors, setErrors] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [typedWords, setTypedWords] = useState(0);

    const [hasFinished, setHasFinished] = useState(false);

    const numberOfWords = useSelector(state => state.sliderValue);
    const language = useSelector(state => state.language);
    const fetchString = "https://random-word-api.herokuapp.com/word?number="+numberOfWords+"&lang="+language;
    console.log(numberOfWords);

    const getData = () => {
        fetch(fetchString)
        .then(response => response.json())
        .then(data => setRandomWords(data))
        .then(setIsReady(true));
    }

    const getNewWord = () => {

    }

    const getCurrentChar = () => {
        setCurrentChar(randomWords[0].charAt(0));
    }

    let [fontsLoaded] = useFonts({
        RobotoMono_100Thin,
    });

    useEffect(() => {
        getData();
    }, [numberOfWords, hasFinished, language]);

    useEffect(() => {
        let interval;

        interval = setInterval(() => {
            setCounter(counter => counter+1);
            setUnderline(!underline);
        }, 200)

        return (() => clearInterval(interval));
    }, [counter]);

    useEffect(() => {
        let interval2;

        if(hasStarted){
            interval2 = setInterval(() => {
                setTotalCounter(totalCounter => totalCounter+1);
                console.log(totalCounter);
                if(totalCounter > 3){
                    setWpm(Math.floor(typedWords/(totalCounter/60)));
                    console.log(wpm);
                }
            }, 1000)
        }

        return (() => clearInterval(interval2));
    }, [totalCounter, hasStarted])

    useEffect(() => {

        getCurrentChar();
        
    }, [fontsLoaded, isReady, currentChar, randomWords]);

    keyListener(key => {

        if(key === " "){
            getData();
            setHasFinished(false);
        }

        if(key == "Backspace"){
            setText(text.slice(0, -1));
        }else{
            setText(text+key);
        }
        console.log(key);
        if(currentChar == key && key!=" " && randomWords.length != 0){
            setHasStarted(true);
            randomWords[0] = randomWords[0].substring(1);
            if(randomWords[0].length == 0){
                setTypedWords(typedWords => typedWords+1);
                randomWords.shift()
                getNewWord();
                if(randomWords.length == 0){
                    setHasFinished(true);
                }
                getCurrentChar();
            }else{
                getCurrentChar();
            }
        }else if(key != " "){
            setErrors(errors => errors + 1);
        }
    });
    if(!hasFinished){
    return (
        <View
        
            style={styles.container}
        >   
            <Information errors={errors} wpm={wpm}/>
            <View style={styles.wordsContainer}>
                {randomWords.slice(0, 15).map((item, index) => {
                    if(index == 0){
                        return(
                            <View style={styles.firstWord}>
                                <Text
                                    style={
                                        underline
                                        ? {color: "white", fontWeight: 500, fontFamily: 'RobotoMono_100Thin', marginHorizontal: -5,textDecoration: 'underline'}
                                        : {color: "white", fontWeight: 500, fontFamily: 'RobotoMono_100Thin', marginHorizontal: -5}}>
                                            {currentChar}
                                </Text>
                                <Text style={styles.words}>{item.substring(1)}</Text>
                            </View>
                        )
                    }
                    else{
                        return(<Text style={styles.words}>{item}</Text>)
                    }
                })}
            </View>
            <View style={styles.wordsContainer}>
                {randomWords.slice(15, 30).map((item) => {
                    return(<Text style={styles.words}>{item}</Text>)
                })}
            </View>
            
            <ToggleModalButton style={{zIndex: 99}}/>
        </View>
    );
    }else{
        return(
            <Finished />
        );
    }
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
        borderRightColor: "white",
        borderWidth: 1,
    },
    wordsContainer:{
        width: "80%",
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    words:{
        color: "white",
        fontWeight: 500,
        fontFamily: 'RobotoMono_100Thin',
        marginHorizontal: 5,
    },
    textinput:{
        width: 500
    },
    firstWord:{
        flexDirection: "row",
    }
});


export default TypingTest;