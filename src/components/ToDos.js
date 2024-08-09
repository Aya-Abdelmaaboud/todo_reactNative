import React from "react";
import { FlatList, Text } from "react-native";
import {styles} from '../shared/styles'
import TodoItem from "./TodoItem";

export default function ToDos({ todos,handleDeleteTodo,handleAsDone }) {
 
  return (
    <>
      <FlatList
        style={styles.listContainer}
        data={todos}
        renderItem={({ item }) => (
        <TodoItem item={item} handleDeleteTodo={handleDeleteTodo} handleAsDone={handleAsDone}/>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
