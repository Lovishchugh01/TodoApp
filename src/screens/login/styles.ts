import { StyleSheet } from "react-native";
import color from "../../theme/colors";
import { moderateScale } from "../../utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: moderateScale(20),
    backgroundColor: color.white,
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(30),
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: moderateScale(50),
    borderColor: color.gray,
    borderWidth: 1,
    marginBottom: moderateScale(15),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(8),
    backgroundColor: color.white,
  },
  button: {
    backgroundColor: color.primary,
    padding: moderateScale(15),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  buttonText: {
    color: color.white,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  note: {
    marginTop: moderateScale(20),
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
});