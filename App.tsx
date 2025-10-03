
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Toaster } from './Toaster';
import { Textarea } from './Textarea';
import { Toggle } from './Toggle';
import { useIsMobile } from './useMobile';
import { Switch } from './Switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from './Table';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip';
import Toast from 'react-native-toast-message';

const App: React.FC = () => {
  const isMobile = useIsMobile();
  const [income, setIncome] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Maize');
  const [tab, setTab] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(false);

  const handleAddTransaction = () => {
    Toast.show({
      type: 'success',
      text1: 'Transaction Added',
      text2: `Income: MWK ${income} | Category: ${expenseCategory}`,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TooltipProvider>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Malawi Budget App</Text>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Add Income</Text>
                <Tooltip>
                  <TooltipTrigger>
                    <Text style={styles.infoText}>Enter your income details</Text>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Text>Enter amount in MWK and select category</Text>
                  </TooltipContent>
                </Tooltip>
                <Textarea
                  placeholder="Enter income amount (MWK)"
                  value={income}
                  onChangeText={setIncome}
                  style={styles.textarea}
                />
                <Text style={styles.sectionTitle}>Select Category</Text>
                <ToggleGroup
                  type="single"
                  value={expenseCategory}
                  onValueChange={setExpenseCategory}
                >
                  <ToggleGroupItem value="Maize">Maize</ToggleGroupItem>
                  <ToggleGroupItem value="School Fees">School Fees</ToggleGroupItem>
                  <ToggleGroupItem value="Transport">Transport</ToggleGroupItem>
                  <ToggleGroupItem value="Airtime">Airtime</ToggleGroupItem>
                </ToggleGroup>
                <Toggle onPress={handleAddTransaction}>Add Transaction</Toggle>
              </View>
            </TabsContent>
            <TabsContent value="transactions">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2025-10-03</TableCell>
                    <TableCell>MWK 5000</TableCell>
                    <TableCell>Maize</TableCell>
                  </TableRow>
                </TableBody>
                <TableCaption>Recent Transactions</TableCaption>
              </Table>
            </TabsContent>
            <TabsContent value="budget">
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Budget Overview</Text>
                <Text>Current Balance: MWK 10,000</Text>
                <Text>Monthly Spending: MWK 7,500</Text>
              </View>
            </TabsContent>
          </Tabs>
          <View style={styles.switchContainer}>
            <Text>Offline Mode</Text>
            <Switch
              onCheckedChange={(checked) => {
                setIsOnline(checked);
                Toast.show({
                  type: 'info',
                  text1: checked ? 'Online Mode' : 'Offline Mode',
                });
              }}
              checked={isOnline}
            />
          </View>
        </ScrollView>
      </TooltipProvider>
      <Toaster />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  textarea: {
    marginVertical: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
});

export default App;