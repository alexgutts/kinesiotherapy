import { Patient, User } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    username: 'dr.johnson',
    password: 'password',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
    email: 'sarah.johnson@kinesiotherapy.com'
  },
  {
    id: 2,
    username: 'dr.chen',
    password: 'password',
    name: 'Dr. Michael Chen',
    role: 'doctor',
    email: 'michael.chen@kinesiotherapy.com'
  },
  {
    id: 3,
    username: 'dr.rodriguez',
    password: 'password',
    name: 'Dr. Emily Rodriguez',
    role: 'doctor',
    email: 'emily.rodriguez@kinesiotherapy.com'
  },
  {
    id: 4,
    username: 'pt.anderson',
    password: 'password',
    name: 'Alex Anderson',
    role: 'physiotherapist',
    email: 'alex.anderson@kinesiotherapy.com'
  },
  {
    id: 5,
    username: 'pt.williams',
    password: 'password',
    name: 'Jordan Williams',
    role: 'physiotherapist',
    email: 'jordan.williams@kinesiotherapy.com'
  }
];

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    age: 45,
    phoneNumber: '+1 (555) 123-4567',
    email: 'maria.r@email.com',
    condition: 'Lower Back Pain - Lumbar Strain',
    doctorName: 'Dr. Sarah Johnson',
    currentStageId: 3,
    admissionDate: '2025-10-01',
    status: 'Active',
    stages: [
      { stageId: 1, startDate: '2025-10-01', completedDate: '2025-10-01' },
      { stageId: 2, startDate: '2025-10-02', completedDate: '2025-10-03' },
      { stageId: 3, startDate: '2025-10-04' }
    ]
  },
  {
    id: 2,
    name: 'John Smith',
    age: 62,
    phoneNumber: '+1 (555) 234-5678',
    email: 'john.smith@email.com',
    condition: 'Rotator Cuff Injury - Right Shoulder',
    doctorName: 'Dr. Michael Chen',
    currentStageId: 4,
    admissionDate: '2025-09-20',
    status: 'Athlete',
    stages: [
      { stageId: 1, startDate: '2025-09-20', completedDate: '2025-09-20' },
      { stageId: 2, startDate: '2025-09-21', completedDate: '2025-09-22' },
      { stageId: 3, startDate: '2025-09-23', completedDate: '2025-10-02' },
      { stageId: 4, startDate: '2025-10-03' }
    ]
  },
  {
    id: 3,
    name: 'Ana Martinez',
    age: 34,
    phoneNumber: '+1 (555) 345-6789',
    email: 'ana.martinez@email.com',
    condition: 'ACL Reconstruction Recovery - Left Knee',
    doctorName: 'Dr. Sarah Johnson',
    currentStageId: 5,
    admissionDate: '2025-09-05',
    status: 'Pre-discharge',
    stages: [
      { stageId: 1, startDate: '2025-09-05', completedDate: '2025-09-05' },
      { stageId: 2, startDate: '2025-09-06', completedDate: '2025-09-07' },
      { stageId: 3, startDate: '2025-09-08', completedDate: '2025-09-17' },
      { stageId: 4, startDate: '2025-09-18', completedDate: '2025-10-05' },
      { stageId: 5, startDate: '2025-10-06' }
    ]
  },
  {
    id: 4,
    name: 'Robert Johnson',
    age: 58,
    phoneNumber: '+1 (555) 456-7890',
    email: 'robert.j@email.com',
    condition: 'Cervical Herniated Disc - Neck Pain',
    doctorName: 'Dr. Michael Chen',
    currentStageId: 2,
    admissionDate: '2025-09-15',
    status: 'Lost',
    stages: [
      { stageId: 1, startDate: '2025-09-15', completedDate: '2025-09-15' },
      { stageId: 2, startDate: '2025-09-16' }
    ]
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    age: 29,
    phoneNumber: '+1 (555) 567-8901',
    email: 'lisa.anderson@email.com',
    condition: 'Ankle Sprain - Grade II',
    doctorName: 'Dr. Emily Rodriguez',
    currentStageId: 3,
    admissionDate: '2025-10-08',
    status: 'Active',
    stages: [
      { stageId: 1, startDate: '2025-10-08', completedDate: '2025-10-08' },
      { stageId: 2, startDate: '2025-10-09', completedDate: '2025-10-10' },
      { stageId: 3, startDate: '2025-10-11' }
    ]
  },
  {
    id: 6,
    name: 'David Lee',
    age: 51,
    phoneNumber: '+1 (555) 678-9012',
    email: 'david.lee@email.com',
    condition: 'Sciatica - Right Leg Radiculopathy',
    doctorName: 'Dr. Sarah Johnson',
    currentStageId: 4,
    admissionDate: '2025-09-28',
    status: 'Referred Specialist',
    stages: [
      { stageId: 1, startDate: '2025-09-28', completedDate: '2025-09-28' },
      { stageId: 2, startDate: '2025-09-29', completedDate: '2025-09-30' },
      { stageId: 3, startDate: '2025-10-01', completedDate: '2025-10-09' },
      { stageId: 4, startDate: '2025-10-10' }
    ]
  },
  {
    id: 7,
    name: 'Patricia Wilson',
    age: 67,
    phoneNumber: '+1 (555) 789-0123',
    email: 'patricia.w@email.com',
    condition: 'Total Hip Replacement Recovery',
    doctorName: 'Dr. Michael Chen',
    currentStageId: 6,
    admissionDate: '2025-08-15',
    status: 'Discharged',
    stages: [
      { stageId: 1, startDate: '2025-08-15', completedDate: '2025-08-15' },
      { stageId: 2, startDate: '2025-08-16', completedDate: '2025-08-17' },
      { stageId: 3, startDate: '2025-08-18', completedDate: '2025-08-27' },
      { stageId: 4, startDate: '2025-08-28', completedDate: '2025-09-15' },
      { stageId: 5, startDate: '2025-09-16', completedDate: '2025-10-10' },
      { stageId: 6, startDate: '2025-10-11' }
    ]
  },
  {
    id: 8,
    name: 'Thomas Brown',
    age: 41,
    phoneNumber: '+1 (555) 890-1234',
    email: 'thomas.brown@email.com',
    condition: 'Tennis Elbow - Lateral Epicondylitis',
    doctorName: 'Dr. Emily Rodriguez',
    currentStageId: 3,
    admissionDate: '2025-10-05',
    status: 'Out-of-town',
    stages: [
      { stageId: 1, startDate: '2025-10-05', completedDate: '2025-10-05' },
      { stageId: 2, startDate: '2025-10-06', completedDate: '2025-10-07' },
      { stageId: 3, startDate: '2025-10-08' }
    ]
  }
];
