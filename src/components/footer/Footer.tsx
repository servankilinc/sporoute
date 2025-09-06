import { FontAwesome5 } from "@react-native-vector-icons/fontawesome5";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { Path } from 'react-native-svg';
import { useColors } from '../../hooks';
import { Icon, createIcon } from '@/components/ui/icon';
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { RouteProps } from "@/src/constants/RouteNames";

export default function CustomFooter() {
  const colors = useColors();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const widthChart = 84;
  const data = {data: [0.75]};
  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(7, 157, 75, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const TreadmillIcon = createIcon({
    viewBox: '0 0  279 280',
    path: (
      <>
        <Path
          d="M133 .5c29.971.671 28.5 50.37-3 49-31.5-1.37-26.971-49.671 3-49zM271.5 89L229 131c-.333 1.5-.6 4.8 1 6 1.6 1.2 5 .5 6.5 0l12.5-12.5-20 110c-17-.5-27 12.5-27 24s11.5 21 22 21 20.5-7.5 22-19c1.2-9.2-5.833-19.167-9.5-23l26-126 15.5-16c.667-1.167 1.6-4 0-6s-5-1.167-6.5-.5zM91.5 175C91 170 74 158 74 158c-2 3.667-5 12.4-5 16l-44.5-2s-7 2.5-7 11c0 7.5 8 11 8 11l53 3s13.5-17 13-22z"
          fill={colors.footerItem}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M91 84.5c-3.833.167-15.3 2.3-20.5 5.5-6.5 4-13 28.5-19 33.5-4.8 4-11.333 4.167-14.5 2-2.667-1.667-7.2-9-4-17S45 81 54 69c14-8.5 31.439-16.986 57.5-17 21.943-.012 34 21 47 44.5h35l.051.02c3.35 1.34 10.051 4.02 10.449 11.98.4 8-6.833 11.167-10.5 12.5 0 0-44 1.5-45.5 0s-13-15.7-15-16.5c-2.5-1-8 9.5-12 36 8.895 10.459 23.384 14.952 27 25.5 6 17.5 19.5 54 12.5 73l36-1.5c-2.5 3.333-7.4 12.2-7 21 .4 8.8 4.833 17.667 7 21H11C7.5 278 .5 272.8.5 264s7-15 10.5-17l135.5-7c-5.5-5.833-14.9-27.8-18.5-59-16.167-12-50.2-35.9-51-39.5-1-4.5-.5-19 14-57zm-74 173c3.5 0 6 3.5 6 6s-2.5 5-6 5c-3.518 0-5.5-2.5-5.5-5s1-6 5.5-6z"
          fill={colors.footerItem}
        />
      </>
    ),
  });

  const MeasureIcon = createIcon({
    // createIcon function is imported from '@gluestack-ui/themed'
    viewBox: '0 0 307 272',
    path: (
      <>
        <Path
          d="M290.522 271.5c5.333 0 16-3.1 16-15.5v-92.5c-.667-5.333-4.8-16-16-16h-185c-14.5 0-83-19.615-83-66.015 0-46.4 71-62.152 106.5-61.485 28.667.333 85.505 14.015 86.5 48 1.478 50.5-138.5 38.5-138 16.5.318-13.996 21-18 39-18s20.334 2.337 27.5 5c8.098 3.01 11 5 15 5s9-4.09 4-15c-3.584-7.82-26.5-15-49.5-14s-56.5 11.5-56.5 38c0 25 42.978 34.5 69.978 36.5 26.736 1.98 100.049.039 101.479.001.044-.002.042-.001.087-.001 2.483-.036 6.443-2.035 7.456-6 .891-3.488 6.664-38.081 0-58.5-11.097-34-49.993-57-111-57C66.702.5 12.778 25.416 2.852 57.862c-.23.747-.578 1.431-.79 2.183-3.787 13.394-1.556 135.996.35 147.894.07.432.208.74.424 1.121 9.829 17.349 38.083 51.942 71.192 55.193 2.748.27 4.994-1.992 4.994-4.753v-26.672c0-.87.215-1.731.673-2.471 1.516-2.448 4.271-5.857 9.827-5.857 6.938 0 10.237 3.889 11.266 6.342.18.428.234.894.234 1.358v34.3a5 5 0 005 5h12.5a5 5 0 005-5v-9.454c0-.69.133-1.375.446-1.99 1.42-2.788 4.489-6.913 10.554-6.556 5.811.342 8.384 3.872 9.842 6.348.442.75.658 1.61.658 2.48v9.172a5 5 0 005 5h14a5 5 0 005-5v-9.537c0-.636.112-1.269.383-1.844 1.243-2.634 4.046-6.619 10.117-6.619 5.919 0 9.236 3.788 10.876 6.418.434.697.624 1.511.624 2.332v9.25a5 5 0 005 5h13.5a5 5 0 005-5v-33.398c0-1.042.313-2.067.948-2.893 1.871-2.434 5.026-5.709 10.052-5.709 5.29 0 8.636 3.627 10.04 6.085.335.588.46 1.264.46 1.941V266.5a5 5 0 005 5h12a5 5 0 005-5v-9.689c0-.537.076-1.076.3-1.564 1.208-2.63 4.667-6.747 11.2-6.747 6.763 0 9.644 4.412 10.383 7.019.09.317.117.647.117.976V266.5a5 5 0 005 5h5.5z"
          fill={colors.footerItem}
        />
      </>
    ),
  });
  return (
    <View
      className="flex flex-row items-center px-4"
      style={{
        backgroundColor: colors.themeBackground,
        justifyContent:"space-around",
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
      }}>
        
      <View className="flex flex-row gap-8">
        <Pressable onPress={() => navigation.navigate(RouteProps.exercises.name)} className="flex flex-col items-center">
          <Icon as={TreadmillIcon} size="footer" />
          <Text style={{fontSize: 10, color: colors.footerItem}}>{RouteProps.exercises.title}</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate(RouteProps.programs.name)} className="flex flex-col items-center">
          <FontAwesome6 iconStyle="solid" name="file-invoice" size={24} color={colors.footerItem} />
          <Text style={{fontSize: 10, color: colors.footerItem}}>{RouteProps.programs.title}</Text>
        </Pressable>
      </View>

      <View className="-translate-y-1/2 aspect-square rounded-full" style={{width:widthChart, backgroundColor: colors.background}}>
        <ProgressChart data={data} width={widthChart} height={widthChart} strokeWidth={8} chartConfig={chartConfig} hideLegend={true} />
        <View className='flex justify-center items-center absolute size-full m-0 p-0'>
          <Text className='text-center self-center' style={{color: colors.text}}>75%</Text>
        </View>
      </View>

      <View className="flex flex-row gap-8">
        <Pressable onPress={() => navigation.navigate(RouteProps.myInfo.name)} className="flex flex-col items-center">
          <Icon as={MeasureIcon} size="footer" />
          <Text style={{fontSize: 10, color: colors.footerItem}}>{RouteProps.myInfo.title}</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate(RouteProps.options.name)} className="flex flex-col items-center">
          <FontAwesome5 iconStyle="solid" name="user-cog" size={24} color={colors.footerItem} />
          <Text style={{fontSize: 10, color: colors.footerItem}}>{RouteProps.options.title}</Text>
        </Pressable>
      </View>
    </View>
  );
}
