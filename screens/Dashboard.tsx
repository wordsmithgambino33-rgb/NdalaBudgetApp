
import React, { useState } from 'react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Plus, TrendingUp, TrendingDown, Eye, EyeOff, ChevronRight, AlertTriangle } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

type Screen = 'dashboard' | 'transactions' | 'budget' | 'reports' | 'goals';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { colors } = useTheme();
  const [showBalance, setShowBalance] = useState(true);
  const [currentTip, setCurrentTip] = useState(0);

  const balance = 285000;
  const monthlyIncome = 450000;
  const monthlyExpenses = 165000;

  const recentTransactions = [
    { id: 1, type: 'expense', category: 'Market', amount: 15000, description: 'Groceries - Limbe Market', time: '2 hours ago', color: '#EF4444' },
    // ... (add others)
  ];

  const budgetAlerts = [
    { category: 'Transport', spent: 85, limit: 20000, color: '#EF4444' },
    // ... (add others)
  ];

  const tips = [
    { en: "Save at least 20% of your income for emergencies", ch: "Sungani 20% ya ndalama zanu za tsiku ndi tsiku" },
    // ... (add others)
  ];

  const opacity = useSharedValue(showBalance ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, { duration: 300 }),
  }));

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={[styles.greeting, { color: colors.foreground }]}>Good morning, Chisomo</Text>
      </View>
      <View style={styles.balanceCard}>
        <Text>Current Balance</Text>
        <Animated.View style={animatedStyle}>
          <Text>MWK {showBalance ? balance.toLocaleString() : '••••••'}</Text>
        </Animated.View>
        <TouchableOpacity onPress={() => {
          setShowBalance(!showBalance);
          opacity.value = showBalance ? 0 : 1;
        }}>
          {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
        </TouchableOpacity>
        <Text>Income: MWK {monthlyIncome.toLocaleString()}</Text>
        <Text>Expenses: MWK {monthlyExpenses.toLocaleString()}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onNavigate('transactions')}>
          <Plus size={24} />
          <Text>Add Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNavigate('budget')}>
          <TrendingUp size={24} />
          <Text>View Budget</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tipCard}>
        <Text>Financial Tip</Text>
        <Text>{tips[currentTip].en}</Text>
        <Text>{tips[currentTip].ch}</Text>
        {/* Carousel dots */}
      </View>
      {budgetAlerts.length > 0 && (
        <View style={styles.alerts}>
          <Text>Budget Alerts</Text>
          {budgetAlerts.map((alert) => (
            <View key={alert.category}>
              <Text>{alert.category}: {alert.spent}% used</Text>
              <View style={styles.progressBar}>
                <View style={{ width: `${alert.spent}%`, backgroundColor: alert.color, height: 8 }} />
              </View>
            </View>
          ))}
        </View>
      )}
      <View style={styles.transactions}>
        <Text>Recent Transactions</Text>
        {recentTransactions.map((tx) => (
          <View key={tx.id} style={styles.txItem}>
            <View style={[styles.txIcon, { backgroundColor: tx.color }]}>
              {tx.type === 'income' ? <TrendingUp size={20} color="#FFF" /> : <TrendingDown size={20} color="#FFF" />}
            </View>
            <Text>{tx.description}</Text>
            <Text>{tx.amount.toLocaleString()}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.fab} onPress={() => onNavigate('transactions')}>
        <Plus size={24} color={colors.foreground} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16 },
  greeting: { fontSize: 20 },
  balanceCard: { padding: 16, borderRadius: 16, backgroundColor: '#FFF' },
  actions: { flexDirection: 'row', justifyContent: 'space-around' },
  tipCard: { padding: 16, borderRadius: 16, backgroundColor: '#FFF' },
  alerts: { padding: 16, borderRadius: 16, backgroundColor: '#FFF' },
  progressBar: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4 },
  transactions: { padding: 16, borderRadius: 16, backgroundColor: '#FFF' },
  txItem: { flexDirection: 'row', alignItems: 'center' },
  txIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  fab: { position: 'absolute', bottom: 96, right: 16, width: 56, height: 56, borderRadius: 28, backgroundColor: '#00796B', justifyContent: 'center', alignItems: 'center' },
})