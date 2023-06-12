import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../../assets/logo.png';

const corTexto =    'white';     // 001 - Altera a cor do texto onde está escrito 'Login' e 'Cadastro'
const corPadrao =   '#FE1717';   // 002 - Altera a cor de fundo dos botões
const corDestaque = '#070607';   // 003 - Altera a cor de borda dos botões

export default function tela () {
  const navigation = useNavigation ();

return (

  <View style={styles.container}>
    <Image 
      source={logoImg}
      style={styles.logo}
    />

    <TouchableOpacity 
        style = {styles.button1}
        onPress = {() => navigation.navigate('Login') }>
      <Text style = {styles.buttonText}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity 
        style = {styles.button2}
        onPress = {() => navigation.navigate('Cadastro') }>
      <Text style = {styles.buttonText}>Cadastro</Text>
    </TouchableOpacity>

  </View>
  );
}
const styles = StyleSheet.create({

  button1: {
      borderRadius: 40,
      paddingVertical: 15,
      paddingHorizontal: 45,
      backgroundColor: corPadrao,
      textAlign: 'center',
      borderColor: corDestaque,
      borderWidth: 2,
      shadowColor: 'black',
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowOffset: {
      height: 1,
      width: 1 },
      alignSelf: 'center',
      marginBottom: 20,
  },

  button2: {
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 28,
    backgroundColor: corPadrao,
    textAlign: 'center',
    borderColor: corDestaque,
    borderWidth: 2,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {
    height: 1,
    width: 1 },
    alignSelf: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: corTexto,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 15,
    textAlign: 'center'
    
  },
  
  logo: {
    width: 250,
    height: 250,
    resizeMode : "contain",
    paddingBottom: '100%',
  },

  container: {
    flex: 1,
    backgroundColor: '#E5E6E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  
});  