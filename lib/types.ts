export type StageShape = 'square' | 'triangle' | 'circle';

export type UserRole = 'doctor' | 'physiotherapist';

export type PatientStatus =
  | 'Active'
  | 'Discharged'
  | 'Lost'
  | 'Athlete'
  | 'Deceased'
  | 'Out-of-town'
  | 'Pre-discharge'
  | 'Referred Specialist';

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface Stage {
  id: number;
  name: string;
  shape: StageShape;
  expectedDays: number;
  description: string;
}

export interface PatientStage {
  stageId: number;
  startDate: string;
  completedDate?: string;
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  phoneNumber: string;
  email: string;
  condition: string;
  doctorName: string;
  currentStageId: number;
  stages: PatientStage[];
  admissionDate: string;
  status: PatientStatus;
}

export const STAGES: Stage[] = [
  {
    id: 1,
    name: 'Patient Reception',
    shape: 'square',
    expectedDays: 1,
    description: 'Initial patient intake and registration'
  },
  {
    id: 2,
    name: 'Information Gathering',
    shape: 'triangle',
    expectedDays: 2,
    description: 'Collecting medical history and assessment'
  },
  {
    id: 3,
    name: 'Pain Relief',
    shape: 'circle',
    expectedDays: 7,
    description: 'Starting rehabilitation process by relieving pain'
  },
  {
    id: 4,
    name: 'Range of Motion',
    shape: 'triangle',
    expectedDays: 14,
    description: 'Extending range of motion on affected area'
  },
  {
    id: 5,
    name: 'Strengthening',
    shape: 'square',
    expectedDays: 21,
    description: 'Building strength and stability'
  },
  {
    id: 6,
    name: 'Discharge',
    shape: 'circle',
    expectedDays: 3,
    description: 'Final assessment and discharge planning'
  }
];
