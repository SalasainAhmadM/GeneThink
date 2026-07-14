import React from 'react';
import { View } from 'react-native';
import StarInactiveSvg from '../../assets/svgs/star-inactive-svgrepo-com.svg';
import StarSvg from '../../assets/svgs/star-svgrepo-com.svg';

export default function Star({ active }: { active: boolean; }) {
    return (
        <View style={{
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {active ?
                <StarSvg width={70} height={70} />
                :
                <StarInactiveSvg width={70} height={70} />
            }
        </View>
    );
}
