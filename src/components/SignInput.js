import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';

const InputAera = styled.View`
    width: 100%;
    height: 60px;
    background-color: #83D6E3;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;
const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    margin-left: 10px;
`;

export default ({IconSvg, placeholder, value, onChangeText, password}) => {
    return (
        <InputAera>
        
        <Image source={IconSvg} style={{ width: 24, height: 24 }} />
        <Input
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={password}
        />
        </InputAera>
    );
}