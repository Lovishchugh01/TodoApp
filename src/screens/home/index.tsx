// screens/index.tsx
import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {getStyles} from './styles';

export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  region: string;
  population?: number;
  languages?: Record<string, string>;
  currencies?: Record<string, {name: string; symbol: string}>;
  timezones?: string[];
}

const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const navigation = useNavigation();
  const [regions, setRegions] = useState<string[]>([]);
  const {theme, toggleTheme} = useTheme();
  const styles = getStyles(theme);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        'https://restcountries.com/v3.1/all?fields=name,flags,region,population,languages,currencies,timezones',
      );
      const data = response.data;
      setCountries(data);
      setFilteredCountries(data);

      // Extract unique regions
      const uniqueRegions = Array.from(
        new Set(data.map((country: Country) => country.region)),
      );
      setRegions(['all', ...uniqueRegions]);

      // Load favorites
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (err) {
      setError('Failed to fetch countries. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch countries data
  useEffect(() => {
    fetchCountries();
  }, []);

  // Filter and search countries
  useEffect(() => {
    let result = countries;

    // Filter by region
    if (selectedRegion !== 'all') {
      result = result.filter(country => country.region === selectedRegion);
    }

    // Search by name
    if (searchText) {
      result = result.filter(country =>
        country.name.common.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    setFilteredCountries(result);
  }, [searchText, selectedRegion, countries]);

  // Toggle favorite
  const toggleFavorite = async (countryName: string) => {
    const newFavorites = {
      ...favorites,
      [countryName]: !favorites[countryName],
    };
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Render each country item
  const renderItem = useCallback(
    ({item}: {item: Country}) => (
      <TouchableOpacity
        style={styles.countryItem}
        onPress={() => navigation.navigate('Details', {country: item})}>
        <Image source={{uri: item.flags.png}} style={styles.flag} />
        <View style={styles.countryInfo}>
          <Text style={styles.countryName}>{item.name.common}</Text>
          <Text style={styles.region}>{item.region}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item.name.common)}>
          <Icon
            name={favorites[item.name.common] ? 'star' : 'star-outline'}
            size={24}
            color={
              favorites[item.name.common]
                ? 'gold'
                : theme === 'dark'
                ? '#aaa'
                : '#666'
            }
          />
        </TouchableOpacity>
      </TouchableOpacity>
    ),
    [favorites, navigation, styles, theme],
  );

  // Retry fetching data
  const retryFetch = () => {
    setLoading(true);
    setError(null);
    fetchCountries();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.errorContainer,
          theme === 'dark' && styles.darkContainer,
        ]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={retryFetch} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search countries"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedRegion}
            style={styles.regionPicker}
            onValueChange={itemValue => setSelectedRegion(itemValue)}
            dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
            mode="dropdown">
            {regions.map(region => (
              <Picker.Item
                key={region}
                label={region === 'all' ? 'All Regions' : region}
                value={region}
                color={theme === 'dark' ? '#fff' : '#000'}
              />
            ))}
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.FavouriteContainer}
          onPress={() => navigation.navigate('Favorites')}>
          <Icon
            name="heart"
            size={20}
            color={theme === 'dark' ? '#ff5555' : '#ff0000'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.FavouriteContainer}
          onPress={toggleTheme}
          activeOpacity={0.7}>
          <Icon
            name={theme === 'light' ? 'moon-outline' : 'sunny-outline'}
            size={20}
            color={theme === 'light' ? '#000' : '#FFD700'}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCountries}
        renderItem={renderItem}
        keyExtractor={item => item.name.common}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No countries found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Home;