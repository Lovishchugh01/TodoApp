import { Country } from "../screens/home";

export type RootStackParamList = {
  Home: undefined;
  Details: {country: Country};
    Favorites: undefined;

};

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt?: string;
};
