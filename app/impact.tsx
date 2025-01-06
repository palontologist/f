import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';

interface ImpactActivity {
  id: string;
  name: string;
  timestamp: string;
  impact: number;
  economicImpact: number;
  socialImpact: number;
  environmentalImpact: number;
  impactDescription: string;
}

// Mock data - replace with your actual data source
const mockActivities: ImpactActivity[] = [
  {
    id: '1',
    name: 'Tree Planting',
    timestamp: '2024-01-15T10:00:00',
    impact: 85,
    economicImpact: 20,
    socialImpact: 25,
    environmentalImpact: 40,
    impactDescription: 'Significant positive impact on local environment and community engagement.'
  },
  {
    id: '2',
    name: 'Community Workshop',
    timestamp: '2024-01-14T15:30:00',
    impact: 65,
    economicImpact: 30,
    socialImpact: 25,
    environmentalImpact: 10,
    impactDescription: 'Enhanced community knowledge and social connections.'
  },
];

export default function ImpactHistory() {
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Impact History',
          headerStyle: { backgroundColor: '#000000' },
          headerTintColor: '#fff',
        }} 
      />
      <View style={styles.container}>
        <ScrollView>
          {mockActivities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.headerRow}>
                <Text style={styles.activityName}>{activity.name}</Text>
                <Text style={styles.timestamp}>
                  {format(new Date(activity.timestamp), 'MMM d, yyyy')}
                </Text>
              </View>

              <Text style={styles.description}>{activity.impactDescription}</Text>

              <View style={styles.impactGrid}>
                <View style={styles.impactItem}>
                  <MaterialCommunityIcons name="cash" size={24} color="#22C55E" />
                  <Text style={styles.impactValue}>{activity.economicImpact}</Text>
                  <Text style={styles.impactLabel}>Economic</Text>
                </View>
                <View style={styles.impactItem}>
                  <MaterialCommunityIcons name="account-group" size={24} color="#22C55E" />
                  <Text style={styles.impactValue}>{activity.socialImpact}</Text>
                  <Text style={styles.impactLabel}>Social</Text>
                </View>
                <View style={styles.impactItem}>
                  <MaterialCommunityIcons name="leaf" size={24} color="#22C55E" />
                  <Text style={styles.impactValue}>{activity.environmentalImpact}</Text>
                  <Text style={styles.impactLabel}>Environmental</Text>
                </View>
              </View>

              <View style={styles.totalImpactRow}>
                <Text style={styles.totalImpactLabel}>Total Impact Score</Text>
                <Text style={styles.totalImpactValue}>{activity.impact}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  activityCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    color: '#999',
    marginBottom: 16,
    fontSize: 14,
    lineHeight: 20,
  },
  impactGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  impactItem: {
    alignItems: 'center',
    flex: 1,
  },
  impactValue: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  impactLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  totalImpactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalImpactLabel: {
    color: '#666',
    fontSize: 14,
  },
  totalImpactValue: {
    color: '#22C55E',
    fontSize: 20,
    fontWeight: 'bold',
  },
});