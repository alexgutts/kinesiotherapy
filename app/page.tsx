'use client';

import { useState } from 'react';
import Login from '@/components/Login';
import PatientList from '@/components/PatientList';
import PatientFlow from '@/components/PatientFlow';
import { Patient, User } from '@/lib/types';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Show login screen if user is not logged in
  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
  }

  // Show patient flow if a patient is selected
  if (selectedPatient) {
    return (
      <PatientFlow
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  // Show patient list by default
  return <PatientList onSelectPatient={setSelectedPatient} />;
}
