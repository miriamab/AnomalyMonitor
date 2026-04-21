import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Anomaly {
  id: string;
  title: string;
  description: string;
  imageUri: string | null;
  date: string;
}

interface AnomalyContextType {
  anomalies: Anomaly[];
  addAnomaly: (anomaly: Omit<Anomaly, 'id' | 'date'>) => void;
}

const AnomalyContext = createContext<AnomalyContextType | undefined>(undefined);

export function AnomalyProvider({ children }: { children: ReactNode }) {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);

  const addAnomaly = (anomaly: Omit<Anomaly, 'id' | 'date'>) => {
    const newAnomaly: Anomaly = {
      ...anomaly,
      id: Math.random().toString(36).substring(7),
      date: new Date().toISOString(),
    };
    // Add the new anomaly to the top of the list
    setAnomalies([newAnomaly, ...anomalies]);
  };

  return (
    <AnomalyContext.Provider value={{ anomalies, addAnomaly }}>
      {children}
    </AnomalyContext.Provider>
  );
}

export function useAnomalies() {
  const context = useContext(AnomalyContext);
  if (context === undefined) {
    throw new Error('useAnomalies must be used within an AnomalyProvider');
  }
  return context;
}
