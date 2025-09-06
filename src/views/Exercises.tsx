import {ThemedAlert} from '@/src/components/global';
import AppLayout from '../layouts/AppLayout';
import {useEffect, useState} from 'react';
import regionService from '../database/services/regionService';
import ExerciseResponseDto from '../models/exercise/ExerciseResponseDto';
import {RegionResponseDto} from '../models/Region/RegionResponseDto';
import exerciseService from '../database/services/exerciseService';
import TargetRegion from '../components/exercises/TargetRegion';
import {VStack} from '@/components/ui/vstack';
import ExerciseCard from '../components/exercises/ExerciseCard';

export default function ExercisesScreen() {
  const [exerciseList, setExerciseList] = useState<ExerciseResponseDto[]>([]);
  const [regionList, setRegionList] = useState<RegionResponseDto[]>([]);
  const [selectedRegionList, setSelectedRegionList] = useState<RegionResponseDto[]>([]);

  useEffect(() => {
    fetchRegionList();
  }, []);

  const fetchRegionList = async () => {
    const response = await regionService.GetAll();
    setRegionList(response);
  };

  useEffect(() => {
    if (selectedRegionList.length > 0) {
      fetchExerciseData();
    }
  }, [selectedRegionList]);

  const fetchExerciseData = async () => {
    const response = await exerciseService.GetExercisesByRegions(selectedRegionList.map(r => r.id));
    setExerciseList(response);
  };

  return (
    <AppLayout returnHomeEnable={true} returnbackEnable={true}>
      <TargetRegion regionList={regionList} selectedRegionList={selectedRegionList} setSelectedRegionList={setSelectedRegionList} />
      <VStack className="my-2" space="xl">
        {selectedRegionList.length <= 0 ? (
          <ThemedAlert text="You didnt select any region!" />
        ) : (
          exerciseList != null && exerciseList.length > 0 && exerciseList.map((data, key) => <ExerciseCard key={key} exercise={data} />)
        )}
      </VStack>
    </AppLayout>
  );
}
