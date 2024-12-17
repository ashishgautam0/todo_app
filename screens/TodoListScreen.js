import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import TodoItem from "../components/TodoItem";
import { Ionicons } from "@expo/vector-icons";
import { saveData, loadData } from "../utils/storage";
import styles from "../styles/globalStyles";

const TodoListScreen = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await loadData("todos");
      setTodos(storedTasks || []);
    };
    fetchTasks();
  }, []);

  const saveTasks = async (updatedTodos) => {
    setTodos(updatedTodos);
    await saveData("todos", updatedTodos);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    const newTask = { id: Date.now().toString(), title, status: false }; // Status: false by default
    const updatedTodos = [...todos, newTask];
    await saveTasks(updatedTodos);
    setTitle(""); // Reset input
  };

  const toggleStatus = async (id) => {
    const updatedTodos = todos.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    await saveTasks(updatedTodos);
  };

  const deleteTask = async (id) => {
    const updatedTodos = todos.filter((task) => task.id !== id);
    await saveTasks(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Task title..."
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={addTask}
          style={[styles.addButton, !title.trim() && styles.disabledButton]}
          disabled={!title.trim()} // Disable if input is empty
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggleStatus={toggleStatus} // Edit Status
            onDelete={deleteTask} // Delete Task
          />
        )}
      />
    </View>
  );
};

export default TodoListScreen;
