export interface FlightForPilot {
  id: string;
  date: Date;
  userRole: 'PIC' | 'CP';
  aircraftType: string;    
  registration: string;      
  pilotInCommand: string;
  isFlightInstructor: boolean;
  isTestPilot: boolean;
  copilot: string;
  flightEngineers: {
    name: string;
    position: number; 
    isEssential?: boolean;
  }[];
  mission: string;
  route: string;
  totalDayTime: number;
  totalNightTime: number;
  totalInstrumentTime: number;
  instructorTime: boolean;
  totalFlightTime: number;
  landings: number;
  remarks: string;
  userId: string;
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
  flightEngineers: {
    name: string;
    position: number;
    isEssential?: boolean;
  }[];
  isEssentialEngineer: boolean;  
  mission: string;
  route: string;
  totalDayTime: number;
  totalNightTime: number;
  totalFlightTime: number;
  remarks: string;
  userId: string;
  userRole: 'FE'; // Always 'FE' for flight engineers
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'PIC' | 'CP' | 'FE'; 
  medicalExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PreviousExperience {
  id: string;
  userId: string;
  role: 'PIC' | 'CP' | 'FE';
  totalPICTime?: number;      // Total Pilot in Command hours
  totalCopilotTime?: number;  // Total Copilot hours
  totalEngineerTime?: number; // Total Flight Engineer hours
  totalDayTime?: number;      // Total daytime hours
  totalNightTime?: number;    // Total nighttime hours
  totalInstrumentTime?: number; // Total instrument hours
  totalInstructorTime?: number; // Total time as instructor
  totalTestPilotTime?: number;  // Total time as test pilot
  totalLandings?: number;     // Total number of landings
  aircraftTypes?: {           // Summary of aircraft types flown
    type: string;
    hours: number;
  }[];
  remarks?: string;           // Any additional notes
  upToDate: Date;             // Date up to which these hours are valid
  createdAt: Date;
  updatedAt: Date;
}