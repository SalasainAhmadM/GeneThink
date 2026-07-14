import React from 'react';
import { View } from 'react-native';
import ScientistSvg from '../../assets/svgs/scientist-svgrepo-com.svg';

export default function Scientist() {
    return (
        <View style={{
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ScientistSvg width={70} height={70} />
        </View>
    );
}
