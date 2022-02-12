import { StyleSheet, Text, View, CheckBox} from 'react-native'
import React from 'react'
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import TimerSlider from './TimerSlider';
import { changeTimer } from '../redux/redux';

const CheckboxTimer = () => {

  const [isChecked, setIsChecked] = useState(useSelector(state => state.timer));

  const dispatch = useDispatch();
  const updateTimer = () => {
    setIsChecked(!isChecked);
    dispatch(changeTimer());
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>set timer</Text>
      <CheckBox
        value={isChecked}
        onValueChange={() => updateTimer()}
        style={styles.checkbox}
      />
      {isChecked ? <TimerSlider /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop: 50,
    width: 200,
  },
  text:{
      fontFamily: 'RobotoMono_100Thin',
      color: "white",
      marginBottom: 10,
  },
  checkbox:{
    width: 20,
    height: 20,
  }
})

export default CheckboxTimer;