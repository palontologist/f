import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { format } from 'date-fns';

interface Activity {
  name: string;
  timestamp: string;
}

export default function Details() {
  const { name } = useLocalSearchParams();
  const [totalImpact, setTotalImpact] = useState<number>(0);
  const [activities, setActivities] = useState<Activity[]>([]);
  
  const currentDate = format(new Date(), 'MMMM d, yyyy');
  
  const categories = [
    { name: 'Economic', metric: 5 },
    { name: 'Social', metric: 3 },
    { name: 'Environmental', metric: 8 },
  ];

  const logActivity = () => {
    const newActivity = {
      name: 'New Impact Activity',
      timestamp: format(new Date(), 'pp')
    };
    setActivities([...activities, newActivity]);
    setTotalImpact(prev => prev + 1);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.header}>
          Hello {name || 'User'}! {currentDate}
        </Text>

        {/* Impact Wheel */}
        <View style={styles.impactWheel}>
          <Text style={styles.impactText}>Total Impact</Text>
          <Text style={styles.impactCount}>{totalImpact}</Text>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <View key={index} style={styles.categoryCard}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryMetric}>{category.metric}</Text>
            </View>
          ))}
        </View>

        {/* Log Activity Button */}
        <TouchableOpacity 
          style={styles.logButton}
          onPress={logActivity}
        >
          <Text style={styles.logButtonText}>Log Activity</Text>
        </TouchableOpacity>

        {/* Activities List */}
        <View style={styles.activitiesList}>
          {activities.map((activity, index) => (
            <View key={index} style={styles.activityCard}>
              <Text style={styles.activityName}>{activity.name}</Text>
              <Text style={styles.activityTime}>{activity.timestamp}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
  },
  impactWheel: {
    height: 160,
    backgroundColor: '#60a5fa',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  impactText: {
    color: 'white',
    fontSize: 18,
  },
  impactCount: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryMetric: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logButton: {
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  logButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activitiesList: {
    flex: 1,
  },
  activityCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});