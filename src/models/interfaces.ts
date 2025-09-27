import mongoose from "mongoose";

interface TimestapedDocument {
  createdAt: Date;
  updatedAt: Date;
}

interface BaseFlight extends TimestapedDocument {
  userRole: 'pilot' | 'engineer';
  date?: Date;
  aircraftType?: string;    
  registration?: string;
  mission?: string;
  route?: string;
  remarks?: string;
  dayTime?: number;
  nightTime?: number;
  instrumentTime?: number;
  landings?: number;

  pilotInCommand?: string;
  copilot?: string;
  flightEngineers?: {
    name?: string;
    position?: number; 
    isEssential?: boolean;
  }[];
}

interface FlightForPilot extends BaseFlight {
  userRole: 'pilot';
  id: string;
  user_id: mongoose.Types.ObjectId | string;

  isPicFlight: boolean;
  isFlightInstructorFlight: boolean;
  isTestPilotFlight: boolean;
}

interface FlightForEngineer extends BaseFlight {
  userRole: 'engineer'; 
  id: string;
  user_id: mongoose.Types.ObjectId | string;
  isNonEssentialEngineerFlight: boolean; 
}

export type Flight = FlightForPilot | FlightForEngineer;

interface BasePreviousExperience extends TimestapedDocument {
  id: string;
  user_id: mongoose.Types.ObjectId | string;
  role: 'Pilot' | 'Engineer';
}

interface PilotExperience extends BasePreviousExperience {
  role: 'Pilot';
  aircraftExperience: {
    aircraftType: string;
    totalPICTime: number;
    totalCPTime: number;
    totalDayTime: number;
    totalNightTime: number;
    totalInstrumentTime: number;
    lastFlownDay?: Date;
    lastFlownNight?: Date;
    lastFlownInstrument?: Date;
  }[];
}

interface EngineerExperience extends BasePreviousExperience {
  role: 'Engineer';
  aircraftExperience: {
    aircraftType: string;
    totalDayTime: number;
    totalNightTime: number;
    lastFlownDay?: Date;
    lastFlownNight?: Date;
  }[];
}

export type PreviousExperience = PilotExperience | EngineerExperience;
