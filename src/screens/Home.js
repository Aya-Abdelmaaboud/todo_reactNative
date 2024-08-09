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
// let idStep = 0;

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([
    { id: 0, name: "All", active: true },
    { id: 1, name: "Active", active: false },
    { id: 2, name: "Done", active: false },
  ]);
  const [selectedCategory, SetSelectedCategory] = useState(0);
  const [toDos, setToDos] = useState([
    // {
    //   id: 1,
    //   title: "task 1",
    //   description: "one one one",
    //   status: "done",
    //   categoryId: 2,
    // },
    // {
    //   id: 2,
    //   title: "task 2",
    //   description: "two two two",
    //   status: "active",
    //   categoryId: 1,
    // },
    // {
    //   id: 3,
    //   title: "task 3",
    //   description: "three three three",
    //   status: "done",
    //   categoryId: 2,
    // },
    // {
    //   id: 4,
    //   title: "task 4",
    //   description: "four four four",
    //   status: "active",
    //   categoryId: 1,
    // },
  ]);
  useEffect(() => {
    const getData = async () => {
      try {
        const todos = await AsyncStorage.getItem("todos");
        console.log("todos use efect");
        console.log(todos);
        if (todos) {
          setToDos(JSON.parse(todos));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  const handleDeleteTodo = (id) => {
    let newToDo = [...toDos];
    newToDo = newToDo.filter((todo) => todo.id !== id);
    setToDos(newToDo);
    saveDataToAsyncStorage(newToDo);
  };
  const handleAsDone = (item) => {
    console.log(item);

    const newTodos = [...toDos];
    let index = newTodos.findIndex((todo) => todo.id === item.id);
    newTodos[index].status = "done";
    newTodos[index].categoryId = 2;
    setToDos(newTodos);
    saveDataToAsyncStorage(newTodos);
  };
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
      id: Date.now(),
    };
    setToDos([...toDos, newToDo]);
    saveDataToAsyncStorage([...toDos, newToDo]);
  };
  const saveDataToAsyncStorage = async (todos) => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (e) {
      console.log("error when saving data to async storage");
    }
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
  const filteredToDos = !selectedCategory
    ? toDos
    : toDos.filter((todo) => todo.categoryId === selectedCategory);
  console.log(toDos);

  console.log(filteredToDos);

  return (
    <SafeAreaView style={styles.container}>
      {/* <View> */}
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
        placeholder="description ..."
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
      <ToDos
        todos={filteredToDos}
        handleDeleteTodo={handleDeleteTodo}
        handleAsDone={handleAsDone}
      />
    </SafeAreaView>
  );
}
