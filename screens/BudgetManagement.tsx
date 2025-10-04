
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, FlatList, Platform, ScrollView, Picker } from 'react-native';
import { Progress } from 'react-native-progress'; // Assuming installation of react-native-progress for Progress component
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated'; // For animations
import { ArrowLeft, Plus, ShoppingCart, Car, GraduationCap, Coffee, Home, AlertTriangle, CheckCircle, Edit3, TrendingUp, BookOpen } from 'react-native-vector-icons/Lucide'; // Assuming react-native-vector-icons with Lucide set up
import { ThemeProvider, getDynamicStyles } from '../styles/styles'; // From previous styles.js

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
      color: '#EF4444', // bg-red-500 equivalent
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
      color: '#F97316', // bg-orange-500
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
      color: '#3B82F6', // bg-blue-500
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
      color: '#EAB308', // bg-yellow-500
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
      color: '#6B7280', // bg-gray-500
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

  useEffect(() => {
    const calculatedTotalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0);
    const calculatedTotalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
    setTotalBudget(calculatedTotalBudget);
    setTotalSpent(calculatedTotalSpent);
  }, [budgetCategories]);

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
        icon: Home, // Default icon; can be customized later
        color: '#6B7280', // Default color
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
    // Placeholder for edit logic; can implement modal similar to add
    console.log(`Editing budget for category: ${categoryId}`);
    // For full functionality, add another modal/state for editing
  };

  const topics = {
    english: [
      {
        title: 'Budgeting Basics',
        content: `Budgeting is like planning a trip with your money. It's a simple way to decide where your hard-earned kwacha will go each month, so you don't run out before payday. Think of it as telling your money what to do, instead of wondering where it went.

Why Budget? In Malawi, many people have irregular incomes like from ganyu (piecework) or farming seasons. A budget helps you prepare for lean times, like during the dry season when crops aren't selling. It stops small expenses, like daily airtime top-ups or minibus fares, from adding up and leaving you broke.

How to Start:
1. List Your Income: Add up all money coming in, like salary, business sales, or tobacco harvest money. For example, if you earn MWK 50,000 from a small shop and MWK 20,000 from ganyu, your total is MWK 70,000.
2. Track Expenses: Write down everything you spend for a month. Categories like maize/food (MWK 20,000), school fees (MWK 10,000), rent (MWK 15,000), transport (MWK 5,000), airtime (MWK 3,000), and church offerings (MWK 2,000).
3. Set Limits: Decide how much for each category. Aim to spend less than you earn – save at least 10% if possible.
4. Use Tools: Our app helps with progress bars: green means you're good, yellow means watch out, red means stop spending!
5. Review Monthly: At month-end, see what worked. If you overspent on food, maybe buy in bulk next time.

Example: Mary from Blantyre budgets MWK 100,000 monthly. She allocates MWK 30,000 for food, MWK 20,000 for rent, MWK 10,000 for school, and saves MWK 10,000. By tracking, she avoids borrowing for emergencies.

Remember, budgeting isn't about denying yourself – it's about making smart choices for a better future, like saving for farm inputs during rainy season.`
      },
      {
        title: 'What Are Assets?',
        content: `From "Rich Dad Poor Dad" by Robert Kiyosaki, an asset is something that puts money in your pocket, while a liability takes money out. The rich buy assets to grow wealth, the poor buy liabilities thinking they're assets.

In simple terms, assets are things you own that make money for you over time, without you working every day. They build your wealth.

Examples in Malawi:
- A Small Business: Like a chigayo (maize mill) that earns daily fees.
- Rental Property: A small house in Lilongwe you rent out for MWK 100,000/month.
- Chickens or Goats: Livestock that multiplies and sells for profit.
- Savings Account: Earning interest, though low in Malawi (around 5-10%).

How Assets Work: You invest money or effort once, and it keeps giving back. For instance, buy seeds for MWK 5,000, grow maize, sell for MWK 15,000 – the profit is from your asset (farm plot).

Rich Dad Tip: Focus on buying assets first. Instead of a fancy phone (liability), invest in something that generates income, like starting a vegetable garden.

Plausible Malawi Example: John in Mzuzu uses MWK 50,000 to buy bicycle parts and starts a repair business. It becomes an asset earning MWK 10,000/week, allowing him to save for more tools.`
      },
      {
        title: 'What Are Liabilities?',
        content: `Again from "Rich Dad Poor Dad," liabilities are things that take money out of your pocket. They look nice but cost you ongoing.

Liabilities are debts or items that require money to maintain, reducing your wealth.

Examples in Malawi:
- Loans: Like a bank loan for a wedding, paying interest monthly.
- Fancy Car: Fuel, repairs, and insurance eat up money without earning.
- Credit for Airtime: Small but adds up with fees.
- Unused Land: If not farmed, it's a liability due to taxes or lost opportunity.

How They Work: You spend now, but pay more later. A MWK 100,000 loan at 20% interest means repaying MWK 120,000 – extra MWK 20,000 gone.

Rich Dad Tip: Minimize liabilities. The middle class buys them (big house, car) on credit, staying stuck. Rich use good debt (loans for assets like business) carefully.

Plausible Example: Anna borrows MWK 200,000 for a TV (liability). Monthly payments of MWK 25,000 strain her budget, preventing savings. Instead, she could have invested in a sewing machine to make clothes for sale (asset).`
      },
      {
        title: 'Investing in Malawi: Stocks and Treasury Bills',
        content: `Investing means putting money into something to grow it over time. In Malawi, options like stocks and treasury bills are safe ways to start, even for beginners. Borrow from "Rich Dad Poor Dad": Make money work for you by buying assets like investments.

Stocks: Shares in companies on the Malawi Stock Exchange (MSE). You own a tiny part of a business, earning from profits (dividends) or selling higher.

How Stocks Work in Malawi:
- MSE has companies like FDH Bank, NBM, or Illovo Sugar.
- Start: Contact a broker (like Stockbrokers Malawi), open an account, research companies.
- Buy low, sell high, or hold for dividends (e.g., 5-10% return).
- Risk: Prices fluctuate, but long-term growth possible.

Example: Invest MWK 100,000 in NICO shares. If value rises 20%, you gain MWK 20,000. Plus dividends like MWK 5,000/year.

Treasury Bills (T-Bills): Short-term loans to government via Reserve Bank of Malawi (RBM). Safe, as government backs them.

How T-Bills Work:
- Terms: 91, 182, or 364 days.
- Buy at discount: Pay MWK 90,000 for a MWK 100,000 bill, get MWK 100,000 at maturity – MWK 10,000 profit (interest).
- Auction via banks or directly; minimum MWK 10,000.
- Rates: Around 15-25% (check RBM site), low risk.

Example: Farmer buys 182-day T-bill with MWK 50,000 harvest money. At 20% rate, gets back MWK 55,000 – uses extra for seeds.

Rich Dad Tip: Investments are assets if they generate income. Start small, learn, diversify. In Malawi, combine with local like farming for balanced portfolio.

Benefits: Beat inflation (high in Malawi), build wealth without daily work. Always research or consult experts – no quick riches.`
      }
    ],
    chichewa: [
      {
        title: 'Zoyambira za Bajeti',
        content: `Bajeti ndi ngati kukonzekera ulendo ndi ndalama zanu. Ndi njira yosavuta yosankhira komwe ndalama zanu zolimbikira zidzapita mwezi uliwonse, kuti musathe kutha musanafike tsiku lolipira. Ganizirani ngati kuwuza ndalama zanu zoyenera kuchita, m'malo modabwa komwe zidapita.

Chifukwa Chiyani Bajeti? Ku Malawi, anthu ambiri amakhala ndi ndalama zosakhazikika ngati za ganyu kapena zaulimi. Bajeti imakuthandizani kukonzekera nthawi zovuta, ngati nyengo yowuma pomwe mbewu sizikugulitsidwa. Imaletsa zolipira zazing'ono, ngati kulipira airtime tsiku lililonse kapena minibus, kuti zisawonjezeke ndi kukusiyani opanda ndalama.

Momwe Muyambire:
1. Lembani Ndalama Zanu: Onjezani ndalama zonse zolowa, ngati malipiro, malonda a bizinesi, kapena ndalama za fodya. Mwachitsanzo, ngati mumapeza MWK 50,000 kuchokera ku shopu yaying'ono ndi MWK 20,000 za ganyu, zonse zidzakhala MWK 70,000.
2. Tsatirani Zolipira: Lembani zonse zomwe mumawononga kwa mwezi. Magulu ngati chimanga/chakudya (MWK 20,000), sukulu (MWK 10,000), lendi (MWK 15,000), mayendedwe (MWK 5,000), airtime (MWK 3,000), ndi zopereka za tchalitchi (MWK 2,000).
3. Khazikitsani Malire: Sankhani zolipira pa gulu lililonse. Lolani kuti muwononge zochepa kuposa zomwe mumapeza – sungani osachepera 10% ngati zotheka.
4. Gwiritsani Ntchito Zida: App yathu imakuthandizani ndi mabala a patsogolo: wobiriwira akutanthauza mabwino, wachikasu akutanthauza chenjerani, wofiira akutanthauza siyani kuwononga!
5. Onaninso Mwezi Uliwonse: Pamapeto pa mwezi, onani zomwe zinayenda. Ngati mawononga kwambiri pa chakudya, mwina gulani zambiri nthawi ina.

Chitsanzo: Mary wa ku Blantyre amakonza bajeti ya MWK 100,000 mwezi uliwonse. Amapereka MWK 30,000 pa chakudya, MWK 20,000 pa lendi, MWK 10,000 pa sukulu, ndi kusunga MWK 10,000. Potsatira, amapewa kubwereka pa mavuto.

Kumbukirani, bajeti siyoletsana nokha – ndi za kusankha mwanzeru kuti mtsogolo likhale labwino, ngati kusunga za mbewu pa nyengo yamvula.`
      },
      {
        title: 'Kodi Katundu Ndi Chiyani?',
        content: `Kuchokera mu "Rich Dad Poor Dad" la Robert Kiyosaki, katundu ndi chinthu chomwe chimayika ndalama m'thumba lanu, pomwe ngongole imachotsa ndalama. Olemera amagula katundu kuti akulitse chuma, osauka amagula ngongole akuganiza kuti ndi katundu.

Mwachidule, katundu ndi zinthu zomwe muli nazo zomwe zimakupangirani ndalama pakapita nthawi, popanda kugwira ntchito tsiku lililonse. Zimakukulitsani chuma chanu.

Zitsanzo ku Malawi:
- Bizinesi Yaing'ono: Ngati chigayo chomwe chimapeza ndalama tsiku lililonse.
- Nyumba Yobwereketsa: Nyumba yaing'ono ku Lilongwe yomwe mumabwereketsa MWK 20,000/mwezi.
- Nkhuku kapena Mbuzi: Ziweto zomwe zimachulukana ndi kugulitsidwa kwa phindu.
- Akaunti Yosunga: Yopeza chiwongola dzanja, ngakhale chochepa ku Malawi (pafupifupi 5-10%).

Momwe Katundu Amagwirira Ntchito: Mumayika ndalama kapena khama kamodzi, ndipo zimabweretsa mosalekeza. Mwachitsanzo, gulani mbewu za MWK 5,000, kulima chimanga, gulitsani za MWK 15,000 – phindu limachokera ku katundu wanu (munda).

Chenjezo la Rich Dad: Yang'anani kugula katundu choyamba. M'malo mogula foni yapamwamba (ngongole), ikani ndalama mu chinthu chomwe chimabweretsa ndalama, ngati kuyambitsa dimba la masamba.

Chitsanzo Cha Ku Malawi: John wa ku Mzuzu amagwiritsa ntchito MWK 50,000 kugula zida za njinga ndikuyambitsa bizinesi yokonza. Imakhala katundu yopeza MWK 10,000/sabata, kumulola kusunga zida zambiri.`
      },
      {
        title: 'Kodi Ngongole Ndi Chiyani?',
        content: `Kachinso kuchokera mu "Rich Dad Poor Dad," ngongole ndi zinthu zomwe zimachotsa ndalama m'thumba lanu. Zimawoneka bwino koma zimakutengerani mosalekeza.

Ngongole ndi ngongole kapena zinthu zomwe zimafuna ndalama kuti zisamalidwe, zochepetsa chuma chanu.

Zitsanzo ku Malawi:
- Ngongole: Ngati ngongole ya banki ya ukwati, kulipira chiwongola dzanja mwezi uliwonse.
- Galimoto Yapamwamba: Mafuta, kukonza, ndi inshuwalansi zimadya ndalama popanda kupeza.
- Ngongole ya Airtime: Yaing'ono koma imawonjezera ndi zolipira.
- Malo Osagwiritsidwa Ntchito: Ngati osalimapo, ndi ngongole chifukwa cha misonkho kapena kutayika kwa mwayi.

Momwe Zimayendera: Mumawononga tsopano, koma mulipire zambiri pambuyo pake. Ngongole ya MWK 100,000 pa 20% chiwongola dzanja imatanthauza kubweza MWK 120,000 – zowonjezera MWK 20,000 zapita.

Chenjezo la Rich Dad: Chepetsani ngongole. Anthu apakati amagula (nyumba yaikulu, galimoto) pa ngongole, akukhalabe otsekera. Olemera amagwiritsa ntchito ngongole yabwino (ngongole za katundu ngati bizinesi) mosamala.

Chitsanzo: Anna abwereka MWK 200,000 pa TV (ngongole). Zolipira za MWK 25,000 mwezi uliwonse zimamuvutitsa bajeti, kulepheretsa kusunga. M'malo mwake, akanatha kuyika mu makina osokera kuti apange zovala zogulitsa (katundu).`
      },
      {
        title: 'Kuyika Ndalama ku Malawi: Zogulitsa ndi Zobwereka za Boma',
        content: `Kuyika ndalama kumatanthauza kuyika ndalama mu chinthu kuti chikule pakapita nthawi. Ku Malawi, zosankha ngati zogulitsa ndi zobwereka za boma ndi njira zotetezeka zoyambira, ngakhale kwa oyamba.

Zogulitsa: Zigawo mu makampani pa Malawi Stock Exchange (MSE). Muli ndi gawo laling'ono la bizinesi, kupeza kuchokera ku phindu (zobweza) kapena kugulitsa pamtengo wapamwamba.

Momwe Zogulitsa Zimayendera ku Malawi:
- MSE ili ndi makampani ngati FDH Bank, NBM, kapena Illovo Sugar.
- Yambani: Lumikizanani ndi broker (ngati Stockbrokers Malawi), tsegulani akaunti, fufuzani makampani.
- Gulani zotsika, gulitsani zapamwamba, kapena sungani za zobweza (mwachitsanzo, 5-10% kubweza).
- Chiopsa: Mitengo imasintha, koma kukula kwanthawi yayitali kotheka.

Chitsanzo: Ikani MWK 100,000 mu zigawo za NICO. Ngati mtengo ukukwera 20%, mupeza MWK 20,000. Kuphatikiza zobweza ngati MWK 5,000/chaka.

Zobwereka za Boma (T-Bills): Ngongole zanthawi yayifupi kwa boma kudzera mu Reserve Bank of Malawi (RBM). Zotetezeka, chifukwa boma limazibweza.

Momwe T-Bills Zimayendera:
- Nthawi: 91, 182, kapena 364 masiku.
- Gulani pa chepera: Lipirani MWK 90,000 pa bili ya MWK 100,000, pezani MWK 100,000 pakutha – phindu la MWK 10,000 (chiwongola dzanja).
- Kugulitsa kudzera mu mabanki kapena mwachindunji; osachepera MWK 10,000.
- Mitengo: Pafupifupi 15-25% (onani pa RBM), chiopsa chochepa.

Chitsanzo: Mlimi amagula T-bill ya 182 masiku ndi ndalama za zokolola za MWK 50,000. Pa 20% mitengo, amabwerera MWK 55,000 – amagwiritsa ntchito zowonjezera pa mbewu.

Chenjezo la Rich Dad: Zoyika ndalama ndi katundu ngati zimabweretsa ndalama. Yambani yaing'ono, phunzirani, sankhani zosiyana. Ku Malawi, phatikizani ndi zaulimi kuti likhale bwino.

Zabwino: Gonjetsani inflation (yokwera ku Malawi), kulitsa chuma popanda ntchito tsiku lililonse. Nthawi zonse fufuzani kapena funsani akatswiri – palibe chuma chofulumira.`
      }
    ]
  };

  return (
    <ThemeProvider>
      {({ theme, colors, styles }) => {
        const dynamicStyles = getDynamicStyles(theme);
        return (
          <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
            {/* Header */}
            <View style={{ backgroundColor: colors.primary, padding: 24, paddingTop: Platform.OS === 'ios' ? 60 : 48, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={onBack} style={{ marginRight: 16 }}>
                    <ArrowLeft size={24} color={colors.primaryForeground} />
                  </TouchableOpacity>
                  <Text style={{ color: colors.primaryForeground, fontSize: 20 }}>Budget Management</Text>
                </View>
                <TouchableOpacity onPress={() => setShowAddModal(true)} style={{ width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                  <Plus size={20} color={colors.primaryForeground} />
                </TouchableOpacity>
              </View>

              {/* Overall Budget Summary */}
              <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 24 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <View>
                    <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Monthly Budget</Text>
                    <Text style={{ color: colors.primaryForeground, fontSize: 24 }}>MWK {totalBudget.toLocaleString()}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Spent</Text>
                    <Text style={{ color: colors.primaryForeground, fontSize: 24 }}>MWK {totalSpent.toLocaleString()}</Text>
                  </View>
                </View>
                
                <View style={{ marginBottom: 8 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
                    <Text>Progress</Text>
                    <Text>{Math.round((totalSpent / totalBudget) * 100)}%</Text>
                  </View>
                  <Progress.Bar 
                    progress={(totalSpent / totalBudget)} 
                    width={null} 
                    height={8} 
                    color={colors.primary} 
                    unfilledColor='rgba(255,255,255,0.2)' 
                    borderWidth={0}
                  />
                </View>
                
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
                  Remaining: MWK {(totalBudget - totalSpent).toLocaleString()}
                </Text>
              </View>
            </View>

            <View style={{ padding: 24, gap: 16 }}>
              {/* Budget Categories */}
              <FlatList
                data={budgetCategories}
                keyExtractor={(item) => item.id}
                renderItem={({ item: category }) => {
                  const Icon = category.icon;
                  const percentage = (category.spent / category.budget) * 100;
                  const status = getBudgetStatus(category.spent, category.budget);
                  const isExpanded = expandedCategory === category.id;
                  const height = useSharedValue(0);

                  useEffect(() => {
                    height.value = withTiming(isExpanded ? 'auto' : 0, { duration: 300, easing: Easing.ease });
                  }, [isExpanded]);

                  const animatedStyle = useAnimatedStyle(() => ({
                    height: height.value,
                    opacity: height.value > 0 ? 1 : 0,
                  }));

                  return (
                    <View style={{ borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, backgroundColor: colors.card }}>
                      <TouchableOpacity 
                        onPress={() => setExpandedCategory(isExpanded ? null : category.id)}
                        style={{ padding: 16 }}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                          <View style={{ width: 48, height: 48, backgroundColor: category.color, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon size={24} color="#FFFFFF" />
                          </View>
                          
                          <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                              <Text style={{ color: colors.foreground }}>{category.name}</Text>
                              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                {status.status === 'over' && <AlertTriangle size={16} color={status.color} />}
                                {status.status === 'safe' && <CheckCircle size={16} color={status.color} />}
                                <Text style={{ fontSize: 12, color: status.color }}>
                                  {Math.round(percentage)}%
                                </Text>
                              </View>
                            </View>
                            
                            <Progress.Bar 
                              progress={Math.min(percentage / 100, 1)} 
                              width={null} 
                              height={8} 
                              color={status.bgColor} 
                              unfilledColor={colors.muted} 
                              borderWidth={0}
                            />
                            
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', fontSize: 12, color: colors.mutedForeground, marginTop: 8 }}>
                              <Text>MWK {category.spent.toLocaleString()} spent</Text>
                              <Text>MWK {category.budget.toLocaleString()} budget</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>

                      {isExpanded && (
                        <Animated.View style={[animatedStyle, { borderTopWidth: 1, borderTopColor: colors.border }]}>
                          <View style={{ padding: 16, backgroundColor: colors.muted }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                              <Text style={{ fontSize: 14 }}>Recent Transactions</Text>
                              <TouchableOpacity onPress={() => handleEditBudget(category.id)} style={{ flexDirection: 'row', alignItems: 'center', color: colors.primary }}>
                                <Edit3 size={14} color={colors.primary} />
                                <Text style={{ marginLeft: 4, color: colors.primary }}>Edit Budget</Text>
                              </TouchableOpacity>
                            </View>
                            
                            <FlatList
                              data={category.transactions}
                              keyExtractor={(_, index) => index.toString()}
                              renderItem={({ item: transaction }) => (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
                                  <View>
                                    <Text style={{ fontSize: 14, color: colors.foreground }}>{transaction.description}</Text>
                                    <Text style={{ fontSize: 12, color: colors.mutedForeground }}>{transaction.date}</Text>
                                  </View>
                                  <Text style={{ fontSize: 14, color: '#EF4444' }}>
                                    -MWK {transaction.amount.toLocaleString()}
                                  </Text>
                                </View>
                              )}
                            />
                            
                            <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border }}>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', fontSize: 14 }}>
                                <Text style={{ color: colors.mutedForeground }}>Remaining:</Text>
                                <Text style={{ color: category.budget - category.spent < 0 ? '#EF4444' : '#22C55E' }}>
                                  MWK {(category.budget - category.spent).toLocaleString()}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </Animated.View>
                      )}
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
              />

              {/* Financial Literacy Library Card */}
              <View style={{ borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, backgroundColor: colors.primary, overflow: 'hidden' }}>
                <TouchableOpacity 
                  onPress={() => setLibraryExpanded(!libraryExpanded)}
                  style={{ padding: 24 }}
                >
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

                      {topics[language].map((topic, index) => {
                        const isExpanded = expandedTopic === index;
                        const height = useSharedValue(0);

                        useEffect(() => {
                          height.value = withTiming(isExpanded ? 'auto' : 0, { duration: 300, easing: Easing.ease });
                        }, [isExpanded]);

                        const animatedStyle = useAnimatedStyle(() => ({
                          height: height.value,
                          opacity: height.value > 0 ? 1 : 0,
                          overflow: 'hidden',
                        }));

                        return (
                          <View key={index} style={{ marginBottom: 16, borderRadius: 8, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
                            <TouchableOpacity 
                              onPress={() => setExpandedTopic(isExpanded ? null : index)}
                              style={{ padding: 16 }}
                            >
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
            </View>

            {/* Add Budget Modal */}
            <Modal
              visible={showAddModal}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setShowAddModal(false)}
            >
              <TouchableOpacity 
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} 
                activeOpacity={1}
                onPress={() => setShowAddModal(false)}
              >
                <View 
                  style={{ backgroundColor: colors.background, width: '100%', maxWidth: 480, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 }}
                  onStartShouldSetResponder={() => true}
                >
                  <View style={{ width: 48, height: 4, backgroundColor: colors.muted, borderRadius: 2, alignSelf: 'center', marginBottom: 24 }} />
                  
                  <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 24 }}>Add New Budget</Text>
                  
                  <View style={{ gap: 16 }}>
                    <View>
                      <Text style={{ fontSize: 14, color: colors.mutedForeground, marginBottom: 8 }}>Category Name</Text>
                      <TextInput
                        placeholder="e.g., Entertainment"
                        value={newBudgetCategory}
                        onChangeText={setNewBudgetCategory}
                        style={{ height: 48, borderRadius: 12, borderWidth: 2, borderColor: colors.border, padding: 12, backgroundColor: colors.inputBackground }}
                      />
                    </View>
                    
                    <View>
                      <Text style={{ fontSize: 14, color: colors.mutedForeground, marginBottom: 8 }}>Monthly Budget Amount</Text>
                      <TextInput
                        placeholder="e.g., 50000"
                        value={newBudgetAmount}
                        onChangeText={setNewBudgetAmount}
                        keyboardType="numeric"
                        style={{ height: 48, borderRadius: 12, borderWidth: 2, borderColor: colors.border, padding: 12, backgroundColor: colors.inputBackground }}
                      />
                    </View>
                    
                    <View style={{ flexDirection: 'row', gap: 12, paddingTop: 16 }}>
                      <TouchableOpacity 
                        onPress={() => setShowAddModal(false)}
                        style={{ flex: 1, height: 48, borderRadius: 12, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' }}
                      >
                        <Text>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={handleAddBudget}
                        disabled={!newBudgetCategory || !newBudgetAmount}
                        style={{ flex: 1, height: 48, backgroundColor: colors.primary, borderRadius: 12, justifyContent: 'center', alignItems: 'center', opacity: (!newBudgetCategory || !newBudgetAmount) ? 0.5 : 1 }}
                      >
                        <Text style={{ color: colors.primaryForeground }}>Add Budget</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Modal>
          </ScrollView>
        );
      }}
    </ThemeProvider>
  );
};

export default BudgetManagement;