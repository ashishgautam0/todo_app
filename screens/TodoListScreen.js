import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import TodoItem from "../components/TodoItem";
import { Ionicons } from "@expo/vector-icons";
import { saveData, loadData } from "../utils/storage";
import styles from "../styles/globalStyles";

const TodoListScreen = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const initializeTasks = async () => {
      const storedTasks = await loadData("todos");
      const storedCompleted = await loadData("completedTodos");
      setTodos(storedTasks || []);
      setCompletedTodos(storedCompleted || []);
    };
    initializeTasks();
  }, []);

  const saveTasks = async (updatedTodos, updatedCompleted) => {
    await saveData("todos", updatedTodos);
    await saveData("completedTodos", updatedCompleted);
  };

  const addTodo = async () => {
    if (text.trim()) {
      const newTodos = [...todos, { id: Date.now().toString(), text }];
      setTodos(newTodos);
      await saveTasks(newTodos, completedTodos);
      setText("");
    }
  };

  const completeTodo = async (id) => {
    const taskToComplete = todos.find((todo) => todo.id === id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    const updatedCompleted = [...completedTodos, taskToComplete];

    setTodos(updatedTodos);
    setCompletedTodos(updatedCompleted);
    await saveTasks(updatedTodos, updatedCompleted);
  };

  const deleteCompletedTodo = async (id) => {
    const updatedCompleted = completedTodos.filter((todo) => todo.id !== id);
    setCompletedTodos(updatedCompleted);
    await saveTasks(todos, updatedCompleted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      {/* Add Task */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a task..."
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <TouchableOpacity onPress={addTodo} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Uncompleted Tasks */}
      <Text style={styles.subHeader}>Pending Tasks</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            isCompleted={false}
            onDelete={() => completeTodo(item.id)}
          />
        )}
      />


    </View>
  );
};

export default TodoListScreen;
