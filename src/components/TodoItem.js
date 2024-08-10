import React, { useState } from "react";
import { styles } from "../shared/styles";

import {
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Button,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useDispatch } from "react-redux";
import { markAsDone, removeTodo } from "../redux/slices/todoSlice";

export default function TodoItem({ item }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const handleDelete = (id) => {
    dispatch(removeTodo(id));
    setModalVisible(false);
  };
  const handleCancelModal = () => {
    setModalVisible(false);
  };
  const handleAsDone = (id) => {
    console.log(id);    
    dispatch(markAsDone(id));
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("todo-details", { item })}
      style={{
        ...styles.todosContainer,
        marginVertical: 4,
        borderWidth: 1,
        borderBlockColor: "grey",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={item.completed ? styles.doneTodo : ""}>
          {item.title}
        </Text>
        <Text>{item.description}</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        {!item.completed && (
          <TouchableOpacity onPress={() => handleAsDone(item.id)}>
            <Fontisto name="checkbox-passive" size={20} color="green" />
          </TouchableOpacity>
        )}
        {item.completed && (
          <AntDesign name="checksquareo" size={20} color="green" onPress={() => handleAsDone(item.id)} />
        )}

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Feather name="trash-2" size={22} color="red" />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Are you sure you want to delete this item?
              </Text>
              <View style={styles.buttonContainer}>
                <Button title="Cancel" onPress={handleCancelModal} />
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
}
