
import React, { useState } from 'react';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft, Plus, ShoppingCart, Car, GraduationCap, Coffee, Home, Heart, AlertTriangle, CheckCircle, Edit, TrendingUp } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

interface BudgetCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  budget: number;
  spent: number;
  transactions: { description: string; amount: number; date: string }[];
}

interface BudgetManagementProps {
  onBack: () => void;
}

export function BudgetManagement({ onBack }: BudgetManagementProps) {
  const { colors } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBudgetCategory, setNewBudgetCategory] = useState('');
  const [newBudgetAmount, setNewBudgetAmount] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([
    {
      id: 'market',
      name: 'Market & Groceries',
      icon: ShoppingCart,
      color: '#EF4444',
      budget: 80000,
      spent: 68000,
      transactions: [
        { description: 'Limbe Market - Vegetables', amount: 25000, date: '2 days ago' },
        { description: 'Shoprite - Groceries', amount: 43000, date: '5 days ago' },
      ],
    },
    // ... (add other initial categories similarly; reconstructed from original)
    {
      id: 'rent',
      name: 'Rent & Bills',
      icon: Home,
      color: '#6B7280',
      budget: 150000,
      spent: 150000,
      transactions: [
        { description: 'Monthly rent', amount: 120000, date: '1 week ago' },
        { description: 'Electricity bill', amount: 30000, date: '1 week ago' },
      ],
    },
  ]);

  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) return { status: 'over', color: '#EF4444', bgColor: '#EF4444' };
    if (percentage >= 80) return { status: 'warning', color: '#EAB308', bgColor: '#EAB308' };
    return { status: 'safe', color: '#10B981', bgColor: '#10B981' };
  };

  const handleAddBudget = () => {
    if (newBudgetCategory && newBudgetAmount) {
      const newCategory: BudgetCategory = {
        id: Date.now().toString(),
        name: newBudgetCategory,
        icon: Plus, // Default icon; customize as needed
        color: '#00796B', // Default color
        budget: parseFloat(newBudgetAmount),
        spent: 0,
        transactions: [],
      };
      setBudgetCategories([...budgetCategories, newCategory]);
      setShowAddModal(false);
      setNewBudgetCategory('');
      setNewBudgetAmount('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.foreground }]}>Budget Management</Text>
        </View>
        <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addButton}>
          <Plus size={20} color={colors.foreground} />
        </TouchableOpacity>
        <View style={styles.summary}>
          <Text style={[styles.summaryText, { color: colors.foreground }]}>Monthly Budget: MWK {totalBudget.toLocaleString()}</Text>
          <Text style={[styles.summaryText, { color: colors.foreground }]}>Spent: MWK {totalSpent.toLocaleString()}</Text>
          {/* Progress bar - use react-native-progress or custom View */}
          <View style={styles.progressBar}>
            <View style={{ width: `${(totalSpent / totalBudget) * 100}%`, backgroundColor: colors.primary, height: 8 }} />
          </View>
          <Text style={[styles.summaryText, { color: colors.foreground }]}>Remaining: MWK {(totalBudget - totalSpent).toLocaleString()}</Text>
        </View>
      </View>
      <ScrollView style={styles.content}>
        {budgetCategories.map((category) => {
          const percentage = (category.spent / category.budget) * 100;
          const status = getBudgetStatus(category.spent, category.budget);
          const isExpanded = expandedCategory === category.id;
          const height = useSharedValue(isExpanded ? 'auto' : 0);

          const animatedStyle = useAnimatedStyle(() => ({
            height: withTiming(height.value === 'auto' ? 'auto' : 0, { duration: 300 }),
            opacity: withTiming(isExpanded ? 1 : 0, { duration: 300 }),
          }));

          return (
            <Animated.View key={category.id} style={styles.categoryCard}>
              <TouchableOpacity onPress={() => {
                setExpandedCategory(isExpanded ? null : category.id);
                height.value = isExpanded ? 0 : 'auto';
              }}>
                <View style={styles.categoryHeader}>
                  <category.icon size={24} color={status.color} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: status.bgColor, height: 8 }} />
                </View>
                <Text style={styles.spent}>MWK {category.spent.toLocaleString()} spent / {category.budget.toLocaleString()} budget</Text>
              </TouchableOpacity>
              <Animated.View style={animatedStyle}>
                <View style={styles.expandedContent}>
                  <Text>Recent Transactions</Text>
                  {category.transactions.map((tx, index) => (
                    <View key={index} style={styles.transaction}>
                      <Text>{tx.description} - MWK {tx.amount.toLocaleString()}</Text>
                      <Text>{tx.date}</Text>
                    </View>
                  ))}
                  <Text>Remaining: MWK {(category.budget - category.spent).toLocaleString()}</Text>
                </View>
              </Animated.View>
            </Animated.View>
          );
        })}
      </ScrollView>
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TextInput placeholder="Category Name" value={newBudgetCategory} onChangeText={setNewBudgetCategory} style={styles.input} />
            <TextInput placeholder="Budget Amount" value={newBudgetAmount} onChangeText={setNewBudgetAmount} keyboardType="numeric" style={styles.input} />
            <TouchableOpacity onPress={handleAddBudget} style={styles.saveButton}>
              <Text>Add Budget</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowAddModal(false)} style={styles.cancelButton}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16 },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 8 },
  title: { fontSize: 20 },
  addButton: { padding: 8 },
  summary: { marginTop: 16 },
  summaryText: { fontSize: 16 },
  progressBar: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4 },
  content: { padding: 16 },
  categoryCard: { padding: 16, borderRadius: 16, marginBottom: 8, backgroundColor: '#FFFFFF' },
  categoryHeader: { flexDirection: 'row', alignItems: 'center' },
  categoryName: { flex: 1, marginLeft: 8 },
  percentage: { fontSize: 16 },
  spent: { fontSize: 14 },
  expandedContent: { marginTop: 8 },
  transaction: { flexDirection: 'row', justifyContent: 'space-between' },
  modal: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#FFF', padding: 16, borderRadius: 16 },
  input: { borderBottomWidth: 1, marginBottom: 16 },
  saveButton: { backgroundColor: '#00796B', padding: 8, borderRadius: 8 },
  cancelButton: { marginTop: 8, padding: 8 },
});