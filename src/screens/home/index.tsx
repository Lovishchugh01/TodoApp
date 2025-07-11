import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { styles } from './styles';

// Define types for the price data we receive from Binance
type PriceData = {
  s: string;          // Symbol
  c: string;          // Last price
  P: string;          // Price change percent
  q: string;          // Quote volume
  l: string;          // Low price
  h: string;          // High price
  timestamp: string;   // Last update time
  previousPrice?: string; // Previous price for comparison
};

const App = () => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [symbols] = useState<string[]>([
    'btcusdt',
    'ethusdt',
    'bnbusdt',
    'solusdt',
    'xrpusdt',
    'adausdt',
    'dogeusdt',
    'dotusdt',
    'avaxusdt',
    'linkusdt'
  ]);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setSocket(ws);
    };

    ws.onmessage = (e: any) => {
      try {
        const data = JSON.parse(e.data) as PriceData[];
        const filteredData = data.filter(item => symbols.includes(item.s.toLowerCase()));
        
        setPriceData(prevData => {
          const newData = [...prevData];
          
          filteredData.forEach(item => {
            const existingIndex = newData.findIndex(d => d.s === item.s);
            const now = new Date();
            const timestamp = now.toLocaleTimeString();
            
            if (existingIndex >= 0) {
              newData[existingIndex] = {
                ...item,
                timestamp,
                previousPrice: newData[existingIndex].c,
              };
            } else {
              newData.push({
                ...item,
                timestamp,
                previousPrice: item.c,
              });
            }
          });
          
          return newData.sort((a, b) => a.s.localeCompare(b.s));
        });
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
      }
    };

    ws.onerror = (e: Event) => {
      console.log('WebSocket Error:', e);
    };

    ws.onclose = (e: any) => {
      console.log('WebSocket Disconnected:', e.code, e.reason);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [symbols]);

  const getPriceChangeColor = (currentPrice: string, previousPrice?: string): string => {
    if (!previousPrice) return '#000';
    const current = parseFloat(currentPrice);
    const previous = parseFloat(previousPrice);
    return current > previous ? '#16c784' : current < previous ? '#ea3943' : '#000';
  };

  const formatPrice = (price: string): string => {
    const num = parseFloat(price);
    if (num < 1) return num.toFixed(6);
    if (num < 10) return num.toFixed(4);
    if (num < 1000) return num.toFixed(2);
    return num.toFixed(0);
  };

  const renderItem = ({ item }: { item: PriceData }) => {
    const symbol = item.s.replace('USDT', '/USDT').toUpperCase();
    const priceColor = getPriceChangeColor(item.c, item.previousPrice);
    const change24h = parseFloat(item.P);
    const isPositive = change24h >= 0;
    
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <View style={[
          styles.card,
          isPositive ? styles.positiveCard : styles.negativeCard
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.symbolContainer}>
              <Text style={styles.symbol}>{symbol}</Text>
              <Text style={styles.volume}>Vol: ${(parseFloat(item.q) / 1000000).toFixed(2)}M</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={[styles.price, { color: priceColor }]}>
                ${formatPrice(item.c)}
              </Text>
              <View style={[
                styles.change24hBadge,
                isPositive ? styles.positiveBadge : styles.negativeBadge
              ]}>
                <Text style={styles.change24hText}>
                  {isPositive ? '↑' : '↓'} {Math.abs(change24h).toFixed(2)}%
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.cardFooter}>
            <View style={styles.priceChangeContainer}>
              <Text style={styles.priceChangeLabel}>24h Range:</Text>
              <Text style={styles.priceChangeValue}>
                ${formatPrice(item.l)} - ${formatPrice(item.h)}
              </Text>
            </View>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Crypto Tracker</Text>
        <Text style={styles.subHeader}>Real-time prices from Binance</Text>
      </View>
      
      <FlatList
        data={priceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.s}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={[
        styles.statusBar,
        socket ? styles.connectedStatus : styles.connectingStatus
      ]}>
        <Text style={styles.statusText}>
          {socket ? '✓ Connected to Binance WebSocket' : 'Connecting to Binance...'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default App;