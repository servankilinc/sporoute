import React, {PropsWithChildren} from 'react';
import {View, ScrollView} from 'react-native';
import Footer from '@/src/components/footer/Footer';
import Header, {HeaderProps} from '@/src/components/header/Header';
import {useColors} from '@/src/hooks';

type SectionProps = PropsWithChildren<HeaderProps>;

export default function AppLayout({children, title, returnbackEnable, returnHomeEnable}: SectionProps): React.JSX.Element {
  const colors = useColors();
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header title={title} returnbackEnable={returnbackEnable} returnHomeEnable={returnHomeEnable} />
      <ScrollView style={{marginHorizontal: 12, marginTop: 12, marginBottom: 24 }}>{children}</ScrollView>
      <Footer />
    </View>
  );
}
