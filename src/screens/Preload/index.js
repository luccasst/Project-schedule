import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import BarberLogo from '../../assets/bigode.png';

export default () => {

    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token !== null) {
                //validar token
                
            } else {
                navigation.navigate('SignIn');
            }
        }
        checkToken();
    }, [])

    return (
        <Container>
        <View>
        <Image source={BarberLogo} style={{ width: 200, height: 100 }} />
      </View>
      <LoadingIcon size= "large" color="#ffffff" />
      </Container>
    );
}