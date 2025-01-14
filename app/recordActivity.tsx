import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@activities';

const activityData = [
  { label: 'Transportation', value: 'transportation' },
  { label: 'Sustainable Shopping', value: 'sustainable_shopping' },
  { label: 'Energy Saving', value: 'energy_saving' },
  { label: 'Water Conservation', value: 'water_conservation' },
  { label: 'Recycling', value: 'recycling' },
  { label: 'Health and Wellbeing', value: 'health_and_wellbeing' },
];

// Define the Activity interface
interface Activity {
  activityName: string;
  impactScore: string;
  activityType: string | null;
  description: string;
}

export default function RecordActivity() {
  const router = useRouter();
  const [activityName, setActivityName] = useState('');
  const [impactScore, setImpactScore] = useState('');
  const [activityType, setActivityType] = useState(null);
  const [description, setDescription] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const storedActivities = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedActivities !== null) {
        setActivities(JSON.parse(storedActivities));
      }
    } catch (error) {
      console.error('Error loading activities:', error);
    }
  };

  const saveActivities = async (newActivities: Activity[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newActivities));
    } catch (error) {
      console.error('Error saving activities:', error);
    }
  };

  const handleSave = () => {
    const newActivity = { activityName, impactScore, activityType, description };
    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    saveActivities(updatedActivities);
    
    setActivityName('');
    setImpactScore('');
    setActivityType(null);
    setDescription('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Record Activity</Text>
      
      <Text style={styles.label}>Select Activity Type:</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={activityData}
        labelField="label"
        valueField="value"
        placeholder="Select an activity"
        value={activityType}
        onChange={item => {
          setActivityType(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Activity Name"
        value={activityName}
        onChangeText={setActivityName}
      />
      <TextInput
        style={styles.input}
        placeholder="Impact Score"
        value={impactScore}
        onChangeText={setImpactScore}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Short Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Save Activity" onPress={handleSave} />

      <FlatList
        data={activities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>{item.activityName}</Text>
            <Text style={styles.activityText}>Type: {item.activityType}</Text>
            <Text style={styles.activityText}>Impact: {item.impactScore}</Text>
            <Text style={styles.activityText}>{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'hsl(221 20% 11%)',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    color: 'white',
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#666',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  activityItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  activityText: {
    color: 'white',
    marginBottom: 4,
  },
});
