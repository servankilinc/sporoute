import {RouteProps} from '@/src/constants/RouteNames';
import {useColors} from '@/src/hooks';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {PropsWithChildren} from 'react';
import {Image, Text, View} from 'react-native';
import {Divider} from '@/components/ui/divider';
import {NavigationProp, ParamListBase, RouteProp, useNavigation, useRoute} from '@react-navigation/native';

export class HeaderProps {
  title?: string;
  returnbackEnable?: boolean = false;
  returnHomeEnable?: boolean = false;
}

type HeaderSectionProps = PropsWithChildren<HeaderProps>;

export default function Header({title}: HeaderSectionProps): React.JSX.Element {
  const colors = useColors();

  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute<RouteProp<ParamListBase>>();

  const pathname = route.name;

  // pathname’i RouteProps ile eşleştir
  if (title == null) {
    const routeEntries = Object.values(RouteProps);
    for (const routeObj of routeEntries) {
      if (routeObj.name === pathname) {
        title = routeObj.title;
        break;
      }
    }
  }

  return (
    <View className="rounded-b-xl shadow-xl gap-3 px-6 py-4" style={{backgroundColor: colors.headerBackground}}>
      <View className="h-6 flex flex-col">
        <Image className="size-full" style={{objectFit: 'contain'}} source={require('@/assets/images/logo/logo-no-background.png')} />
      </View>
      <Divider style={{backgroundColor: colors.silent}} />
      <View className="flex flex-row justify-between items-center content-center">
        {navigation.canGoBack() ? (
          <FontAwesome6 iconStyle="solid" name="chevron-left" size={22} color={colors.icon} onPress={() => navigation.goBack()} />
        ) : (
          // <FontAwesome6 name="chevron-left" size={16} color={colors.icon} />
          <View className="w-4" />
        )}

        <Text className="text-center text-sm" style={{color: colors.text}}>
          {title}
        </Text>

        <FontAwesome6 iconStyle="solid" name="house" size={22} color={colors.icon} onPress={() => navigation.navigate(RouteProps.home.name)} />
      </View>
    </View>
  );
}
