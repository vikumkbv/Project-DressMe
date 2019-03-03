import React from 'react';
import { View, ActivityIndicator,} from 'react-native';

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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        flexGrow: 0.2,
        width: 100,
        marginTop: 0,
        marginBottom: 15,
        borderRadius: 25,
        opacity: 0.9,  
    }
};

export { Spinner };
