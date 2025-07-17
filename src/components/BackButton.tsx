import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface BackButtonProps {
  title?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  showIcon?: boolean;
  iconColor?: string;
  textColor?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  iconSize = 24,
  showIcon = true,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, style]}
      activeOpacity={0.7}
      accessibilityLabel="Go back"
      accessibilityRole="button">
      {showIcon && (
        <Icon
          name="chevron-back"
          size={iconSize}
          color={'#000'}
          style={styles.icon}
        />
      )}
      {title && <Text style={[styles.text, textStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginLeft: -4,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});

export default BackButton;
