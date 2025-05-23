import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale} from '../utils';
import { Task } from '../utils/type';
import color from '../theme/colors';

type TaskItemProps = {
  task: Task;
  onToggleCompletion: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onSpeak: (text: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleCompletion,
  onEdit,
  onDelete,
  onSpeak,
}) => {
  return (
    <View style={[styles.container, task.completed && styles.completed]}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => onToggleCompletion(task.id)}>
        <Icon
          name={task.completed ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={task.completed ? color.green : color.gray}
        />
      </TouchableOpacity>

      <Text style={[styles.text, task.completed && styles.completedText]}>
        {task.text}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onSpeak(task.text)}>
          <Icon
            name="volume-up"
            size={20}
            color={color.primary}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit(task)}>
          <Icon name="edit" size={20} color={color.golden} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Icon name="delete" size={20} color={color.red} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: moderateScale(15),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(2),
    elevation: moderateScale(2),
  },
  completed: {
    opacity: 0.7,
  },
  checkboxContainer: {
    marginRight: moderateScale(10),
  },
  text: {
    flex: 1,
    fontSize: moderateScale(16),
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    marginLeft: moderateScale(10),
  },
  icon: {
    marginLeft: moderateScale(15),
  },
});

export default TaskItem;
