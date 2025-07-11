# Binance Price Tracker 📈

![App Screenshot](https://drive.google.com/uc?id=1TqYCrcXsfkkbcs-3Jm04r0aoN51dpGw2)

A real-time cryptocurrency price tracking mobile app built with React Native and TypeScript, connecting directly to Binance's WebSocket API.

## ✨ Features

- **Live Price Updates**: Real-time streaming of cryptocurrency prices
- **Visual Indicators**: 
  - 🟢 Green for price increases
  - 🔴 Red for price decreases
- **Comprehensive Data**:
  - Current price with precision formatting
  - 24-hour percentage change
  - Trading volume (in millions)
  - Price range (high/low)
- **Clean UI**: Card-based layout with intuitive design
- **Connection Monitoring**: Real-time WebSocket status

## 📱 Supported Cryptocurrencies

| Pair       | Symbol    |
|------------|-----------|
| Bitcoin    | BTC/USDT  |
| Ethereum   | ETH/USDT  |
| Binance Coin | BNB/USDT |
| Solana     | SOL/USDT  |
| Ripple     | XRP/USDT  |
| Cardano    | ADA/USDT  |
| Dogecoin   | DOGE/USDT |
| Polkadot   | DOT/USDT  |
| Avalanche  | AVAX/USDT |
| Chainlink  | LINK/USDT |

## 🛠️ Installation

```bash
# Clone the specific branch
git clone -b BinancePriceTracker https://github.com/Lovishchugh01/TodoApp.git
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