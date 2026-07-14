import React from 'react';
import { View } from 'react-native';
import DNASvg from '../../assets/svgs/dna-svgrepo-com.svg';

export default function DNA() {
    return (
        <View style={{
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <DNASvg width={70} height={70} />
        </View>
    );
}
