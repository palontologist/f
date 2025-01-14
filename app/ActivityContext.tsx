import React, { createContext, useContext, useState } from 'react';

interface Activity {
  name: string;
  timestamp: string;
  impact: number;
  description: string;
  type: string;
}

interface ActivityContextType {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (activity: Activity) => {
    setActivities((prevActivities) => [...prevActivities, activity]);
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};
