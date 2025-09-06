export default interface SchemeFulfillment {
  id: string;
  programExerciseId: string;
  completionDate: Date;
  completionDateIndexer: Date; // ISO string // YYYY-MM-DD
}
