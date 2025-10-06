
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

// ✅ Corrected import paths
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { themes } from './styles/theme';
import { View, Text, Button } from 'react-native';

// Example placeholder screens
const HomeScreen = ({ navigation }: any) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: theme.text, fontSize: 20 }}>Welcome to Ndala Budget</Text>
      <Button title="Go to Add Expense" onPress={() => navigation.navigate('AddExpense')} />
      <Button title="Toggle Theme" onPress={toggleTheme} />
      <Button
        title="Show Toast"
        onPress={() =>
          Toast.show({
            type: 'success',
            text1: 'Hello 👋',
            text2: 'This is a sample toast message!',
          })
        }
      />
    </View>
  );
};

const AddExpenseScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: theme.text, fontSize: 18 }}>Add a new expense 💰</Text>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

// Stack Navigator
const Stack = createNativeStackNavigator();

// Internal App Navigator
const AppNavigator = () => {
  const { theme } = useTheme();
  const navigationTheme = theme === themes.light ? DefaultTheme : DarkTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ndala Budget' }} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: 'Add Expense' }} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

// Main App Component
export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
