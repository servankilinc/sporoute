import React from 'react';
import {Divider} from '@/components/ui/divider';
import {HStack} from '@/components/ui/hstack';
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {ThemedText} from '../../global';
import {VStack} from '@/components/ui/vstack';
import {regionImageMap} from '@/assets/images/regions';
import {useAppDispatch, useAppSelector} from '@/src/redux/hook';
import {setSelectedRegionList} from '@/src/redux/reducers/StatesEditProgram';
import {RootState} from '@/src/redux/Store';
import { useColors } from '@/src/hooks';

function TargetRegion(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const colors = useColors();
  const SelectHandler = (regionId: string): void => {
    dispatch(setSelectedRegionList(regionId));
  };

  const regionList = useAppSelector((state: RootState) => state.statesEditProgram.regionList);
  const selectedRegionList = useAppSelector((state: RootState) => state.statesEditProgram.selectedRegionList);

  return (
    <View
      style={[
        {backgroundColor: colors.bodyBackground},
        {borderTopLeftRadius: 8,borderTopRightRadius: 8, padding: 14, borderWidth: 1, borderColor: colors.border},
      ]}
    >
      <VStack>
        <ThemedText type='custom' style={{fontWeight:"600", fontSize: 12}}>Target Region</ThemedText>
        <Divider className="my-2" />
        {regionList && regionList.length > 0 && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack space="lg">
              {regionList.map((region, index) => (
                <View
                  key={index}
                  className={
                    selectedRegionList.some(f => f.id == region.id)
                      ? 'rounded-lg p-3 shadow-lg bg-zinc-200 dark:bg-zinc-500'
                      : 'rounded-lg p-3 shadow-lg bg-zinc-100 dark:bg-zinc-700'
                  }>
                  <TouchableOpacity onPress={() => SelectHandler(region.id)} disabled={selectedRegionList.some(f => f.id == region.id)}>
                    <Image source={regionImageMap[region.id] || regionImageMap['placeholder']} alt="region-content" />
                  </TouchableOpacity>
                </View>
              ))}
            </HStack>
          </ScrollView>
        )}

        {selectedRegionList && selectedRegionList.length > 0 && (
          <HStack space="2xl" className="mt-6 px-3">
            {selectedRegionList.map((region, index) => (
              <TouchableOpacity key={index} className="bg-zinc-200 dark:bg-zinc-400 rounded-2xl px-3 py-2" onPress={() => SelectHandler(region.id)}>
                <HStack space="md" className="items-center">
                  <FontAwesome6 iconStyle="solid" name="x" size={8} color="#444444ff" />
                  <Text size="2xs" className="text-stone-800">
                    {region.name}
                  </Text>
                </HStack>
              </TouchableOpacity>
            ))}
          </HStack>
        )}
      </VStack>
    </View>
  );
}

export default TargetRegion;
