import React from 'react';
import { View, ActivityIndicator, } from 'react-native';

const Spinner = () => (
    <View style={styles.spinnerStyle}>
        <ActivityIndicator
            size="large"
            color="#0000ff"
        />
    </View>
);

const styles = {
    spinnerStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export { Spinner };
