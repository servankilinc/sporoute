import React from 'react';
import {Divider} from '@/components/ui/divider';
import {HStack} from '@/components/ui/hstack';
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';
import {Heading} from '@/components/ui/heading';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {RegionResponseDto} from '@/src/models/Region/RegionResponseDto';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {ThemedView} from '../global';
import {VStack} from '@/components/ui/vstack';
import {regionImageMap} from '@/assets/images/regions';

type TargetRegionProps = {
  regionList: RegionResponseDto[];
  selectedRegionIDList: string[];
  setSelectedRegionIDList: (idList: string[]) => void;
};

function TargetRegion({regionList, selectedRegionIDList, setSelectedRegionIDList}: TargetRegionProps): React.JSX.Element {
  // --------- selection by region card ---------
  const SelectHandler = (regionId: string): void => {
    setSelectedRegionIDList(
      selectedRegionIDList.includes(regionId) ? selectedRegionIDList.filter(rId => rId != regionId) : [...selectedRegionIDList, regionId],
    );
  };

  return (
    <ThemedView>
      <VStack>
        <Heading size="sm">Target Region</Heading>
        <Divider className="my-2" />
        {regionList && regionList.length > 0 && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack space="lg">
              {regionList.map((region, index) => (
                <View
                  key={index}
                  className={
                    selectedRegionIDList.includes(region.id)
                      ? 'rounded-lg p-3 shadow-lg bg-zinc-200 dark:bg-zinc-500'
                      : 'rounded-lg p-3 shadow-lg bg-zinc-100 dark:bg-zinc-700'
                  }>
                  <TouchableOpacity onPress={() => SelectHandler(region.id)} disabled={selectedRegionIDList.includes(region.id)}>
                    <Image source={regionImageMap[region.id] || require(`../../../assets/images/placeholder.png`)} alt="region-content" />
                  </TouchableOpacity>
                </View>
              ))}
            </HStack>
          </ScrollView>
        )}

        {selectedRegionIDList && selectedRegionIDList.length > 0 && (
          <>
            <HStack space="2xl" className="mt-6 px-3">
              {selectedRegionIDList.map((regionId, index) => (
                <TouchableOpacity key={index} className="bg-zinc-200 dark:bg-zinc-400 rounded-2xl px-3 py-2" onPress={() => SelectHandler(regionId)}>
                  <HStack space="md" className="items-center">
                    <FontAwesome6 iconStyle="solid" name="x" size={8} color="#444444ff" />
                    <Text size="2xs" className="text-stone-800">
                      {regionList.find(region => region.id == regionId)?.name}
                    </Text>
                  </HStack>
                </TouchableOpacity>
              ))}
            </HStack>
          </>
        )}
      </VStack>
    </ThemedView>
  );
}

export default TargetRegion;