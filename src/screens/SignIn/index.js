import React, { useState, useContext } from 'react';
import { View, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../context/UserContext';
import * as Keychain from 'react-native-keychain';

import {
    Container,
    InputAera,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    SignMessageBarberPoint,
    SignMessageButtonPoint
} from './styles';

import Api from '../../Api';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/bigode.png';
import EmailIcon from '../../assets/mail.png';
import SenhaIcon from '../../assets/cadeado.png';
 
export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [senhalField, setSenhaField] = useState('');
  const [token, setToken] = useState(null);

  const handleSignClick = async () => {
    if (emailField.trim() === '' || senhalField.trim() === '') {
      Alert.alert('Preencha todos os campos!');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.0.39:3010/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailField,
          password: senhalField,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('token', data.access_token);
        navigation.reset({
          routes:[{name: 'MainTab'}]
        });
        
        console.log(data);
      } else {
        const errorData = await response.json();
        Alert.alert('Erro ao fazer login: ' + errorData.message);
      }
    } catch (error) {
      Alert.alert('Erro ao conectar-se ao servidor.');
      console.error(error);
    } 
  };
  const handleMessageButtonClick = () => {
      navigation.reset({
        routes: [{name: 'SignUp'}]
      });
  }

    return (
        <Container>
        <View>
        <Image source={BarberLogo} style={{ width: 200, height: 100 }} />
      </View>
      < InputAera>
      <SignInput
        IconSvg={EmailIcon}
        placeholder="Digite seu e-mail"
        value={emailField}
        onChangeText={t=>setEmailField(t)}
      />

      <SignInput
        IconSvg={SenhaIcon}
        placeholder="Digite sua senha"
        value={senhalField}
        onChangeText={t=>setSenhaField(t)}
        password={true}
      />

      
      <CustomButton onPress={handleSignClick}>
        <CustomButtonText>LOGIN</CustomButtonText>
      </CustomButton>

      </InputAera>

      <SignMessageButton onPress={handleMessageButtonClick}>
            <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
            <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
            <SignMessageBarberPoint>Quer cadastrar seu ponto?</SignMessageBarberPoint>
            <SignMessageButtonPoint>Cadastre aqui</SignMessageButtonPoint>
        </Container>
    )
}