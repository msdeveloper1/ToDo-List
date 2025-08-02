import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard
} from 'react-native';

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTask = () => {
    if (task.trim()) {
      if (editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, task]);
      }
      setTask("");
      Keyboard.dismiss(); // close keyboard after adding
    }
  };

  const handleEditTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setEditIndex(-1);
    setTask("");
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <Text style={styles.taskText}>{item}</Text>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Welcome To</Text>
        <Text style={styles.title}>ToDo Application</Text>
r
        <TextInput
          style={styles.input}
          placeholder="Enter Your Task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddTask}
        >
          <Text style={styles.addButtonText}>
            {editIndex !== -1 ? "Update Task" : "Add Task"}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false} // prevent nested scroll
          keyboardShouldPersistTaps="handled"
        />
        <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    paddingTop: 60,
    paddingBottom: 100,
    backgroundColor: "#fff",
    flexGrow: 1
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "dodgerblue",
    textAlign: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18
  },
  addButton: {
    backgroundColor: 'dodgerblue',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center"
  },
  taskText: {
    fontSize: 18,
    flex: 1
  },
  taskActions: {
    flexDirection: "row",
    marginLeft: 10
  },
  editButton: {
    color: "dodgerblue",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 10
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16
  }
});
