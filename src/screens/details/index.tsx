import React from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  Text, 
  Image, 
  View 
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/type';
import BackButton from '../../components/BackButton';
import { useTheme } from '../../context/ThemeContext';
import styles from './styles';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsProps {
  route: DetailsScreenRouteProp;
}

const Details: React.FC<DetailsProps> = ({ route }) => {
  const { country } = route.params;
  const { theme } = useTheme();

  const themedStyles = styles(theme);

  return (
    <>
      <BackButton title="Home" />
      <SafeAreaView style={themedStyles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={themedStyles.section}>
            <Image source={{ uri: country.flags.png }} style={themedStyles.flag} />
            <Text style={themedStyles.title}>{country.name.common}</Text>
          </View>

          <View style={themedStyles.detailContainer}>
            <Text style={themedStyles.detailLabel}>Population</Text>
            <Text style={themedStyles.detailValue}>
              {country.population?.toLocaleString() || 'N/A'}
            </Text>
          </View>

          {country.languages && (
            <View style={themedStyles.detailContainer}>
              <Text style={themedStyles.detailLabel}>Languages</Text>
              <Text style={themedStyles.detailValue}>
                {Object.values(country.languages).join(', ')}
              </Text>
            </View>
          )}

          {country.currencies && (
            <View style={themedStyles.detailContainer}>
              <Text style={themedStyles.detailLabel}>Currencies</Text>
              <Text style={themedStyles.detailValue}>
                {Object.values(country.currencies)
                  .map((c: any) => `${c.name} (${c.symbol || '—'})`)
                  .join(', ')}
              </Text>
            </View>
          )}

          {country.timezones && (
            <View style={themedStyles.detailContainer}>
              <Text style={themedStyles.detailLabel}>Timezones</Text>
              <Text style={themedStyles.detailValue}>
                {country.timezones.join(', ')}
              </Text>
            </View>
          )}

          {country?.capital && (
            <View style={themedStyles.detailContainer}>
              <Text style={themedStyles.detailLabel}>Capital</Text>
              <Text style={themedStyles.detailValue}>
                {country?.capital.join(', ')}
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Details;