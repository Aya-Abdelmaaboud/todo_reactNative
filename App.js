import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { useState } from "react";
let idStep = 5;

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState([
    { id: 0, name: "All", active: true },
    { id: 1, name: "Active", active: false },
    { id: 2, name: "Done", active: false },
  ]);
  const [selectedCategory, SetSelectedCategory] = useState(0);
  const [toDos, setToDos] = useState([
    {
      id: 1,
      title: "task 1",
      description: "one one one",
      status: "done",
      categoryId: 2,
    },
    {
      id: 2,
      title: "task 2",
      description: "two two two",
      status: "active",
      categoryId: 1,
    },
    {
      id: 3,
      title: "task 3",
      description: "three three three",
      status: "done",
      categoryId: 2,
    },
    {
      id: 4,
      title: "task 4",
      description: "four four four",
      status: "active",
      categoryId: 1,
    },
  ]);
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
      status: "active",
      categoryId: 1,
      id: idStep++,
    };
    setToDos([...toDos, newToDo]);
  };
  const handleSelectedCategory = (cat) => {
    // let newBtns = [...categories];
    // newBtns = newBtns.map((btn) => ({
    //   ...btn,
    //   active: btn.id === button.id ? (btn.active = true) : (btn.active = false),
    // }));
    // setCategories(newBtns);
    SetSelectedCategory(cat.id);
  };
  const filteresToDos = !selectedCategory
    ? toDos
    : toDos.filter((todo) => todo.categoryId === selectedCategory);
  // console.log(toDos);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>todo app</Text>
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
        placeholder="Description ..."
      />
      <TouchableOpacity style={styles.submitBtn} onPress={handleAddToDo}>
        <Text style={styles.text}>Add</Text>
      </TouchableOpacity>
      <View style={styles.dividerLine} />
      <View style={styles.filterContainer}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={
              cat.id === selectedCategory
                ? styles.activeFilterBtn
                : styles.filterBtn
            }
            onPress={() => handleSelectedCategory(cat)}
          >
            <Text
              style={
                cat.id === selectedCategory
                  ? styles.activeFilterText
                  : styles.filterText
              }
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        style={styles.listContainer}
        data={filteresToDos}
        renderItem={({ item }) => (
          <View style={styles.todosContainer}>
            <Text style={item.status === "done" ? styles.doneTodo : ""}>
              {item.title}
            </Text>
            <Text>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
