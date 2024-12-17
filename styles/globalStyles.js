import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1DA1F2",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#1DA1F2",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
});

export default styles;
