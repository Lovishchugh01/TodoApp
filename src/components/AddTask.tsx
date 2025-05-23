import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import color from '../theme/colors';
import { moderateScale } from '../utils';

const AddTask = ({ onAddTask }:{onAddTask:(value:string)=>void;}) => {
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    onAddTask(taskText);
    setTaskText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        value={taskText}
        onChangeText={setTaskText}
        onSubmitEditing={handleAddTask}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Icon name="add" size={moderateScale(24)} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: moderateScale(15),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    flex: 1,
    height: moderateScale(50),
    borderColor: color.gray,
    borderWidth: 1,
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(8),
    marginRight: moderateScale(10),
    backgroundColor: color.white,
    color:color.black
  },
  button: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddTask;