
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './components/ThemeProvider';
import AppNavigator from './navigation/AppNavigator';
import { Transaction, Budget } from './types/types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // Load authentication state from AsyncStorage
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedAuth = await AsyncStorage.getItem('isAuthenticated');
        if (storedAuth) {
          setIsAuthenticated(JSON.parse(storedAuth));
        }
      } catch (error) {
        console.error('Error loading auth:', error);
      }
    };
    loadAuth();
  }, []);

  // Save authentication state
  useEffect(() => {
    const saveAuth = async () => {
      try {
        await AsyncStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
      } catch (error) {
        console.error('Error saving auth:', error);
      }
    };
    saveAuth();
  }, [isAuthenticated]);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <AppNavigator
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            transactions={transactions}
            setTransactions={setTransactions}
            budgets={budgets}
            setBudgets={setBudgets}
          />
        </SafeAreaView>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});