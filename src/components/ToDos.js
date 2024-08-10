import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../shared/styles";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../redux/slices/todoSlice";

export default function ToDos() {
  const { todos, loading, error } = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  const [categories, setCategories] = useState([
    { id: 0, name: "All", active: true },
    { id: 1, name: "Active", active: false },
    { id: 2, name: "Done", active: false },
  ]);
  const [selectedCategory, SetSelectedCategory] = useState(0);

  useEffect(() => {
    dispatch(getTodos());
  }, []);
  const handleSelectedCategory = (cat) => {
    console.log(cat.id);

    SetSelectedCategory(cat.id);
  };
  const filteredToDos = !selectedCategory
    ? todos
    : todos.filter((todo) => todo.categoryId === selectedCategory);
  console.log(todos);

  console.log(filteredToDos);

 
  if (error) return <Text>{error}</Text>;
  if (loading) return <Text>Loading</Text>;

  return (
    <>
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
        data={filteredToDos}
        renderItem={({ item }) => <TodoItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
