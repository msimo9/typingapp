import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalScreen from './ModalScreen';

const ToggleModalButton = () => {

  const [visibility, setVisibility] = useState(false);

  const toggleModal = () => {
    setVisibility(!visibility);
  }

  return (
    <View style={styles.container}>
      <ModalScreen visibility={visibility} toggleModal={setVisibility}/>
      <TouchableOpacity
          onPress={()=> toggleModal()}
          style={styles.toggleModalButton}
      >
        <Ionicons name={"settings"} size={24} color={"white"}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        left: 0,
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').height,
        zIndex: 99,
    },
    toggleModalButton:{
      opacity: 0.6,
      position: "absolute",
      left: 20,
      bottom: 20,
    }
});

export default ToggleModalButton;
