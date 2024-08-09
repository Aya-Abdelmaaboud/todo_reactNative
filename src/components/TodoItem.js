import React from "react";
import { styles } from "../shared/styles";

import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function TodoItem({ item, handleDeleteTodo, handleAsDone }) {
  const navigation = useNavigation();

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

        <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
          <Feather name="trash-2" size={22} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
