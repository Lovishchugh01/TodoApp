# Countries Explorer App 🌍

A feature-rich mobile application built with React Native and TypeScript that allows users to explore country information from around the world.

## ✨ Features

- **Comprehensive Country Data**:
  - Country flags
  - Official names
  - Regions (Asia, Africa, Europe, etc.)
  - Population data
  - Languages and currencies
  - Timezones

- **Intuitive Search**:
  - Search countries by name
  - Real-time filtering as you type

- **Smart Filtering**:
  - Filter by continent/region (Africa, Americas, Asia, Europe, Oceania)
  - "All Regions" option to reset filters

- **Dark Mode Support**:
  - Beautiful dark theme for comfortable night-time browsing
  - Automatic theme switching

- **Favorites System**:
  - Star favorite countries
  - Persistent storage of favorites
  - Dedicated favorites view

- **Detailed Country View**:
  - Navigate to see comprehensive country details
  - Clean, organized information presentation

## 🛠️ Technical Implementation

- Built with React Native and TypeScript
- Uses REST Countries API for data
- AsyncStorage for persistent favorites
- React Navigation for smooth transitions
- Custom theme context for dark/light mode
- Responsive design for all screen sizes

## 📱 Installation

```bash
# Clone the specific branch
git clone -b CountriesExplorerApp https://github.com/Lovishchugh01/TodoApp.git
cd TodoApp

# Install dependencies
yarn install

# For iOS only
cd ios && pod install && cd ..

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```