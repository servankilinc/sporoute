import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

export default function SafeTemplate({ children }: PropsWithChildren): React.JSX.Element {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F4F4"
    },
});