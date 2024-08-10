import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTodos = createAsyncThunk("todos/getAll", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = res.json();
  return data;
});
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading:true,
    error:""
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    markAsDone: (state, action) => {
      console.log("slice", action.payload);
      const index = state.todos.findIndex((todo) => todo.id === action.payload);


      if (state.todos[index].completed === false) {
        state.todos[index].categoryId = 2;
      }


      if (state.todos[index].completed === true) {
        state.todos[index].categoryId = 1;
      }
      state.todos[index].completed = !state.todos[index].completed;

    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      console.log(action.payload);
      state.todos = action.payload;
      state.loading=false
    }).addCase(getTodos.rejected,(state,action)=>{
      state.loading=false
      state.error="error in getting data from serve"
    });
  },
});
export const { addTodo, removeTodo, markAsDone } = todoSlice.actions;
export default todoSlice;
