import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Switch } from "react-native";

const TodoItem = ({ item, onToggleStatus, onDelete }) => (
  <View style={styles.container}>
    <Text
      style={[
        styles.text,
        item.status ? styles.completedText : null, // Strikethrough if done
      ]}
    >
      {item.title}
    </Text>

    <Switch
      value={item.status} // true = done, false = due
      onValueChange={() => onToggleStatus(item.id)}
      trackColor={{ false: "#ddd", true: "#1DA1F2" }}
      thumbColor={item.status ? "#fff" : "#f4f4f4"}
    />

    {/* Delete Task */}
    <TouchableOpacity onPress={() => onDelete(item.id)}>
      <Ionicons name="trash" size={24} color="red" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    flex: 1,
    color: "#333",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});

export default TodoItem;
