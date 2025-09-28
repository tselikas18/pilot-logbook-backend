import { PreviousExperienceModel } from '../models/mongodb/PreviousExperience';

type MongooseUpdateOperation = {
  $push?: { [key: string]: any };
  [key: string]: any;
};

export const updateAircraftExperience = async (
  experienceId: string,
  aircraftType: string,
  updates: Record<string, any>
) => {

  const result = await PreviousExperienceModel.findById(experienceId);
  
  if (!result) {
    throw new Error('Previous experience not found');
  }
  
  const experience = result.toObject() as { 
    aircraftExperience?: Array<{ aircraftType: string; [key: string]: any }> 
  };
  
  const aircraftExperiences = experience.aircraftExperience || [];
  const existingIndex = aircraftExperiences.findIndex(
    (ae) => ae.aircraftType === aircraftType
  );

  let updateOperation: MongooseUpdateOperation;
  
  if (existingIndex >= 0) {
    // Update existing aircraft experience using MongoDB's $ positional operator
    updateOperation = {};
    Object.keys(updates).forEach(key => {
      updateOperation[`aircraftExperience.${existingIndex}.${key}`] = updates[key];
    });
  } else {
    // Add new aircraft experience using MongoDB's $push operator
    updateOperation = {
      $push: {
        aircraftExperience: { aircraftType, ...updates }
      }
    };
  }

  return PreviousExperienceModel.findByIdAndUpdate(
    experienceId,
    updateOperation,
    { new: true, runValidators: true }
  ).exec();
};