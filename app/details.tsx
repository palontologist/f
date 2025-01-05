import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { format } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Activity {
  name: string;
  timestamp: string;
  impact: number;
}

export default function Details() {
  const { name } = useLocalSearchParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newActivity, setNewActivity] = useState('');
  const [newImpact, setNewImpact] = useState('');
  
  const categories = [
    { name: 'Economic', icon: 'cash', metric: 13, amount: '28' },
    { name: 'Social', icon: 'account-group', metric: 25, amount: '45' },
    { name: 'Environmental', icon: 'leaf', metric: 8, amount: '12' },
  ];

  const logActivity = () => {
    if (newActivity && newImpact) {
      const activity = {
        name: newActivity,
        timestamp: format(new Date(), 'pp'),
        impact: parseFloat(newImpact)
      };
      setActivities([...activities, activity]);
      setModalVisible(false);
      setNewActivity('');
      setNewImpact('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {format(new Date(), 'dd MMM, yyyy')}{'\n'}
        Evening, {name || 'User'}
      </Text>

      {/* Impact Circle */}
      <View style={styles.impactCircle}>
        <Text style={styles.impactLabel}>Impact</Text>
        <Text style={styles.impactAmount}>85</Text>
        <Text style={styles.impactSubtitle}>Total Impact Score</Text>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryCard}>
            <View style={styles.categoryIcon}>
              <MaterialCommunityIcons name={category.icon} size={24} color="#22C55E" />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
            <Text style={styles.categoryMetric}>{category.amount}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${category.metric}%` }]} />
            </View>
          </View>
        ))}
      </View>

      {/* Record Button */}
      <TouchableOpacity 
        style={styles.recordButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.recordButtonText}>Record Activity +</Text>
      </TouchableOpacity>

      {/* Activity Input Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Activity Name"
            value={newActivity}
            onChangeText={setNewActivity}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Impact Score"
            value={newImpact}
            onChangeText={setNewImpact}
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.saveButton]}
              onPress={logActivity}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: 'white',
    marginTop: 40,
    marginBottom: 20,
  },
  impactCircle: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#22C55E',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  impactLabel: {
    color: '#22C55E',
    fontSize: 20,
  },
  impactAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  impactSubtitle: {
    color: '#22C55E',
    fontSize: 14,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    color: 'white',
    fontSize: 12,
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    width: '100%',
    marginTop: 4,
  },
  progress: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 2,
  },
  categoryMetric: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recordButton: {
    backgroundColor: '#22C55E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  recordButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    marginTop: 'auto',
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#444',
  },
  saveButton: {
    backgroundColor: '#22C55E',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});