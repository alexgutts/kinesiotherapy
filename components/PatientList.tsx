'use client';

import { useState } from 'react';
import { Patient, STAGES } from '@/lib/types';
import { MOCK_PATIENTS } from '@/lib/mockData';

interface PatientListProps {
  onSelectPatient: (patient: Patient) => void;
}

export default function PatientList({ onSelectPatient }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = MOCK_PATIENTS.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPatientStatusColor = (patient: Patient): string => {
    const currentStage = patient.stages.find(s => s.stageId === patient.currentStageId);
    const stage = STAGES.find(s => s.id === patient.currentStageId);

    if (!currentStage || !stage || currentStage.completedDate) {
      return '#4caf50'; // Green for completed
    }

    const startDate = new Date(currentStage.startDate);
    const today = new Date();
    const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceStart <= stage.expectedDays) {
      return '#4caf50'; // Green - on time
    } else if (daysSinceStart <= stage.expectedDays + 2) {
      return '#ff9800'; // Orange - slightly delayed (1-2 days)
    } else {
      return '#f44336'; // Red - significantly delayed (more than 2 days)
    }
  };

  const getStatusText = (patient: Patient): string => {
    const currentStage = patient.stages.find(s => s.stageId === patient.currentStageId);
    const stage = STAGES.find(s => s.id === patient.currentStageId);

    if (!currentStage || !stage) return 'Unknown';

    if (currentStage.completedDate) {
      return 'Completed';
    }

    const startDate = new Date(currentStage.startDate);
    const today = new Date();
    const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceStart <= stage.expectedDays) {
      return 'On Track';
    } else if (daysSinceStart <= stage.expectedDays + 2) {
      return 'Slightly Delayed';
    } else {
      return 'Delayed';
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
            Kinesiotherapy
          </h1>
          <p className="text-lg" style={{ color: '#4a90e2' }}>
            Patient Management System
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search patients by name, condition, or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 text-lg focus:outline-none focus:border-blue-400 transition-colors"
            style={{
              borderColor: '#4a90e2',
              backgroundColor: '#ffffff'
            }}
          />
        </div>

        <div className="space-y-4">
          {filteredPatients.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No patients found matching your search.
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => onSelectPatient(patient)}
                className="w-full p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e3f2fd'
                }}
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#1e3a5f' }}>
                      {patient.name}
                    </h3>
                    <p className="mb-3" style={{ color: '#64b5f6' }}>
                      {patient.condition}
                    </p>
                    <div className="flex gap-4 text-sm">
                      <span style={{ color: '#1e3a5f' }}>
                        Doctor: {patient.doctorName}
                      </span>
                      <span style={{ color: '#64b5f6' }}>
                        Admitted: {new Date(patient.admissionDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-medium mb-1" style={{ color: '#4a90e2' }}>
                        Age
                      </span>
                      <span
                        className="px-4 py-2 rounded-lg text-sm font-semibold"
                        style={{
                          backgroundColor: '#e3f2fd',
                          color: '#4a90e2'
                        }}
                      >
                        {patient.age}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-xs font-medium mb-1" style={{ color: getPatientStatusColor(patient) }}>
                        Status
                      </span>
                      <div className="flex flex-col items-center">
                        <div
                          className="w-6 h-6 rounded-full shadow-md"
                          style={{
                            backgroundColor: getPatientStatusColor(patient),
                            border: '2px solid white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}
                          title={getStatusText(patient)}
                        />
                        <span className="text-xs mt-1 font-medium" style={{ color: getPatientStatusColor(patient) }}>
                          {getStatusText(patient)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
