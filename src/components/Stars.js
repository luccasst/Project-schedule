import React from 'react';
import styled from 'styled-components/native';
import StarFull from '../assets/estrela.png';
import StarHalf from '../assets/avaliacao.png';
import StarEmpty from '../assets/empty.png';
import { View, Image } from 'react-native';

const StarArea = styled.View`
flex-direction: row;
`;

const StarView = styled.View``;

const StarText = styled.Text`
font-size: 12px;
font-weight: bold;
margin-left: 5px;
color: #737373;
`;

export default ({stars, showNumber}) => {
    let floor = Math.floor(stars);
    let left = stars - floor;
    let s = [0, 0, 0, 0, 0];
    
    for(var i = 0; i < floor; i++) {
        s[i] = 2;
    }
    if(left > 0) {
        s[i] = 1;
    }

    return (
        <StarArea>
            {s.map((i, k) => (
                <StarView key={k}>
                    <View>
                    {i === 0 && <Image source={StarEmpty} style={{width: 18, height: 18}} /> }
                    {i === 1 && <Image source={StarHalf} style={{width: 18, height: 18}} /> }
                    {i === 2 && <Image source={StarFull} style={{width: 18, height: 18}} /> }
                   
                    </View>
                </StarView>
            ))}
            {showNumber && <StarText>{stars}</StarText>}
        </StarArea>
    )
}