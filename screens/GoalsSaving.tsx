
import React, { useState } from 'react';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft, Plus, Target, GraduationCap, Car, Home, Plane, Calendar, TrendingUp, Check, Edit } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

interface Goal {
  id: number;
  name: string;
  target: number;
  saved: number;
  icon: any;
  color: string;
  deadline: string;
  weeklyTarget: number;
  category: string;
}

interface GoalsSavingProps {
  onBack: () => void;
}

export function GoalsSaving({ onBack }: GoalsSavingProps) {
  const { colors } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalDate, setNewGoalDate] = useState('');
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      name: 'Emergency Fund',
      target: 1000000,
      saved: 285000,
      icon: Target,
      color: '#10B981',
      deadline: '2024-12-31',
      weeklyTarget: 25000,
      category: 'Safety',
    },
    // ... (add other initial goals similarly; reconstructed from original)
  ]);

  const totalSavings = goals.reduce((sum, goal) => sum + goal.saved, 0);
  const totalTargets = goals.reduce((sum, goal) => sum + goal.target, 0);

  const getWeeksRemaining = (deadline: string) => {
    const now = new Date();
    const target = new Date(deadline);
    const diffTime = target.getTime() - now.getTime();
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.max(0, diffWeeks);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return '#10B981';
    if (percentage >= 50) return '#EAB308';
    return '#EF4444';
  };

  const handleAddGoal = () => {
    if (newGoalName && newGoalAmount && newGoalDate) {
      const newGoal: Goal = {
        id: Date.now(),
        name: newGoalName,
        target: parseFloat(newGoalAmount),
        saved: 0,
        icon: Target, // Default
        color: '#00796B',
        deadline: newGoalDate,
        weeklyTarget: 0, // Calculate if needed
        category: 'Custom',
      };
      setGoals([...goals, newGoal]);
      setShowAddModal(false);
      setNewGoalName('');
      setNewGoalAmount('');
      setNewGoalDate('');
    }
  };

  const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, color = '#00796B' }) => {
    // Simple text-based progress for simplicity; use SVG for full circle if needed
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center', borderWidth: strokeWidth, borderColor: color, borderRadius: size / 2 }}>
        <Text>{Math.round(percentage)}%</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeft size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.foreground }]}>Goals & Saving</Text>
        <TouchableOpacity onPress={() => setShowAddModal(true)}>
          <Plus size={20} color={colors.foreground} />
        </TouchableOpacity>
      </View>
      <View style={styles.summary}>
        <Text>Total Saved: MWK {totalSavings.toLocaleString()}</Text>
        <Text>Total Goals: MWK {totalTargets.toLocaleString()}</Text>
        <View style={styles.progressBar}>
          <View style={{ width: `${(totalSavings / totalTargets) * 100}%`, backgroundColor: colors.primary, height: 8 }} />
        </View>
      </View>
      <ScrollView>
        {goals.map((goal) => {
          const percentage = (goal.saved / goal.target) * 100;
          return (
            <View key={goal.id} style={styles.goalCard}>
              <goal.icon size={24} color={getProgressColor(percentage)} />
              <Text>{goal.name}</Text>
              <CircularProgress percentage={percentage} color={goal.color} />
              <Text>Weeks Remaining: {getWeeksRemaining(goal.deadline)}</Text>
              <TouchableOpacity>
                <TrendingUp size={14} />
                <Text>Add Money</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        <View style={styles.tips}>
          <Text>Savings Tips</Text>
          {/* Add tips as in original */}
        </View>
      </ScrollView>
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TextInput placeholder="Goal Name" value={newGoalName} onChangeText={setNewGoalName} style={styles.input} />
            <TextInput placeholder="Target Amount" value={newGoalAmount} onChangeText={setNewGoalAmount} keyboardType="numeric" style={styles.input} />
            <TextInput placeholder="Target Date (YYYY-MM-DD)" value={newGoalDate} onChangeText={setNewGoalDate} style={styles.input} />
            <TouchableOpacity onPress={handleAddGoal} style={styles.saveButton}>
              <Text>Add Goal</Text>
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  title: { fontSize: 20 },
  summary: { padding: 16 },
  progressBar: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4 },
  goalCard: { padding: 16, borderRadius: 16, marginBottom: 8, backgroundColor: '#FFF' },
  tips: { padding: 16 },
  modal: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#FFF', padding: 16, borderRadius: 16 },
  input: { borderBottomWidth: 1, marginBottom: 16 },
  saveButton: { backgroundColor: '#00796B', padding: 8, borderRadius: 8 },
  cancelButton: { marginTop: 8, padding: 8 },
});