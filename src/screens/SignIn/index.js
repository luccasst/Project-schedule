import React, { useState, useContext } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../context/UserContext';

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

  const handleSignClick = async() => {
      if(emailField!= '' && senhalField !='') {
          let json = await Api.signIn(emailField, senhalField);
          if(json.token) {
            await AsyncStorage.setItem('token', json.token);
            userDispatch({
              type: 'setAvatar',
              payload:{
                avatar: json.data.avatar
              }
            });

            navigation.reset({
              routes:[{name: 'MainTab'}]
            });

          } else {
            alert('E-mail e/ou senha errados!')
          }
      } else {
        alert("Preencha os campos!");
      }
  }

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