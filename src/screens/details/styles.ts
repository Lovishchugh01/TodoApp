import { StyleSheet } from 'react-native';

const styles = (theme:any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme === 'dark' ? '#121212' : '#fff',
  },
  flag: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme === 'dark' ? '#333' : '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: theme === 'dark' ? '#fff' : '#000',
  },
  detailContainer: {
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme === 'dark' ? '#aaa' : '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: theme === 'dark' ? '#fff' : '#000',
  },
  section: {
    marginBottom: 24,
  },
});

export default styles;