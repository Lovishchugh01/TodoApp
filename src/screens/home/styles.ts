import { StyleSheet } from "react-native";
import color from "../../theme/colors";
import { moderateScale } from "../../utils";

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
    backgroundColor: color.white,
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  logoutText: {
    color: color.primary,
    fontSize: moderateScale(16),
  },
  listContent: {
    padding: moderateScale(15),
  },
  emptyText: {
    textAlign: 'center',
    marginTop: moderateScale(20),
    color: '#666',
  },
});