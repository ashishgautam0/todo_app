import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TodoItem = ({ item, onDelete, isCompleted = false }) => (
  <View style={styles.container}>
    <Text style={[styles.text, isCompleted && styles.completedText]}>
      {item.text}
    </Text>
    <TouchableOpacity onPress={onDelete}>
      <Ionicons
        name={isCompleted ? "trash" : "checkmark-circle-outline"}
        size={24}
        color={isCompleted ? "red" : "green"}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});

export default TodoItem;
