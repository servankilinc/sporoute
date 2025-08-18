export default interface RegionExercise {
  // id: string // composite key (regionId+exerciseId), handled manually
  regionId: string;
  exerciseId: string;
}
