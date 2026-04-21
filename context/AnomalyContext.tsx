import React, { createContext, useContext, useState, ReactNode } from 'react';

// Defines the data structure for a single anomaly report
export interface Anomaly {
  id: string;
  title: string;
  description: string;
  imageUri: string | null;
  date: string;
}

// Defines available state and actions in our context
interface AnomalyContextType {
  anomalies: Anomaly[];
  addAnomaly: (anomaly: Omit<Anomaly, 'id' | 'date'>) => void;
  starCount: number;
  incrementStarCount: () => void;
}

// Create the context
const AnomalyContext = createContext<AnomalyContextType | undefined>(undefined);

// Provider component that wraps the app to share state globally
export function AnomalyProvider({ children }: { children: ReactNode }) {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [starCount, setStarCount] = useState(0);

  // Function to create and add a new anomaly to the list
  const addAnomaly = (anomaly: Omit<Anomaly, 'id' | 'date'>) => {
    const newAnomaly: Anomaly = {
      ...anomaly,
      id: Math.random().toString(36).substring(7), // Generate simple random ID
      date: new Date().toISOString(), // Set current date and time
    };
    // Add the new anomaly to the top of the list
    setAnomalies([newAnomaly, ...anomalies]);
  };

  // Function to increase caught stars count
  const incrementStarCount = () => {
    setStarCount((prev) => prev + 1);
  };

  return (
    <AnomalyContext.Provider value={{ anomalies, addAnomaly, starCount, incrementStarCount }}>
      {children}
    </AnomalyContext.Provider>
  );
}

// Custom hook to easily access context data from any component
export function useAnomalies() {
  const context = useContext(AnomalyContext);
  if (context === undefined) {
    throw new Error('useAnomalies must be used within an AnomalyProvider');
  }
  return context;
}
