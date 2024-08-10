import React, { useState } from "react";
import { styles } from "../shared/styles";

import { Text, Touchable, TouchableOpacity, View, Button,Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";


export default function TodoItem({ item, handleDeleteTodo, handleAsDone }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const handleDelete = (id) => {
    handleDeleteTodo(id)
    setModalVisible(false); 
  };
  const handleCancelModal = () => {
    setModalVisible(false);
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
        <Text style={item.status === "done" ? styles.doneTodo : ""}>
          {item.title}
        </Text>
        <Text>{item.description}</Text>
      </View>
      
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        {item.status === "active" && (
          <TouchableOpacity onPress={()=>handleAsDone(item)}>
            <Fontisto name="checkbox-passive" size={20} color="green" />
          </TouchableOpacity>
        )}
        {item.status === "done" && (
          <AntDesign name="checksquareo" size={20} color="green" />
        )}

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Feather name="trash-2" size={22} color="red" />
        </TouchableOpacity>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Required for Android back button
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={handleCancelModal} />
              <Button title="Delete" color="red" onPress={()=>handleDelete(item.id)} />
            </View>
          </View>
        </View>
      </Modal>
      </View>
    </TouchableOpacity>
  );
}

