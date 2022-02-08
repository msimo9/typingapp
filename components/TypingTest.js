import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState} from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, RobotoMono_100Thin } from '@expo-google-fonts/roboto-mono';
import keyListener from '../hooks/keyListener';

const TypingTest = () => {
    let initalArr = [''];
    const [text, setText] = useState('');
    const [randomWords, setRandomWords] = useState(initalArr);
    const [isReady, setIsReady] = useState(false);
    const [counter, setCounter] = useState(0);
    const [underline, setUnderline] = useState(true);

    const [currentChar, setCurrentChar] = useState('');

    const getData = () => {
        fetch('https://random-word-api.herokuapp.com/word?number=100')
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
    }, [])

    useEffect(() => {
        let interval;

        interval = setInterval(() => {
            setCounter(counter => counter+1);
            setUnderline(!underline);
        }, 200)

        return (() => clearInterval(interval));
    }, [counter])

    useEffect(() => {

        getCurrentChar();
        
    }, [fontsLoaded, isReady, currentChar, randomWords]);

    keyListener(key => {
        console.log("current char ", currentChar)
        console.log("current key ", key);
        if(key == "Backspace"){
            setText(text.slice(0, -1));
        }else{
            setText(text+key);
        }
        if(currentChar == key && key!=" " && randomWords.length != 0){
            randomWords[0] = randomWords[0].substring(1);
            if(randomWords[0].length == 0){
                randomWords.shift()
                getNewWord();
                if(randomWords.length == 0){
                    getData();
                }
                getCurrentChar();
            }else{
                getCurrentChar();
            }
        }
    });

    return (
        <View
        
            style={styles.container}
        >
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
        </View>
    );
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