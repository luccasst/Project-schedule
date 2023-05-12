import React, { useEffect, useContext } from 'react';
import { View, Image } from 'react-native';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import BarberLogo from '../../assets/bigode.png';
import { UserContext } from '../../context/UserContext';
import Api from '../../Api';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token !== null) {
               let res = await Api.checkToken(token);
               if(res.token) {
                await AsyncStorage.setItem('token', res.token);
                userDispatch({
                  type: 'setAvatar',
                  payload:{
                    avatar: res.data.avatar
                  }
                });
      
                navigation.reset({
                  routes:[{name: 'MainTab'}]
                });
               } else {
                navigation.navigate('SignIn');
               }
                
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