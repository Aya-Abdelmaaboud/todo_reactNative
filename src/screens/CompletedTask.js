import React, { useEffect } from "react";
import { FlatList, ImageBackground, Text, View } from "react-native";
import { styles } from "../shared/styles";
import * as ScreenOrientation from "expo-screen-orientation";
import { useSelector } from "react-redux";
import TodoItem from "../components/TodoItem";

// const image = { uri: "https://legacy.reactjs.org/logo-og.png" };
export default function CompletedTask() {
  const {todos}=useSelector(state=>state.todos)
  console.log(todos);

  
  // useEffect(() => {
  //   changeOrientationToDefault = async () => {
  //     await ScreenOrientation.lockAsync(
  //       ScreenOrientation.OrientationLock.DEFAULT
  //     );
  //   };
  //   changeOrientationToDefault();
  // });
  return (

    <View style={styles.container}>
          <FlatList
        style={styles.listContainer}
        data={todos.filter(todo=>todo.completed)}
        renderItem={({ item }) => <TodoItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.textImage}>completed task</Text>
      </ImageBackground> */}
    </View>
  );
}
