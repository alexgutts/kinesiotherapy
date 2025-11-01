'use client';

import { useState } from 'react';
import { Patient, STAGES, PatientStatus } from '@/lib/types';
import { MOCK_PATIENTS } from '@/lib/mockData';

interface PatientListProps {
  onSelectPatient: (patient: Patient) => void;
}

export default function PatientList({ onSelectPatient }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [messageModal, setMessageModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ''
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (patientId: number, newStatus: PatientStatus) => {
    setPatients(prevPatients =>
      prevPatients.map(p =>
        p.id === patientId ? { ...p, status: newStatus } : p
      )
    );
  };

  const getMessageTemplate = (status: PatientStatus, patientName: string): string => {
    switch (status) {
      case 'Active':
        return `Hello ${patientName}, this is a customized message for active patients. We hope your treatment is going well. Please don't hesitate to contact us if you have any questions.`;
      case 'Lost':
        return `Hello ${patientName}, we noticed you haven't been to your recent appointments. We'd like to check in and see how you're doing. Please contact us to reschedule.`;
      case 'Athlete':
        return `Hello ${patientName}, this is a customized message for athletes. We understand the importance of your recovery for your athletic performance. Let's continue working together.`;
      case 'Out-of-town':
        return `Hello ${patientName}, we understand you're currently out of town. Please let us know when you'll be back so we can schedule your next session.`;
      case 'Pre-discharge':
        return `Hello ${patientName}, you're making excellent progress! We're preparing for your discharge. Let's schedule a final assessment soon.`;
      case 'Referred Specialist':
        return `Hello ${patientName}, based on your condition, we've referred you to a specialist. Please contact us if you need any additional information.`;
      case 'Deceased':
      case 'Discharged':
      default:
        return '';
    }
  };

  const handleGenerateMessage = (patient: Patient) => {
    const message = getMessageTemplate(patient.status, patient.name);
    if (message) {
      setMessageModal({ isOpen: true, message });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(messageModal.message);
  };

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
      <div className="max-w-7xl mx-auto">
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

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead style={{ backgroundColor: '#1e3a5f' }}>
              <tr>
                <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Age</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Condition</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Doctor</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Progress</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Generate Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    No patients found matching your search.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                    style={{ borderColor: '#e3f2fd' }}
                  >
                    <td className="px-4 py-4">
                      <button
                        onClick={() => onSelectPatient(patient)}
                        className="text-left hover:underline font-medium"
                        style={{ color: '#1e3a5f' }}
                      >
                        {patient.name}
                      </button>
                    </td>
                    <td className="px-4 py-4" style={{ color: '#4a90e2' }}>
                      {patient.age}
                    </td>
                    <td className="px-4 py-4 text-sm" style={{ color: '#64b5f6' }}>
                      {patient.condition}
                    </td>
                    <td className="px-4 py-4 text-sm" style={{ color: '#1e3a5f' }}>
                      {patient.doctorName}
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={patient.status}
                        onChange={(e) => handleStatusChange(patient.id, e.target.value as PatientStatus)}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 rounded border-2 focus:outline-none focus:border-blue-400 transition-colors"
                        style={{
                          borderColor: '#4a90e2',
                          color: '#1e3a5f'
                        }}
                      >
                        <option value="Active">Active</option>
                        <option value="Discharged">Discharged</option>
                        <option value="Lost">Lost</option>
                        <option value="Athlete">Athlete</option>
                        <option value="Deceased">Deceased</option>
                        <option value="Out-of-town">Out-of-town</option>
                        <option value="Pre-discharge">Pre-discharge</option>
                        <option value="Referred Specialist">Referred Specialist</option>
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: getPatientStatusColor(patient)
                          }}
                          title={getStatusText(patient)}
                        />
                        <span className="text-xs font-medium" style={{ color: getPatientStatusColor(patient) }}>
                          {getStatusText(patient)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {patient.status !== 'Deceased' && patient.status !== 'Discharged' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGenerateMessage(patient);
                          }}
                          className="px-4 py-2 rounded font-medium hover:opacity-80 transition-opacity"
                          style={{
                            backgroundColor: '#4a90e2',
                            color: '#ffffff'
                          }}
                        >
                          Generate Message
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Message Modal */}
        {messageModal.isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setMessageModal({ isOpen: false, message: '' })}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e3a5f' }}>
                Generated Message
              </h2>
              <div
                className="mb-6 p-4 rounded border-2"
                style={{
                  borderColor: '#e3f2fd',
                  backgroundColor: '#f5f5f5',
                  color: '#1e3a5f'
                }}
              >
                {messageModal.message}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 px-4 py-2 rounded font-medium hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: '#4a90e2',
                    color: '#ffffff'
                  }}
                >
                  Copy Text
                </button>
                <button
                  onClick={() => setMessageModal({ isOpen: false, message: '' })}
                  className="flex-1 px-4 py-2 rounded font-medium hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: '#e3f2fd',
                    color: '#1e3a5f'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
