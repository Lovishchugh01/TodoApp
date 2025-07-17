// screens/styles.ts
import {StyleSheet} from 'react-native';

export const getStyles = (theme:any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#fff',
    },
    darkContainer: {
      backgroundColor: '#121212',
    },
    FavouriteContainer: {
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#333' : '#ccc',
      borderRadius: 5,
      overflow: 'hidden',
      marginLeft: 10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#333' : '#ccc',
      borderRadius: 5,
      overflow: 'hidden',
      marginLeft: 10,
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
    },
    regionPicker: {
      width: 110,
      color: theme === 'dark' ? '#fff' : '#000',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#121212' : '#fff',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme === 'dark' ? '#121212' : '#fff',
    },
    errorText: {
      color: theme === 'dark' ? '#ff5555' : 'red',
      marginBottom: 20,
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: theme === 'dark' ? '#444' : '#007AFF',
      padding: 10,
      borderRadius: 5,
    },
    retryButtonText: {
      color: theme === 'dark' ? '#fff' : 'white',
    },
    searchContainer: {
      padding: 7,
      flexDirection: 'row',
      backgroundColor: theme === 'dark' ? '#121212' : '#fff',
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#333' : '#ccc',
      borderRadius: 5,
      padding: 7,
      marginRight: 10,
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
    },
    countryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#333' : '#eee',
      backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
    },
    flag: {
      width: 50,
      height: 30,
      marginRight: 15,
    },
    countryInfo: {
      flex: 1,
    },
    countryName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : '#000',
    },
    region: {
      fontSize: 14,
      color: theme === 'dark' ? '#aaa' : '#666',
    },
    favorite: {
      fontSize: 24,
      color: 'gold',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme === 'dark' ? '#121212' : '#fff',
    },
    emptyText: {
      color: theme === 'dark' ? '#aaa' : '#666',
    },
  });