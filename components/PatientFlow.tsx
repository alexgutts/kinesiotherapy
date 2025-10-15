'use client';

import { Patient, STAGES } from '@/lib/types';
import StageShape from './StageShape';

interface PatientFlowProps {
  patient: Patient;
  onBack: () => void;
}

export default function PatientFlow({ patient, onBack }: PatientFlowProps) {
  const getStageColor = (stageId: number): string => {
    const patientStage = patient.stages.find(s => s.stageId === stageId);
    const stage = STAGES.find(s => s.id === stageId);

    if (!patientStage || !stage) return '#cccccc';

    if (patientStage.completedDate) {
      return '#4caf50';
    }

    if (stageId === patient.currentStageId) {
      const startDate = new Date(patientStage.startDate);
      const today = new Date();
      const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysSinceStart <= stage.expectedDays) {
        return '#4a90e2';
      } else if (daysSinceStart <= stage.expectedDays + 3) {
        return '#ff9800';
      } else {
        return '#f44336';
      }
    }

    return '#e0e0e0';
  };

  const getDaysInStage = (stageId: number): string => {
    const patientStage = patient.stages.find(s => s.stageId === stageId);
    const stage = STAGES.find(s => s.id === stageId);

    if (!patientStage || !stage) return '';

    if (patientStage.completedDate) {
      const startDate = new Date(patientStage.startDate);
      const endDate = new Date(patientStage.completedDate);
      const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      return `Completed in ${days} days`;
    }

    if (stageId === patient.currentStageId) {
      const startDate = new Date(patientStage.startDate);
      const today = new Date();
      const days = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      return `Day ${days} of ${stage.expectedDays} expected`;
    }

    return 'Not started';
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-6 py-2 rounded-lg font-medium hover:opacity-80 transition-opacity"
          style={{
            backgroundColor: '#4a90e2',
            color: '#ffffff'
          }}
        >
          ← Back to Patient List
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
            {patient.name}
          </h1>
          <p className="text-lg" style={{ color: '#4a90e2' }}>
            Treatment Progress Flow
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#1e3a5f' }}>
            Treatment Stages
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {STAGES.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <StageShape
                    shape={stage.shape}
                    color={getStageColor(stage.id)}
                    isActive={stage.id === patient.currentStageId}
                    label={`${stage.id}`}
                  />
                  <div className="mt-4 text-center max-w-[120px]">
                    <p className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>
                      {stage.name}
                    </p>
                    <p className="text-xs mt-1" style={{ color: '#64b5f6' }}>
                      {getDaysInStage(stage.id)}
                    </p>
                  </div>
                </div>

                {index < STAGES.length - 1 && (
                  <div className="mx-4 mb-16">
                    <svg width="40" height="20" viewBox="0 0 40 20">
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="10"
                          refX="9"
                          refY="3"
                          orient="auto"
                        >
                          <polygon points="0 0, 10 3, 0 6" fill="#64b5f6" />
                        </marker>
                      </defs>
                      <line
                        x1="0"
                        y1="10"
                        x2="35"
                        y2="10"
                        stroke="#64b5f6"
                        strokeWidth="3"
                        markerEnd="url(#arrowhead)"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t pt-6" style={{ borderColor: '#e3f2fd' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3a5f' }}>
              Stage Legend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#4a90e2' }}></div>
                <span className="text-sm">On Track</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ff9800' }}></div>
                <span className="text-sm">Slightly Delayed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f44336' }}></div>
                <span className="text-sm">Significantly Delayed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#4caf50' }}></div>
                <span className="text-sm">Completed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#1e3a5f' }}>
            Patient Details
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#4a90e2' }}>
                Medical Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                    Condition
                  </p>
                  <p className="text-base" style={{ color: '#64b5f6' }}>
                    {patient.condition}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                    Attending Physician
                  </p>
                  <p className="text-base" style={{ color: '#64b5f6' }}>
                    {patient.doctorName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                    Admission Date
                  </p>
                  <p className="text-base" style={{ color: '#64b5f6' }}>
                    {new Date(patient.admissionDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#4a90e2' }}>
                Personal Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                    Age
                  </p>
                  <p className="text-base" style={{ color: '#64b5f6' }}>
                    {patient.age} years old
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                    Phone Number
                  </p>
                  <p className="text-base" style={{ color: '#64b5f6' }}>
                    {patient.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                    Email
                  </p>
                  <p className="text-base" style={{ color: '#64b5f6' }}>
                    {patient.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t" style={{ borderColor: '#e3f2fd' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#4a90e2' }}>
              Current Stage Details
            </h3>
            {STAGES.find(s => s.id === patient.currentStageId) && (
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#e3f2fd' }}>
                <p className="font-semibold mb-2" style={{ color: '#1e3a5f' }}>
                  {STAGES.find(s => s.id === patient.currentStageId)?.name}
                </p>
                <p style={{ color: '#4a90e2' }}>
                  {STAGES.find(s => s.id === patient.currentStageId)?.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
