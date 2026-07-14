import React from 'react';
import { View } from 'react-native';
import BrainStormSvg from '../../assets/svgs/brainstorm-svgrepo-com.svg';

export default function BrainStorm() {
    return (
        <View style={{
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <BrainStormSvg width={70} height={70} />
        </View>
    );
}
