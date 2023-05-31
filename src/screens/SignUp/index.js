import React, { useState, useContext } from 'react';
import { View, Image, Alert, Text, StyleSheet } from 'react-native';
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
    SignMessageButtonTextBold
} from './style';

import SignInput from '../../components/SignInput';

import Api from '../../Api';

import BarberLogo from '../../assets/bigode.png';
import EmailIcon from '../../assets/mail.png';
import SenhaIcon from '../../assets/cadeado.png';
import PerfilIcon from '../../assets/perfil.png';
 
export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const [namelField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [senhalField, setSenhaField] = useState('');
  const [confirmedSenha, setConfirmedSenha] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    successMessageContainer: {
      backgroundColor: '#e6f3ff',
      padding: 10,
      borderRadius: 5,
    },
    successMessageText: {
      color: '#007bff',
      fontSize: 16,
      textAlign: 'center',
    },
  });
  
 

  const handleSignClick = async () => {
    if (namelField.trim() === '' || emailField.trim() === '' || senhalField.trim() === '' || confirmedSenha.trim() === '') {
      Alert.alert("Preencha todos os campos!");
      return;
    }
  
    if (senhalField !== confirmedSenha) {
      Alert.alert("A senha não confere!");
      return;
    }
  
    try {
      const response = await fetch('http://192.168.0.39:3010/usuario-comum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: namelField,
          email: emailField,
          password: senhalField,
          passwordConfirmation: confirmedSenha
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        setAccountCreated(true);
        console.log(data);
        setTimeout(() => {
          navigation.navigate('SignIn');
          
        }, 5000);
      } else {
        const errorData = await response.json();
        Alert.alert("Erro ao cadastrar usuário: " + errorData.message);
      }
    } catch (error) {
      Alert.alert("Erro ao conectar-se ao servidor.");
      console.error(error);
    }
  }
  
  

  const handleMessageButtonClick = () => {
      navigation.navigate('SignIn');
  }

    return (
        <Container>
        <View>
        <Image source={BarberLogo} style={{ width: 200, height: 100 }} />
      </View>
      {accountCreated && (
  <View style={styles.successMessageContainer}>
    <Text style={styles.successMessageText}>Conta criada com sucesso!</Text>
  </View>
)}

      < InputAera>
      <SignInput
        IconSvg={PerfilIcon}
        placeholder="Digite seu nome"
        value={namelField}
        onChangeText={t=>setNameField(t)}
      />

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

        <SignInput
        IconSvg={SenhaIcon}
        placeholder="Confirme sua senha"
        value={confirmedSenha}
        onChangeText={t=>setConfirmedSenha(t)}
        password={true}
      />

      
      <CustomButton onPress={handleSignClick}>
        <CustomButtonText>CADASTRAR</CustomButtonText>
      </CustomButton>

      </InputAera>

      <SignMessageButton onPress={handleMessageButtonClick}>
            <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
            <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
        </Container>
    )
}