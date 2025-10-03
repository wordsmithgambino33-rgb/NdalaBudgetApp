
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { VictoryPie, VictoryBar, VictoryChart, VictoryAxis, VictoryLine } from 'victory-native';
import { Svg } from 'react-native-svg';
import { ArrowLeft, Calendar, Download, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Filter } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

interface ReportsAnalyticsProps {
  onBack: () => void;
}

export function ReportsAnalytics({ onBack }: ReportsAnalyticsProps) {
  const { colors } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(8); // September (0-indexed)
  const [viewType, setViewType] = useState<'pie' | 'bar' | 'trend'>('pie');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const expenseData = [
    { name: 'Market & Groceries', value: 68000, color: '#EF4444' },
    { name: 'School Fees', value: 75000, color: '#3B82F6' },
    { name: 'Transport', value: 17000, color: '#F97316' },
    { name: 'Food & Drinks', value: 19500, color: '#EAB308' },
    { name: 'Rent & Bills', value: 150000, color: '#6B7280' },
    { name: 'Health', value: 25000, color: '#10B981' },
  ];

  const monthlyData = [
    { month: 'May', income: 450000, expenses: 280000 },
    { month: 'Jun', income: 450000, expenses: 320000 },
    { month: 'Jul', income: 480000, expenses: 295000 },
    { month: 'Aug', income: 450000, expenses: 354500 },
    { month: 'Sep', income: 450000, expenses: 165000 },
  ];

  const trendData = [
    { day: '1', amount: 15000 },
    { day: '5', amount: 8000 },
    { day: '8', amount: 25000 },
    { day: '12', amount: 5000 },
    { day: '15', amount: 75000 },
    { day: '18', amount: 12000 },
    { day: '22', amount: 18000 },
    { day: '25', amount: 30000 },
    { day: '28', amount: 7000 },
  ];

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
              style={{ labels: { fontSize: 0 } }} // Hide labels if not needed
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
        {/* Add insights text as in original */}
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