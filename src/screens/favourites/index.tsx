import React, { useEffect, useState } from 'react';
import { 
  SafeAreaView, 
  FlatList, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import styles from './styles';

interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  region: string;
}

const Favorites = () => {
  const [favoriteCountries, setFavoriteCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { theme } = useTheme();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // Load favorite country names from AsyncStorage
        const favoritesJson = await AsyncStorage.getItem('favorites');
        const favorites = favoritesJson ? JSON.parse(favoritesJson) : {};
        
        // Get only the country names that are favorited
        const favoriteCountryNames = Object.keys(favorites).filter(name => favorites[name]);
        
        // Since we don't have all countries here, we'll need to fetch them
        // Alternatively, you could pass favorites from Home screen via navigation params
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,region');
        const allCountries = response.data;
        
        // Filter to only include favorited countries
        const favoritesData = allCountries.filter((country: Country) => 
          favoriteCountryNames.includes(country.name.common)
        );
        
        setFavoriteCountries(favoritesData);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const renderItem = ({ item }: { item: Country }) => (
    <TouchableOpacity 
      style={[styles.countryItem, theme === 'dark' && styles.darkItem]}
      onPress={() => navigation.navigate('Details', { country: item })}
    >
      <Image source={{ uri: item.flags.png }} style={styles.flag} />
      <View style={styles.countryInfo}>
        <Text style={[styles.countryName, theme === 'dark' && styles.darkText]}>{item.name.common}</Text>
        <Text style={[styles.region, theme === 'dark' && styles.darkText]}>{item.region}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, theme === 'dark' && styles.darkContainer]}>
        <ActivityIndicator size="large" color={theme === 'dark' ? '#fff' : '#000'} />
      </View>
    );
  }

  return (
    <>
        <BackButton title='Home'/>
    <SafeAreaView style={[styles.container, theme === 'dark' && styles.darkContainer]}>
        <Text style={[styles.title, theme === 'dark' && styles.darkText]}>
          Favorite Countries</Text>
      {favoriteCountries.length > 0 ? (
        <FlatList
          data={favoriteCountries}
          renderItem={renderItem}
          keyExtractor={(item) => item.name.common}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, theme === 'dark' && styles.darkText]}>
            No favorite countries yet!
          </Text>
        </View>
      )}
    </SafeAreaView>
    </>

  );
};



export default Favorites;