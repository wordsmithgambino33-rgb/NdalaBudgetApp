
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, FlatList, Platform, ScrollView, Picker, Image } from 'react-native';
import { Progress } from 'react-native-progress'; // For linear and circular progress
import DateTimePicker from '@react-native-community/datetimepicker'; // For date selection
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { ArrowLeft, Plus, Target, GraduationCap, Car, Home, Plane, Calendar, TrendingUp, Check, Edit3 } from 'react-native-vector-icons/Lucide';
import { ThemeProvider, getDynamicStyles } from '../styles/styles';

const GoalsSaving = ({ onBack }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalDate, setNewGoalDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [guideExpanded, setGuideExpanded] = useState(false);
  const [language, setLanguage] = useState('english');
  const [expandedTopic, setExpandedTopic] = useState(null);

  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Emergency Fund',
      target: 1000000,
      saved: 285000,
      icon: Target,
      color: '#22C55E', // bg-green-500
      deadline: '2024-12-31',
      weeklyTarget: 25000,
      category: 'Safety'
    },
    {
      id: 2,
      name: 'School Fees Next Semester',
      target: 500000,
      saved: 150000,
      icon: GraduationCap,
      color: '#3B82F6', // bg-blue-500
      deadline: '2024-11-30',
      weeklyTarget: 15000,
      category: 'Education'
    },
    {
      id: 3,
      name: 'New Motorcycle',
      target: 800000,
      saved: 320000,
      icon: Car,
      color: '#A855F7', // bg-purple-500
      deadline: '2025-03-15',
      weeklyTarget: 20000,
      category: 'Transport'
    },
    {
      id: 4,
      name: 'House Down Payment',
      target: 2000000,
      saved: 450000,
      icon: Home,
      color: '#F97316', // bg-orange-500
      deadline: '2025-12-31',
      weeklyTarget: 35000,
      category: 'Housing'
    },
    {
      id: 5,
      name: 'Holiday to Cape Town',
      target: 300000,
      saved: 180000,
      icon: Plane,
      color: '#14B8A6', // bg-teal-500
      deadline: '2024-12-15',
      weeklyTarget: 10000,
      category: 'Travel'
    }
  ]);

  const [totalSavings, setTotalSavings] = useState(0);
  const [totalTargets, setTotalTargets] = useState(0);

  useEffect(() => {
    const calculatedTotalSavings = goals.reduce((sum, goal) => sum + goal.saved, 0);
    const calculatedTotalTargets = goals.reduce((sum, goal) => sum + goal.target, 0);
    setTotalSavings(calculatedTotalSavings);
    setTotalTargets(calculatedTotalTargets);
  }, [goals]);

  const getWeeksRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.max(0, diffWeeks);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return '#22C55E'; // green
    if (percentage >= 50) return '#EAB308'; // yellow
    return '#EF4444'; // red
  };

  const handleAddGoal = () => {
    if (newGoalName && newGoalAmount && newGoalDate) {
      const newId = goals.length + 1;
      const formattedDate = newGoalDate.toISOString().split('T')[0];
      const newGoal = {
        id: newId,
        name: newGoalName,
        target: parseFloat(newGoalAmount),
        saved: 0,
        icon: Target, // Default icon
        color: '#22C55E', // Default color
        deadline: formattedDate,
        weeklyTarget: parseFloat(newGoalAmount) / getWeeksRemaining(formattedDate), // Auto-calculate
        category: 'Custom'
      };
      setGoals([...goals, newGoal]);
      resetModal();
    }
  };

  const handleEditGoal = () => {
    if (editingGoal && newGoalName && newGoalAmount && newGoalDate) {
      const formattedDate = newGoalDate.toISOString().split('T')[0];
      const updatedGoals = goals.map(goal =>
        goal.id === editingGoal.id
          ? { ...goal, name: newGoalName, target: parseFloat(newGoalAmount), deadline: formattedDate, weeklyTarget: parseFloat(newGoalAmount) / getWeeksRemaining(formattedDate) }
          : goal
      );
      setGoals(updatedGoals);
      resetModal();
    }
  };

  const resetModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingGoal(null);
    setNewGoalName('');
    setNewGoalAmount('');
    setNewGoalDate(new Date());
  };

  const openEditModal = (goal) => {
    setEditingGoal(goal);
    setNewGoalName(goal.name);
    setNewGoalAmount(goal.target.toString());
    setNewGoalDate(new Date(goal.deadline));
    setShowEditModal(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || newGoalDate;
    setShowDatePicker(Platform.OS === 'ios');
    setNewGoalDate(currentDate);
  };

  const topics = {
    english: [
      {
        title: 'Why Goal-Based Saving Works in Malawi',
        content: `Goal-based saving is like setting a clear path for your money to reach something important in your life. Instead of just saving without a plan, you decide on a specific goal like buying seeds for the next planting season or paying school fees and work towards it step by step. This approach makes saving feel exciting and achievable, especially in Malawi where incomes can be irregular from farming, ganyu (piecework), or small businesses. It is about turning your dreams into reality without getting overwhelmed.

In our budgeting app, this feature helps you set a target amount and date, then suggests weekly or monthly savings based on your income. For example, if you are saving MWK 50,000 for farm inputs over 3 months, the app might recommend putting aside MWK 4,000 per week. Progress bars show how close you are, turning red if you are falling behind. This guide draws from simple financial ideas, including tips from "Rich Dad Poor Dad" by Robert Kiyosaki, where saving is seen as building assets that work for you. 

Malawi's economy means many people deal with seasonal incomes (like tobacco harvests) or unexpected costs (like ESCOM bills or minibus fares). Without goals, money slips away on small things like airtime or church offerings. Goal-based saving helps you prioritize like saving for a motorcycle to transport goods to market or for your child's uniform. Studies show using "lockboxes" (separate savings pots) for each goal increases savings by keeping money focused. Automatic plans or reminders can boost savings too, especially for irregular earners.

From "Rich Dad Poor Dad": Treat saving as a "must-pay" expense. The rich make a surplus (extra money) into an automatic saving, like paying yourself first before bills. This builds wealth over time, turning savings into assets like a small plot of land that generates income.`
      },
      {
        title: 'Step-by-Step Guide to Start Goal-Based Saving',
        content: `1. Define Your Goal Clearly: Pick something specific and realistic. Ask: What do I want? How much? By when? Make it personal saving for emergencies is good, but "Save MWK 100,000 for a new roof before rainy season" is better.

Example: A farmer in Mzuzu wants to save MWK 30,000 for fertilizer by December. This ties to the planting season, making it urgent.

2. Calculate What You Need: Break it down. Total goal divided by months equals monthly saving. Factor in inflation (currently around 28% in Malawi), so add a buffer.

Example: For MWK 50,000 school fees in 6 months, save MWK 8,333 per month. If income is irregular, aim for lump sums after harvest.

3. Choose Saving Tools: Use simple methods like separate envelopes (lockboxes) for each goal. In the app, create virtual "pots." For better returns, consider bank savings (average 4.27% interest) or Treasury Bills (rates around 15-25%, safe and government-backed).

Rich Dad Tip: View savings as an investment in assets. Deferred payments (save part of ganyu now for later) build discipline.

4. Track and Adjust: Use progress visuals like thermometers to stay motivated. Review monthly if off track, cut non-essentials like extra airtime.

Example: Anna in Blantyre saves MWK 5,000 per week from her shop for a sewing machine (MWK 200,000 goal). She uses app reminders and locks away cash to avoid temptation.

5. Overcome Challenges: For irregular income, save windfalls (e.g., tobacco sales) first. Use rules like "Save 20% of every payment." Beat high inflation by choosing T-bills over low-interest savings.`
      },
      {
        title: 'Plausible Malawian Examples',
        content: `Farming Family: The Chiwembu family in Nkhotakota saves MWK 40,000 for seeds and fertilizer over 4 months. They use deferred ganyu payments save half now, get the rest later to build the fund. By investing in T-bills (earning ~20%), they add extra interest, turning savings into growth.

Urban Worker: James, a minibus driver in Lilongwe, goals MWK 150,000 for school fees by June. He sets app reminders to save MWK 5,000 per week from fares, using a bank savings account for safety. Inspired by Rich Dad, he views this as buying an "asset" in his child's education.`
      },
      {
        title: 'Tips to Stay Motivated',
        content: `Start small: Even MWK 1,000 per week adds up.
Celebrate milestones: Color in a thermometer chart when you hit 25%.
Avoid temptations: Use app locks or physical boxes.
Beat inflation: With 28% inflation, opt for T-bills over basic savings.

This guide fits our app's offline-first design track goals locally, sync later. For more, check the Financial Literacy section!`
      }
    ],
    chichewa: [
      {
        title: 'Kodi Kusunga Ndalama Koyendetsedwa ndi Cholinga Kumayenda Bwanji ku Malawi',
        content: `Kusunga ndalama koyendetsedwa ndi cholinga ndi ngati kukhazikitsa njira yomveka bwino ya ndalama zanu kuti zifike pa chinthu chofunika kwambiri mu moyo wanu. M'malo mongosunga popanda pulani, mumasankha cholinga chomveka bwino ngati kugula mbewu za nyengo yobzala yotsatira kapena kulipira sukulu ndi kugwira ntchito pang'onopang'ono. Njirayi imapanga kusunga kukhala kosangalatsa komanso kotheka, makamaka ku Malawi komwe ndalama zimatha kukhala zosakhazikika kuchokera ku ulimi, ganyu (ntchito yaing'ono), kapena mabizinesi aang'ono. Ndi za kusintha maloto anu kukhala zenizeni popanda kuvutika.

Mu app yathu ya bajeti, izi zimakuthandizani kukhazikitsa chiwerengero cha ndalama ndi tsiku, kenako zimapereka malingaliro a kusunga sabata kapena mwezi potengera ndalama zanu. Mwachitsanzo, ngati mukusunga MWK 50,000 za zinthu zaulimi m'miyezi 3, app ingapereke lingaliro la kusunga MWK 4,000 pa sabata. Mabala a patsogolo akuwonetsa komwe muli pafupi, kusintha kukhala kofiira ngati mubwerera mmbuyo. Buku ili limatenga malingaliro osavuta a zachuma, kuphatikiza malangizo kuchokera mu "Rich Dad Poor Dad" la Robert Kiyosaki, komwe kusunga kumaonedwa ngati kukulitsa katundu yemwe amakugwirirani ntchito.

Chuma cha Malawi chimatanthauza kuti anthu ambiri amavutika ndi ndalama za nyengo (ngati zokolola za fodya) kapena zolipira zosayembekezereka (ngati bili za ESCOM kapena minibus). Popanda zolinga, ndalama zimathera pa zinthu zazing'ono ngati airtime kapena zopereka za tchalitchi. Kusunga koyendetsedwa ndi cholinga kumakuthandizani kuyika patsogolo ngati kusunga za njinga yamoto yonyamulira katundu ku msika kapena yunifomu ya mwana wanu. Kafukufuku akuwonetsa kugwiritsa ntchito "mabokosi otsekera" (zotengera zosiyana za kusunga) pa cholinga chilichonse kumawonjezera kusunga popanga ndalama kukhala zokhazikika. Mapulani odziwikiratu kapena zikumbutso zimathandiza kusunga, makamaka kwa opeza mosakhazikika.

Kuchokera mu "Rich Dad Poor Dad": Ganizirani kusunga ngati "zolipira zofunika". Olemera amapanga zowonjezera (ndalama zowonjezera) kukhala kusunga kodziwikiratu, ngati kulipira nokha choyamba musanalipire bili. Izi zimakulitsa chuma pakapita nthawi, kusintha kusunga kukhala katundu ngati malo ang'ono omwe amabweretsa ndalama.`
      },
      {
        title: 'Njira Zoyambira Kusunga Ndalama Koyendetsedwa ndi Cholinga',
        content: `1. Fotokozani Cholinga Chanu Momveka Bwino: Sankhani chinthu chomveka bwino komanso chotheka. Funsani: Ndikufuna chiyani? Zochuluka bwanji? Pofika liti? Pangani chanu kusunga za mavuto ndi bwino, koma "Sungani MWK 100,000 za denga latsopano mvula isanayambe" ndi labwino kwambiri.

Chitsanzo: Mlimi wa ku Mzuzu akufuna kusunga MWK 30,000 za feteleza pofika Disembala. Izi zimakhudzana ndi nyengo ya kubzala, zimapanga kukhala kofunika kwambiri.

2. Werengani Zomwe Mukufuna: Gawani. Zonse za cholinga gawani ndi miyezi zofanana ndi kusunga mwezi uliwonse. Onjezerani inflation (pakali pano pafupifupi 28% ku Malawi), choncho onjezerani chitetezo.

Chitsanzo: Pa MWK 50,000 za sukulu m'miyezi 6, sungani MWK 8,333 pa mwezi. Ngati ndalama sizikhazikika, lolani zochuluka pambuyo pa zokolola.

3. Sankhani Zida Zokusungira: Gwiritsani ntchito njira zosavuta ngati maenvulopu osiyana (mabokosi otsekera) pa cholinga chilichonse. Mu app, pangani "zotengera" zowoneka. Kuti mupeze zabwino, ganizirani kusunga mu banki (pafupifupi 4.27% chiwongola dzanja) kapena Treasury Bills (mitengo pafupifupi 15-25%, yotetezeka komanso yobweza boma).

Chenjezo la Rich Dad: Onani kusunga ngati kuyika ndalama mu katundu. Kubweza zolipira (sungani gawo la ganyu tsopano kuti mupite pambuyo pake) kumakulitsa chitsanzo.

4. Tsatirani ndi Kusintha: Gwiritsani ntchito zithunzi za patsogolo ngati ma thermometer kuti mukhale osangalala. Onaninso mwezi uliwonse ngati mwalakwira, chepetsani zosafunika ngati airtime yowonjezera.

Chitsanzo: Anna wa ku Blantyre amasunga MWK 5,000 pa sabata kuchokera ku shopu yake za makina osokera (cholinga cha MWK 200,000). Amagwiritsa ntchito zikumbutso za app ndi kutsekera ndalama kuti asayese.

5. Gonjetsani Zovuta: Pa ndalama zosakhazikika, sungani zowonjezera (mwachitsanzo, malonda a fodya) choyamba. Gwiritsani ntchito malamulo ngati "Sungani 20% pa zolipira zilizonse." Gonjetsani inflation yokwera posankha T-bills kuposa kusunga kochepa chiwongola dzanja.`
      },
      {
        title: 'Zitsanzo Zotheka za Amalawi',
        content: `Banja la Alimi: Banja la Chiwembu la ku Nkhotakota limasunga MWK 40,000 za mbewu ndi feteleza m'miyezi 4. Amagwiritsa ntchito kubweza ganyu sungani theka tsopano, pezani zotsala pambuyo pake kuti apange ndalama. Poyika mu T-bills (kupeza ~20%), amawonjezera chiwongola dzanja, kusintha kusunga kukhala kukula.

Wogwira Ntchito M'tauni: James, woyendetsa minibus ku Lilongwe, amalola MWK 150,000 za sukulu pofika Juni. Amakhazikitsa zikumbutso za app kusunga MWK 5,000 pa sabata kuchokera ku zolipira, kugwiritsa ntchito akaunti ya banki yotetezeka. Wolimbikitsidwa ndi Rich Dad, amaona izi ngati kugula "katundu" mu maphunziro a mwana wake.`
      },
      {
        title: 'Malangizo Okhalira Olimbikitsidwa',
        content: `Yambani yaing'ono: Ngakhale MWK 1,000 pa sabata imawonjezera.
Kondwererani zopambana: Paka mtundu mu chati cha thermometer mukafika 25%.
Pewani zoyesa: Gwiritsani ntchito zotsekera za app kapena mabokosi enieni.
Gonjetsani inflation: Ndi 28% inflation, sankhani T-bills kuposa kusunga wamba.

Buku ili likugwirizana ndi mapangidwe a app yathu ya offline-first tsatirani zolinga mdera lanu, sync pambuyo pake. Kwa zambiri, onani gawo la Financial Literacy!`
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
                  <Text style={{ color: colors.primaryForeground, fontSize: 20, fontFamily: 'Poppins' }}>Goals & Saving</Text>
                </View>
                <TouchableOpacity onPress={() => setShowAddModal(true)} style={{ width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                  <Plus size={20} color={colors.primaryForeground} />
                </TouchableOpacity>
              </View>

              {/* Overall Progress */}
              <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 24 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <View>
                    <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Total Saved</Text>
                    <Text style={{ color: colors.primaryForeground, fontSize: 24, fontFamily: 'Poppins' }}>MWK {totalSavings.toLocaleString()}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Total Goals</Text>
                    <Text style={{ color: colors.primaryForeground, fontSize: 24, fontFamily: 'Poppins' }}>MWK {totalTargets.toLocaleString()}</Text>
                  </View>
                </View>
                
                <View style={{ marginBottom: 8 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
                    <Text style={{ fontSize: 12 }}>Overall Progress</Text>
                    <Text style={{ fontSize: 12 }}>{Math.round((totalSavings / totalTargets) * 100)}%</Text>
                  </View>
                  <Progress.Bar 
                    progress={totalSavings / totalTargets} 
                    width={null} 
                    height={8} 
                    color={colors.primary} 
                    unfilledColor='rgba(255,255,255,0.2)' 
                    borderWidth={0}
                  />
                </View>
                
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
                  {goals.filter(goal => (goal.saved / goal.target) >= 1).length} of {goals.length} goals completed
                </Text>
              </View>
            </View>

            <View style={{ padding: 24, gap: 24 }}>
              {/* Goals List */}
              <FlatList
                data={goals}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item: goal }) => {
                  const Icon = goal.icon;
                  const percentage = (goal.saved / goal.target) * 100;
                  const weeksRemaining = getWeeksRemaining(goal.deadline);
                  const isCompleted = percentage >= 100;

                  return (
                    <View style={{ padding: 24, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, backgroundColor: colors.card }}>
                      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 16 }}>
                        <View style={{ width: 48, height: 48, backgroundColor: goal.color, borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4 }}>
                          <Icon size={24} color="#FFFFFF" />
                        </View>
                        
                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                            <View>
                              <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground, marginBottom: 4 }}>{goal.name}</Text>
                              <View style={{ backgroundColor: colors.muted, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 }}>
                                <Text style={{ fontSize: 12 }}>{goal.category}</Text>
                              </View>
                            </View>

                            <View style={{ alignItems: 'center', gap: 4 }}>
                              <Progress.Circle 
                                size={60} 
                                progress={Math.min(percentage / 100, 1)} 
                                color={isCompleted ? '#10B981' : colors.primary} 
                                unfilledColor={colors.muted} 
                                borderWidth={0} 
                                thickness={4}
                                showsText={true}
                                formatText={() => `${Math.round(percentage)}%`}
                                textStyle={{ fontSize: 14, fontWeight: '600', color: colors.foreground }}
                              />
                              {isCompleted && (
                                <View style={{ width: 24, height: 24, backgroundColor: '#22C55E', borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                                  <Check size={12} color="#FFFFFF" />
                                </View>
                              )}
                            </View>
                          </View>
                          
                          <View style={{ marginBottom: 16 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', fontSize: 12, color: colors.mutedForeground, marginBottom: 8 }}>
                              <Text>MWK {goal.saved.toLocaleString()}</Text>
                              <Text>MWK {goal.target.toLocaleString()}</Text>
                            </View>
                            <Progress.Bar 
                              progress={Math.min(percentage / 100, 1)} 
                              width={null} 
                              height={8} 
                              color={getProgressColor(percentage)} 
                              unfilledColor={colors.muted} 
                              borderWidth={0}
                            />
                          </View>

                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border }}>
                            <View>
                              <Text style={{ fontSize: 12, color: colors.mutedForeground, marginBottom: 4 }}>Remaining</Text>
                              <Text style={{ fontSize: 14, fontWeight: '500', color: colors.foreground }}>
                                MWK {Math.max(0, goal.target - goal.saved).toLocaleString()}
                              </Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                              <Text style={{ fontSize: 12, color: colors.mutedForeground, marginBottom: 4 }}>Deadline</Text>
                              <Text style={{ fontSize: 14, fontWeight: '500', color: weeksRemaining <= 4 ? '#EF4444' : colors.foreground }}>
                                {weeksRemaining > 0 ? `${weeksRemaining} weeks` : 'Overdue'}
                              </Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                              <Text style={{ fontSize: 12, color: colors.mutedForeground, marginBottom: 4 }}>Weekly Target</Text>
                              <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>
                                MWK {goal.weeklyTarget.toLocaleString()}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <TouchableOpacity onPress={() => openEditModal(goal)} style={{ position: 'absolute', top: 8, right: 8 }}>
                        <Edit3 size={18} color={colors.primary} />
                      </TouchableOpacity>
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
              />

              {/* Quick Actions */}
              <View style={{ padding: 24, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, backgroundColor: colors.card }}>
                <Text style={{ fontSize: 18, fontFamily: 'Poppins', color: colors.foreground, marginBottom: 16 }}>Quick Actions</Text>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                  <TouchableOpacity 
                    onPress={() => setShowAddModal(true)}
                    style={{ flex: 1, height: 48, borderRadius: 12, borderWidth: 1, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Plus size={18} color={colors.primary} style={{ marginRight: 8 }} />
                      <Text style={{ color: colors.primary }}>Add Goal</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={{ flex: 1, height: 48, borderRadius: 12, borderWidth: 1, borderColor: colors.chart2, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TrendingUp size={18} color={colors.chart2} style={{ marginRight: 8 }} />
                      <Text style={{ color: colors.chart2 }}>View Tips</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Goal-Based Saving Guide Card */}
              <View style={{ borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, backgroundColor: colors.primary, overflow: 'hidden' }}>
                <TouchableOpacity 
                  onPress={() => setGuideExpanded(!guideExpanded)}
                  style={{ padding: 24 }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                    <View style={{ width: 56, height: 56, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                      <TrendingUp size={28} color={colors.primaryForeground} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: colors.primaryForeground, fontSize: 18, fontWeight: '600', marginBottom: 4 }}>Goal-Based Saving Guide</Text>
                      <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>Learn how to save effectively for your goals</Text>
                      <View style={{ marginTop: 8, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
                        <Text style={{ color: colors.primaryForeground }}>Available in English & Chichewa</Text>
                      </View>
                    </View>
                    <Calendar size={24} color={colors.primaryForeground} />
                  </View>
                </TouchableOpacity>

                {guideExpanded && (
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
                              {index === 2 && ( // Add images to "Plausible Malawian Examples"
                                <View style={{ flexDirection: 'row', gap: 8, padding: 16 }}>
                                  <Image 
                                    source={{ uri: 'https://agra.org/wp-content/uploads/2023/09/IMG_1929.jpeg' }} 
                                    style={{ width: 150, height: 100, borderRadius: 8 }} 
                                  />
                                  <Image 
                                    source={{ uri: 'https://www.aljazeera.com/wp-content/uploads/2023/09/2023-03-22T060033Z_1957020102_RC28OZ9RMYPC_RTRMADP_3_UKRAINE-CRISIS-AFRICA-FARMING-1693835916.jpg?resize=1800%2C1800' }} 
                                    style={{ width: 150, height: 100, borderRadius: 8 }} 
                                  />
                                </View>
                              )}
                            </Animated.View>
                          </View>
                        );
                      })}
                    </View>
                  </Animated.View>
                )}
              </View>
            </View>

            {/* Add Goal Modal */}
            <Modal
              visible={showAddModal}
              transparent={true}
              animationType="fade"
              onRequestClose={resetModal}
            >
              <TouchableOpacity 
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 }} 
                activeOpacity={1}
                onPress={resetModal}
              >
                <View 
                  style={{ backgroundColor: colors.card, borderRadius: 16, padding: 24, maxWidth: 400, alignSelf: 'center' }}
                  onStartShouldSetResponder={() => true}
                >
                  <Text style={{ fontSize: 20, fontFamily: 'Poppins', color: colors.cardForeground, marginBottom: 24 }}>Add New Goal</Text>
                  
                  <View style={{ gap: 16 }}>
                    <View>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: colors.cardForeground, marginBottom: 8 }}>Goal Name</Text>
                      <TextInput
                        value={newGoalName}
                        onChangeText={setNewGoalName}
                        placeholder="e.g., New Phone"
                        style={{ height: 48, backgroundColor: colors.inputBackground, borderRadius: 8, padding: 12 }}
                      />
                    </View>
                    
                    <View>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: colors.cardForeground, marginBottom: 8 }}>Target Amount (MWK)</Text>
                      <TextInput
                        value={newGoalAmount}
                        onChangeText={setNewGoalAmount}
                        placeholder="e.g., 250000"
                        keyboardType="numeric"
                        style={{ height: 48, backgroundColor: colors.inputBackground, borderRadius: 8, padding: 12 }}
                      />
                    </View>
                    
                    <View>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: colors.cardForeground, marginBottom: 8 }}>Target Date</Text>
                      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ height: 48, backgroundColor: colors.inputBackground, borderRadius: 8, justifyContent: 'center', padding: 12 }}>
                        <Text>{newGoalDate.toISOString().split('T')[0]}</Text>
                      </TouchableOpacity>
                      {showDatePicker && (
                        <DateTimePicker
                          value={newGoalDate}
                          mode="date"
                          display="default"
                          onChange={onDateChange}
                        />
                      )}
                    </View>
                  </View>
                  
                  <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
                    <TouchableOpacity 
                      onPress={resetModal}
                      style={{ flex: 1, height: 48, borderRadius: 8, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={handleAddGoal}
                      style={{ flex: 1, height: 48, backgroundColor: colors.primary, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ color: colors.primaryForeground }}>Add Goal</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Edit Goal Modal (similar to add) */}
            <Modal
              visible={showEditModal}
              transparent={true}
              animationType="fade"
              onRequestClose={resetModal}
            >
              <TouchableOpacity 
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 }} 
                activeOpacity={1}
                onPress={resetModal}
              >
                <View 
                  style={{ backgroundColor: colors.card, borderRadius: 16, padding: 24, maxWidth: 400, alignSelf: 'center' }}
                  onStartShouldSetResponder={() => true}
                >
                  <Text style={{ fontSize: 20, fontFamily: 'Poppins', color: colors.cardForeground, marginBottom: 24 }}>Edit Goal</Text>
                  
                  <View style={{ gap: 16 }}>
                    <View>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: colors.cardForeground, marginBottom: 8 }}>Goal Name</Text>
                      <TextInput
                        value={newGoalName}
                        onChangeText={setNewGoalName}
                        placeholder="e.g., New Phone"
                        style={{ height: 48, backgroundColor: colors.inputBackground, borderRadius: 8, padding: 12 }}
                      />
                    </View>
                    
                    <View>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: colors.cardForeground, marginBottom: 8 }}>Target Amount (MWK)</Text>
                      <TextInput
                        value={newGoalAmount}
                        onChangeText={setNewGoalAmount}
                        placeholder="e.g., 250000"
                        keyboardType="numeric"
                        style={{ height: 48, backgroundColor: colors.inputBackground, borderRadius: 8, padding: 12 }}
                      />
                    </View>
                    
                    <View>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: colors.cardForeground, marginBottom: 8 }}>Target Date</Text>
                      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ height: 48, backgroundColor: colors.inputBackground, borderRadius: 8, justifyContent: 'center', padding: 12 }}>
                        <Text>{newGoalDate.toISOString().split('T')[0]}</Text>
                      </TouchableOpacity>
                      {showDatePicker && (
                        <DateTimePicker
                          value={newGoalDate}
                          mode="date"
                          display="default"
                          onChange={onDateChange}
                        />
                      )}
                    </View>
                  </View>
                  
                  <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
                    <TouchableOpacity 
                      onPress={resetModal}
                      style={{ flex: 1, height: 48, borderRadius: 8, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={handleEditGoal}
                      style={{ flex: 1, height: 48, backgroundColor: colors.primary, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ color: colors.primaryForeground }}>Save Changes</Text>
                    </TouchableOpacity>
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

export default GoalsSaving;