import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../shared/styles";
import { useEffect, useState } from "react";
import ToDos from "../components/ToDos";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoForm from "../components/TodoForm";
import { useSelector } from "react-redux";

export default function Home() {


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>todo app</Text>
  
      <TodoForm />
      <View style={styles.dividerLine} />
      <ToDos
      />
    </SafeAreaView>
  );
}
