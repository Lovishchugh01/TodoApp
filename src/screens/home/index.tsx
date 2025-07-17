import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import io from 'socket.io-client';
import NetInfo from '@react-native-community/netinfo';

const SERVER_PORT = 3000;

const App = () => {
  const [ticket, setTicket] = useState('');
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [serverIP, setServerIP] = useState(null);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);

  useEffect(() => {
    const detectNetwork = async () => {
      try {
        const state = await NetInfo.fetch();
        
        if (state?.isConnected && state?.details) {
          let ip = state?.details?.ipAddress;
          let gateway = state?.details?.gateway;
          
          const potentialIPs = [
            gateway,
            ip.split('.').slice(0, 3).join('.') + '.100',
            '192.168.1.100',
            '10.0.2.2'
          ];

          for (const potentialIP of potentialIPs) {
            try {
              const testSocket = io(`http://${potentialIP}:${SERVER_PORT}`, {
                transports: ['websocket'],
                timeout: 2000,
                reconnectionAttempts: 1
              });

              await new Promise((resolve, reject) => {
                testSocket.on('connect', () => {
                  testSocket.disconnect();
                  resolve(potentialIP);
                });
                
                testSocket.on('connect_error', () => {
                  reject(new Error('Connection failed'));
                });

                setTimeout(() => reject(new Error('Timeout')), 2000);
              });

              setServerIP(potentialIP);
              initializeSocket(potentialIP);
              return;
            } catch (e) {
              console.log(`Failed to connect to ${potentialIP}`);
            }
          }
          throw new Error('Could not detect server IP');
        } else {
          throw new Error('No network connection');
        }
      } catch (error) {
        setLoading(false);
      }
    };

    const initializeSocket = (ip) => {
      const socket = io(`http://${ip}:${SERVER_PORT}`, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        setIsConnected(true);
        setLoading(false);
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
      });

      socket.on('queue-update', (updatedQueue) => {
        setQueue(updatedQueue);
      });

      socket.on('current-ticket', (currentTicket) => {
        setCurrent(currentTicket);
      });

      socket.on('connect_error', (err) => {
        setLoading(false);
        setIsConnected(false);
      });
    };

    detectNetwork();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const addTicket = () => {
    if (ticket.trim() && socketRef.current) {
      socketRef.current.emit('add-ticket', ticket.trim());
      setTicket('');
    }
  };

  const callNext = () => {
    if (socketRef.current) {
      socketRef.current.emit('call-next');
    }
  };

  const closeTicket = () => {
    if (socketRef.current) {
      socketRef.current.emit('close-ticket');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          {serverIP ? `Connecting to ${serverIP}...` : 'Detecting network...'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Queue Calling System</Text>
      
      <Text style={[styles.connectionStatus, {color: isConnected ? 'green' : 'red'}]}>
        Status: {isConnected ? `Connected to ${serverIP}` : 'Disconnected'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Ticket ID"
        value={ticket}
        onChangeText={setTicket}
        onSubmitEditing={addTicket}
      />
      <Button title="Generate" onPress={addTicket} disabled={!isConnected} />
    
      <Text style={styles.sectionTitle}>Currently Serving:</Text>
      <Text style={styles.currentTicket}>{current || 'None'}</Text>

      <View style={styles.buttonRow}>
        <Button title="Next" onPress={callNext} disabled={!isConnected} />
        <Button title="Close" onPress={closeTicket} disabled={!isConnected} />
      </View>

      <Text style={styles.sectionTitle}>Visitors in Queue:</Text>
      <FlatList
        data={queue}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Text style={styles.ticket}>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, flex: 1, backgroundColor: '#fff'},
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  loadingText: {marginTop: 10, fontSize: 16},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#333'},
  connectionStatus: {marginBottom: 10},
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    color: '#333',
    borderRadius: 5,
    borderColor: '#ccc'
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  currentTicket: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
    fontWeight: 'bold'
  },
  ticket: {
    fontSize: 18,
    padding: 10,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  }
});

export default App;