import mongoose from "mongoose";

//Base schema
const PreviousExperienceSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  role: { type: String, enum: ['Pilot', 'Engineer'], required: true },
}, {
  timestamps: true,
  discriminatorKey: 'role'
});

const pilotAircraftExperienceSchema = new mongoose.Schema({
  aircraftType: { type: String, required: true },
  totalPICTime: { type: Number, default: 0 },
  totalCPTime: { type: Number, default: 0 },
  totalDayTime: { type: Number, default: 0 },
  totalNightTime: { type: Number, default: 0 },
  totalInstrumentTime: { type: Number, default: 0 },
  lastFlownDay: { type: Date, required: false },
  lastFlowNight: { type: Date, required: false },
  lastFlowInstrument: { type: Date, required: false },
}, { _id: false });

const engineerAircraftExperienceSchema = new mongoose.Schema({
  aircraftType: { type: String, required: true },
  totalDayTime: { type: Number, default: 0 },
  totalNightTime: { type: Number, default: 0 },
  lastFlownDay: { type: Date, required: false },
  lastFlowNight: { type: Date, required: false },
}, { _id: false });

const PreviousExperienceModel = mongoose.model('PreviousExperience', PreviousExperienceSchema);

//Discriminators for role-specific schemas
const PilotExperienceModel = PreviousExperienceModel.discriminator('Pilot', new mongoose.Schema({
  aircraftExperience: { type: [pilotAircraftExperienceSchema]}
}));

const EngineerExperienceModel = PreviousExperienceModel.discriminator('Engineer', new mongoose.Schema({
  aircraftExperience: { type: [engineerAircraftExperienceSchema]}
}));

//Controllers
export const getPreviousExperienceByUserId = (user_id: string) => PreviousExperienceModel.find({ user_id }).exec();

export const getPilotExperienceByUserId = (user_id: string) => PilotExperienceModel.find({ user_id }).exec();

export const getEngineerExperienceByUserId = (user_id: string) => EngineerExperienceModel.find({ user_id }).exec();

export const createPreviousExperience = (values: Record<string, any>) => new PreviousExperienceModel(values).save().then(exp => exp.toObject());

export const updatePreviousExperienceById = (id: string, values: Record<string, any>) => 
  PreviousExperienceModel.findByIdAndUpdate(id, values, { new: true }).exec();

export const deletePreviousExperienceById = (id: string) => PreviousExperienceModel.findByIdAndDelete(id).exec();

export const deletePreviousExperienceByUserId = (user_id: string) => PreviousExperienceModel.deleteMany({ user_id }).exec();

export { PreviousExperienceModel, PilotExperienceModel, EngineerExperienceModel };