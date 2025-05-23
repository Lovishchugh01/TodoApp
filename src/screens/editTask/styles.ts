import { StyleSheet } from "react-native";
import { moderateScale } from "../../utils";
import color from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  cancelText: {
    color: color.red,
    fontSize: moderateScale(16),
  },
  saveText: {
    color: color.primary,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: moderateScale(15),
    margin: moderateScale(15),
    borderRadius: moderateScale(8),
    minHeight: moderateScale(100),
    fontSize: moderateScale(16),
    textAlignVertical: 'top',
  },
});