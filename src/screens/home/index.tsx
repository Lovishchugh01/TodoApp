import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import Tts from 'react-native-tts';
import { AuthContext } from '../../context/AuthContext';
import AddTask from '../../components/AddTask';
import TaskItem from '../../components/TaskItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Task } from '../../utils/type';
import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';

type HomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
};

const Home:React.FC<HomeProps> = ({ navigation }) => {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion, logout } = useContext(AuthContext);

  const handleAddTask = (taskText:string) => {
    if (!taskText.trim()) {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    addTask(newTask);
  };

  const handleEditTask = (task:Task) => {
    navigation.navigate('EditTask', { task });
  };

  const handleDeleteTask = (id:string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteTask(id) },
      ]
    );
  };

  const handleSpeakTask = (text:string) => {
    Tts.stop();
    Tts.speak(text);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <AddTask onAddTask={handleAddTask} />
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleCompletion={toggleTaskCompletion}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onSpeak={handleSpeakTask}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
        }
      />
    </SafeAreaView>
  );
};



export default Home;