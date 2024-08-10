import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../shared/styles";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todoSlice";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleChangeTitle = (value) => {
    setTitle(value);
  };
  const handleChangeDescription = (value) => {
    setDescription(value);
  };

  const handleAddToDo = () => {
    const newToDo = {
      title,
      description,
      completed: false,
      categoryId: 1,
      id: Date.now(),
    };
    dispatch(addTodo(newToDo));
    setTitle("");
    setDescription("");
  };
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <TextInput
        value={title}
        onChangeText={handleChangeTitle}
        style={styles.input}
        placeholder="Title ..."
      />
      <TextInput
        value={description}
        onChangeText={handleChangeDescription}
        style={styles.input}
        placeholder="description ..."
      />
      <TouchableOpacity style={styles.submitBtn} onPress={handleAddToDo}>
        <Text style={styles.text}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}
