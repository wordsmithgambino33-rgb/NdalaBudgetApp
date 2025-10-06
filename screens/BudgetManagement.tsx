
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, FlatList, Platform, ScrollView, Picker } from 'react-native';
import { Progress } from 'react-native-progress';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { ArrowLeft, Plus, ShoppingCart, Car, GraduationCap, Coffee, Home, AlertTriangle, CheckCircle, Edit3, TrendingUp, BookOpen } from 'react-native-vector-icons/Lucide';
import { ThemeProvider, getDynamicStyles } from '../styles/styles';
import { db } from '../firebase/config'; // import your config.js
import { collection, getDocs } from 'firebase/firestore';

const BudgetManagement = ({ onBack }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBudgetCategory, setNewBudgetCategory] = useState('');
  const [newBudgetAmount, setNewBudgetAmount] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [libraryExpanded, setLibraryExpanded] = useState(false);
  const [language, setLanguage] = useState('english');
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [budgetCategories, setBudgetCategories] = useState([
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
      ]
    },
    {
      id: 'transport',
      name: 'Transport',
      icon: Car,
      color: '#F97316',
      budget: 20000,
      spent: 17000,
      transactions: [
        { description: 'Taxi to Lilongwe', amount: 12000, date: '1 day ago' },
        { description: 'Minibus fare', amount: 5000, date: '3 days ago' },
      ]
    },
    {
      id: 'school',
      name: 'School Fees',
      icon: GraduationCap,
      color: '#3B82F6',
      budget: 100000,
      spent: 75000,
      transactions: [
        { description: 'Polytechnic fees', amount: 75000, date: '1 week ago' },
      ]
    },
    {
      id: 'food',
      name: 'Food & Drinks',
      icon: Coffee,
      color: '#EAB308',
      budget: 30000,
      spent: 19500,
      transactions: [
        { description: 'Restaurant dinner', amount: 8500, date: '2 days ago' },
        { description: 'Coffee & snacks', amount: 11000, date: '4 days ago' },
      ]
    },
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
      ]
    },
  ]);

  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  const [topics, setTopics] = useState({ english: [], chichewa: [] });

  useEffect(() => {
    const calculatedTotalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0);
    const calculatedTotalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
    setTotalBudget(calculatedTotalBudget);
    setTotalSpent(calculatedTotalSpent);
  }, [budgetCategories]);

  // Fetch financial literacy content from Firebase
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const englishSnapshot = await getDocs(collection(db, 'financialLiteracy', 'english', 'topics'));
        const chichewaSnapshot = await getDocs(collection(db, 'financialLiteracy', 'chichewa', 'topics'));

        const englishData = englishSnapshot.docs.map(doc => doc.data());
        const chichewaData = chichewaSnapshot.docs.map(doc => doc.data());

        setTopics({ english: englishData, chichewa: chichewaData });
      } catch (error) {
        console.log('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  const getBudgetStatus = (spent, budget) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) return { status: 'over', color: '#EF4444', bgColor: '#EF4444' };
    if (percentage >= 80) return { status: 'warning', color: '#EAB308', bgColor: '#EAB308' };
    return { status: 'safe', color: '#22C55E', bgColor: '#22C55E' };
  };

  const handleAddBudget = () => {
    if (newBudgetCategory && newBudgetAmount) {
      const newCategory = {
        id: Date.now().toString(),
        name: newBudgetCategory,
        icon: Home,
        color: '#6B7280',
        budget: parseFloat(newBudgetAmount),
        spent: 0,
        transactions: [],
      };
      setBudgetCategories([...budgetCategories, newCategory]);
      setNewBudgetCategory('');
      setNewBudgetAmount('');
    }
    setShowAddModal(false);
  };

  const handleEditBudget = (categoryId) => {
    console.log(`Editing budget for category: ${categoryId}`);
  };

  return (
    <ThemeProvider>
      {({ theme, colors, styles }) => {
        const dynamicStyles = getDynamicStyles(theme);
        return (
          <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
            {/* Header and Budget Summary remain unchanged */}

            {/* Budget Categories remain unchanged */}

            {/* Financial Literacy Library Card */}
            <View style={{ borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, backgroundColor: colors.primary, overflow: 'hidden' }}>
              <TouchableOpacity onPress={() => setLibraryExpanded(!libraryExpanded)} style={{ padding: 24 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                  <View style={{ width: 56, height: 56, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                    <BookOpen size={28} color={colors.primaryForeground} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.primaryForeground, fontSize: 18, fontWeight: '600', marginBottom: 4 }}>Financial Literacy Library</Text>
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>Learn about budgeting, saving & investments</Text>
                    <View style={{ marginTop: 8, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
                      <Text style={{ color: colors.primaryForeground }}>Available in English & Chichewa</Text>
                    </View>
                  </View>
                  <TrendingUp size={24} color={colors.primaryForeground} />
                </View>
              </TouchableOpacity>

              {libraryExpanded && (
                <Animated.View style={{ borderTopWidth: 1, borderTopColor: colors.border }}>
                  <View style={{ padding: 16, backgroundColor: colors.muted }}>
                    <View style={{ marginBottom: 16 }}>
                      <Text style={dynamicStyles.label}>Choose Language / Sankhani Chinenero</Text>
                      <Picker
                        selectedValue={language}
                        onValueChange={(itemValue) => setLanguage(itemValue)}
                        style={{ height: 50, backgroundColor: colors.inputBackground, borderRadius: 8, borderWidth: 1, borderColor: colors.border }}
                      >
                        <Picker.Item label="English" value="english" />
                        <Picker.Item label="Chichewa" value="chichewa" />
                      </Picker>
                    </View>

                    {topics[language]?.map((topic, index) => {
                      const isExpanded = expandedTopic === index;
                      const height = useSharedValue(0);
                      useEffect(() => {
                        height.value = withTiming(isExpanded ? 'auto' : 0, { duration: 300, easing: Easing.ease });
                      }, [isExpanded]);
                      const animatedStyle = useAnimatedStyle(() => ({ height: height.value, opacity: height.value > 0 ? 1 : 0, overflow: 'hidden' }));

                      return (
                        <View key={index} style={{ marginBottom: 16, borderRadius: 8, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
                          <TouchableOpacity onPress={() => setExpandedTopic(isExpanded ? null : index)} style={{ padding: 16 }}>
                            <Text style={dynamicStyles.h3}>{topic.title}</Text>
                          </TouchableOpacity>
                          <Animated.View style={animatedStyle}>
                            <Text style={[dynamicStyles.text, { padding: 16 }]}>{topic.content}</Text>
                          </Animated.View>
                        </View>
                      );
                    })}
                  </View>
                </Animated.View>
              )}
            </View>

            {/* Add Budget Modal remains unchanged */}

          </ScrollView>
        );
      }}
    </ThemeProvider>
  );
};

export default BudgetManagement;
