
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { ArrowLeft, TrendingUp, TrendingDown, ShoppingCart, Car, GraduationCap, Coffee, Home, Heart, Briefcase, DollarSign, Check } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { db } from '../config'; // Your Firebase config
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface TransactionLoggingProps {
  onBack: () => void;
}

export function TransactionLogging({ onBack }: TransactionLoggingProps) {
  const { colors } = useTheme();
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const incomeCategories = [
    { id: 'salary', name: 'Salary', icon: Briefcase, color: '#3B82F6' },
    // ... (add others)
  ];

  const expenseCategories = [
    { id: 'market', name: 'Market', icon: ShoppingCart, color: '#EF4444' },
    // ... (add others)
  ];

  const currentCategories = transactionType === 'income' ? incomeCategories : expenseCategories;

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '⌫'],
  ];

  const handleKeypadPress = (value: string) => {
    if (value === '⌫') {
      setAmount(amount.slice(0, -1));
    } else if (value === '.' && !amount.includes('.')) {
      setAmount(amount + value);
    } else if (value !== '.' && amount.length < 10) {
      setAmount(amount + value);
    }
  };

  const handleSave = async () => {
    if (amount && selectedCategory) {
      const newTx = {
        type: transactionType,
        amount: parseFloat(amount),
        category: selectedCategory,
        note,
        createdAt: serverTimestamp(), // Optional timestamp
      };

      try {
        await addDoc(collection(db, 'transactions'), newTx); // Save to Firestore
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onBack();
        }, 1500);
      } catch (error) {
        console.error('Error saving transaction:', error);
      }
    }
  };

  if (showSuccess) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Check size={40} color="#FFF" />
        </View>
        <Text>Transaction Saved!</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeft size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.foreground }]}>Add Transaction</Text>
      </View>
      <View style={styles.typeToggle}>
        <TouchableOpacity onPress={() => setTransactionType('expense')} style={[styles.toggleButton, transactionType === 'expense' && { backgroundColor: colors.foreground }]}>
          <TrendingDown size={20} />
          <Text>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTransactionType('income')} style={[styles.toggleButton, transactionType === 'income' && { backgroundColor: colors.foreground }]}>
          <TrendingUp size={20} />
          <Text>Income</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.amountCard}>
        <Text>Amount</Text>
        <Text>MWK {amount || '0'}</Text>
        <View style={styles.keypad}>
          {keypadNumbers.flat().map((num, index) => (
            <TouchableOpacity key={index} onPress={() => handleKeypadPress(num)} style={styles.keypadButton}>
              <Text>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.categoryCard}>
        <Text>Select Category</Text>
        <View style={styles.categories}>
          {currentCategories.map((cat) => (
            <TouchableOpacity key={cat.id} onPress={() => setSelectedCategory(cat.id)} style={[styles.categoryButton, selectedCategory === cat.id && { borderColor: colors.primary }]}>
              <cat.icon size={20} color="#FFF" style={{ backgroundColor: cat.color, borderRadius: 20, padding: 8 }} />
              <Text>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.noteCard}>
        <Text>Add Note (Optional)</Text>
        <TextInput multiline value={note} onChangeText={setNote} style={styles.noteInput} />
      </View>
      <TouchableOpacity onPress={handleSave} disabled={!amount || !selectedCategory} style={styles.saveButton}>
        <Text>Save Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

// ...keep the same styles as you had
