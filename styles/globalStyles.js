import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop:50,
    paddingTop:70,
    backgroundColor: '#FFF',
  },

  containerMargin: {
    flex: 1,
    marginTop:20,
    marginBottom:30
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 8,
  },
  listItemImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
});
