export interface FlightForPilot {
  id: string;
  date: Date;
  aircraftType: string;
  registration: string;
  pilotInCommand: string;
  flightInstructor: boolean;
  testPilot: boolean;
  copilot: string;
  fligthEngineer1: string;
  fligthEngineer2: string;
  fligthEngineer3: string;
  fligthEngineer4: string;
  fligthEngineer5: string;
  fligthEngineer6: string;
  mission: string;
  route: string;
  totalDayTime: number;
  totalNightTime: number;
  totalInstrumentTime: number;
  instructorTime: boolean;
  totalFlightTime: number;
  landings: number;
  remarks: string;
  pilotId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlightForEngineer {
  id: string;
  date: Date;
  aircraftType: string;
  registration: string;
  pilotInCommand: string;
  copilot: string;
  fligthEngineer1: string;
  fligthEngineer2: string;
  fligthEngineer3: string;
  fligthEngineer4: string;
  fligthEngineer5: string;
  fligthEngineer6: string;
  mission: string;
  route: string;
  totalDayTime: number;
  totalNightTime: number;
  totalInstrumentTime: number;
  instructorTime: boolean;
  totalFlightTime: number;
  landings: number;
  remarks: string;
  pilotId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'pilot' | 'engineer';
  medicalExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Aircraft {
  id: string;
  type: string;
  registration: string;
  category: string; 
}
