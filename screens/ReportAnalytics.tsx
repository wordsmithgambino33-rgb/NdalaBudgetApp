
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { VictoryPie, VictoryBar, VictoryChart, VictoryAxis, VictoryLine } from 'victory-native';
import { Svg } from 'react-native-svg';
import { ArrowLeft, Calendar, Download, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Filter } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { db } from '../firebaseConfig'; // Add this
import { collection, getDocs } from 'firebase/firestore'; // Add this

interface ReportsAnalyticsProps {
  onBack: () => void;
}

export function ReportsAnalytics({ onBack }: ReportsAnalyticsProps) {
  const { colors } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(8); // September (0-indexed)
  const [viewType, setViewType] = useState<'pie' | 'bar' | 'trend'>('pie');

  const [expenseData, setExpenseData] = useState<any[]>([]); // updated for Firebase
  const [monthlyData, setMonthlyData] = useState<any[]>([]); // updated for Firebase
  const [trendData, setTrendData] = useState<any[]>([]); // updated for Firebase

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Fetch data from Firebase Firestore
  useEffect(() => {
    const fetchData = async () => {
      // Expenses
      const expenseSnapshot = await getDocs(collection(db, 'expenses'));
      const expenses: any[] = [];
      expenseSnapshot.forEach(doc => expenses.push(doc.data()));
      setExpenseData(expenses);

      // Monthly Data
      const monthlySnapshot = await getDocs(collection(db, 'monthlyData'));
      const monthly: any[] = [];
      monthlySnapshot.forEach(doc => monthly.push(doc.data()));
      setMonthlyData(monthly);

      // Trend Data
      const trendSnapshot = await getDocs(collection(db, 'trendData'));
      const trend: any[] = [];
      trendSnapshot.forEach(doc => trend.push(doc.data()));
      setTrendData(trend);
    };

    fetchData();
  }, []);

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);
  const totalIncome = 450000;
  const savings = totalIncome - totalExpenses;
  const savingsRate = (savings / totalIncome) * 100;

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
    } else if (direction === 'next' && currentMonth < 11) {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderChart = () => {
    const width = Dimensions.get('window').width - 32;
    switch (viewType) {
      case 'pie':
        return (
          <Svg width={width} height={250}>
            <VictoryPie
              data={expenseData}
              x="name"
              y="value"
              innerRadius={60}
              radius={100}
              colorScale={expenseData.map((entry) => entry.color)}
              style={{ labels: { fontSize: 0 } }}
            />
          </Svg>
        );
      case 'bar':
        return (
          <VictoryChart width={width} height={250}>
            <VictoryBar data={monthlyData} x="month" y="income" style={{ data: { fill: '#00796B' } }} />
            <VictoryBar data={monthlyData} x="month" y="expenses" style={{ data: { fill: '#FF7043' } }} />
            <VictoryAxis />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        );
      case 'trend':
        return (
          <VictoryChart width={width} height={250}>
            <VictoryLine data={trendData} x="day" y="amount" style={{ data: { stroke: '#1E88E5', strokeWidth: 3 } }} />
            <VictoryAxis />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeft size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.foreground }]}>Reports & Analytics</Text>
        <TouchableOpacity>
          <Download size={20} color={colors.foreground} />
        </TouchableOpacity>
      </View>
      <View style={styles.monthNav}>
        <TouchableOpacity onPress={() => navigateMonth('prev')} disabled={currentMonth === 0}>
          <ChevronLeft size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={styles.monthText}>{months[currentMonth]} 2024</Text>
        <TouchableOpacity onPress={() => navigateMonth('next')} disabled={currentMonth === 11}>
          <ChevronRight size={24} color={colors.foreground} />
        </TouchableOpacity>
      </View>
      <View style={styles.savingsCard}>
        <Text>Savings: MWK {savings.toLocaleString()}</Text>
        <Text>Savings Rate: {savingsRate.toFixed(1)}%</Text>
        <View style={styles.progressBar}>
          <View style={{ width: `${Math.min(savingsRate, 100)}%`, backgroundColor: savingsRate >= 20 ? '#10B981' : '#EF4444', height: 12 }} />
        </View>
      </View>
      <View style={styles.viewToggle}>
        {['pie', 'bar', 'trend'].map((type) => (
          <TouchableOpacity key={type} onPress={() => setViewType(type as any)} style={[styles.toggleButton, viewType === type && { backgroundColor: colors.primary }]}>
            <Text>{type.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.chartContainer}>
        {renderChart()}
      </View>
      {viewType === 'pie' && (
        <View style={styles.breakdown}>
          <Text>Category Breakdown</Text>
          {expenseData.map((cat) => (
            <View key={cat.name} style={styles.breakdownItem}>
              <View style={[styles.colorDot, { backgroundColor: cat.color }]} />
              <Text>{cat.name}: MWK {cat.value.toLocaleString()} ({((cat.value / totalExpenses) * 100).toFixed(1)}%)</Text>
            </View>
          ))}
        </View>
      )}
      <View style={styles.insights}>
        <Text>Financial Insights</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 20 },
  monthNav: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
  monthText: { fontSize: 18 },
  savingsCard: { padding: 16, borderRadius: 16, backgroundColor: '#FFF' },
  progressBar: { backgroundColor: '#E5E7EB', borderRadius: 6, height: 12 },
  viewToggle: { flexDirection: 'row', marginVertical: 16 },
  toggleButton: { flex: 1, padding: 12, borderRadius: 12, alignItems: 'center' },
  chartContainer: { alignItems: 'center' },
  breakdown: { marginTop: 16 },
  breakdownItem: { flexDirection: 'row', alignItems: 'center' },
  colorDot: { width: 16, height: 16, borderRadius: 8, marginRight: 8 },
  insights: { marginTop: 16 },
});
