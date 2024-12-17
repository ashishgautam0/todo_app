import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import TodoItem from "../components/TodoItem";
import { loadData, saveData } from "../utils/storage";
import styles from "../styles/globalStyles";

const CompletedTasksScreen = () => {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCompletedTasks = async () => {
      setIsLoading(true);
      try {
        const storedCompleted = await loadData("completedTodos");
        setCompletedTodos(storedCompleted || []);
      } catch (error) {
        console.error("Failed to load completed tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCompletedTasks();
  }, []);


  const deleteCompletedTodo = async (id) => {
    const updatedCompleted = completedTodos.filter((todo) => todo.id !== id);
    setCompletedTodos(updatedCompleted);
    await saveData("completedTodos", updatedCompleted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Tasks</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#1DA1F2" />
      ) : completedTodos.length > 0 ? (
        <FlatList
          data={completedTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              isCompleted={true}
              onDelete={() => deleteCompletedTodo(item.id)}
            />
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>No completed tasks yet!</Text>
      )}
    </View>
  );
};

export default CompletedTasksScreen;
