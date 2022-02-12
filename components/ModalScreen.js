import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-web';
import ModalSlider from './ModalSlider';
import RadioButtons from './RadioButtons';
import CheckboxTimer from './CheckboxTimer';

const ModalScreen = (props) => {

    const toggleModalChild = () => {
        props.toggleModal(false);
    }

  return (
      <Modal
        isVisible={props.visibility}
        style={styles.modalContainer}
      >
          <View style={styles.nestedView}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => toggleModalChild()}
                >
                    <Ionicons name={"close"} size={16} color="white" />
                </TouchableOpacity>

                <ModalSlider />
                <RadioButtons />
                <CheckboxTimer />
          </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
    nestedView:{
        position: "absolute",
        left: 0,
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').height * 0.8,
        borderRadius: 15,
        backgroundColor: "#3A4750",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton:{
        position: "absolute",
        top: 10,
        right: 10,
    }
})

export default ModalScreen;