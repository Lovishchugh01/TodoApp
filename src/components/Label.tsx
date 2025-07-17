import { StyleSheet, Text, TextStyle } from "react-native";
import React, { FC } from "react";
import color from "../theme/colors";
import { moderateScale } from "../utils";

interface Props {
  title: string | undefined | number;
  labelStyle?: TextStyle | TextStyle[];
  onPress?: () => void;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip" | undefined;
}

const Label: FC<Props> = ({
  title,
  labelStyle,
  onPress,
  numberOfLines,
  ellipsizeMode,
}) => {

  return (
    <Text
      numberOfLines={numberOfLines}
      style={StyleSheet.flatten([
        styles.txtStyle,
        {
          color: color?.black,
        },
        labelStyle,
      ])}
      onPress={onPress}
      ellipsizeMode={ellipsizeMode ?? "tail"}
    >
      {title}
      
    </Text>
  );
};

export default Label;

const styles = StyleSheet.create({
  txtStyle: {
    fontSize: moderateScale(20),
    maxWidth: "auto",
  },
});
