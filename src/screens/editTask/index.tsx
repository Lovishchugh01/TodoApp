import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../utils/type';
import {styles} from './styles';

// Define props for the component
type EditTaskProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditTask'>;
  route: RouteProp<RootStackParamList, 'EditTask'>;
};

const EditTask: React.FC<EditTaskProps> = ({route, navigation}) => {
  const {task} = route.params;
  const [taskText, setTaskText] = useState(task.text);
  const {updateTask} = useContext(AuthContext);

  const handleSave = () => {
    if (!taskText.trim()) {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    updateTask(task.id, {text: taskText});
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Task</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        value={taskText}
        onChangeText={setTaskText}
        autoFocus
        multiline
        placeholder="Edit your task..."
      />
    </SafeAreaView>
  );
};

export default EditTask;
