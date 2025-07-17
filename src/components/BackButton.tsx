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
import {useTheme} from '../context/ThemeContext';

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
  iconColor, // No default here - we'll handle it below
  textColor, // No default here - we'll handle it below
}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  // Determine colors based on theme if not explicitly provided
  const resolvedIconColor = iconColor ?? (theme === 'dark' ? '#fff' : '#000');
  const resolvedTextColor = textColor ?? (theme === 'dark' ? '#fff' : '#000');

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
      style={[
        styles.container,
        {
          backgroundColor: theme === 'dark' ? '#333' : '#fff',
        },
        style,
      ]}
      activeOpacity={0.7}
      accessibilityLabel="Go back"
      accessibilityRole="button">
      {showIcon && (
        <Icon
          name="chevron-back"
          size={iconSize}
          color={resolvedIconColor}
          style={styles.icon}
        />
      )}
      {title && (
        <Text style={[
          styles.text, 
          {color: resolvedTextColor},
          textStyle
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginLeft: -4,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BackButton;