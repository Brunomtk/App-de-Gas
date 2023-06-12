import React, { Component } from 'react';
import { StyleSheet, Keyboard, TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Logo from '../../../assets/logo.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const corFundo =    '#E5E6E8';              // 007
const corPadrao =   '#070607';              // 008
const corDestaque = '#070607';              // 009

export default class Cadastro extends Component {

    constructor(props) {
      super(props);
      this.state = {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      };
    }
    
    fazCadastro = async ()  => {
      await AsyncStorage.clear();
      var erro = null;
      var resultado = 0;
      if(this.state.senha == this.state.confirmarSenha){
        try{
          await AsyncStorage.setItem('1nome', this.state.nome)
          await AsyncStorage.setItem('2email', this.state.email)
          await AsyncStorage.setItem('3senha', this.state.senha)
          Keyboard.dismiss();
        } catch(e) {
          console.log(e)
        }

        let keys;
        keys = await AsyncStorage.getAllKeys();
        const valores = await AsyncStorage.multiGet(keys);

        try{
          await axios.post('http://marciogas.herokuapp.com/api/cadastroapp', {valores})
          .then(function (response) {
            resultado = JSON.stringify(response.data)
            console.log(resultado)
          })
        } catch (e) {
        console.log(e)
        erro = e;
        }
        if(erro == null) {
          this.props.navigation.navigate('Produtos')
        } else {
          console.log(erro)
          Alert.alert("Erro!", "O e-mail já está cadastrado, tente fazer login.");
        }
    }else{
      Alert.alert("Senha incorreta", "A sua senha não está igual à sua confirmação. Tente novamente!");
    }
    }
    
    render() {

      const { goBack } = this.props.navigation;

        return(
          <View style={styles.container}>
            <TouchableOpacity 
              style = {styles.seta}
              onPress = {()=> goBack()}>
                <Feather name="chevron-left" size={38} color= { corPadrao } />
            </TouchableOpacity>
            <Image 
              source={Logo} 
              style={styles.logo} />
            <Text style={styles.subTitulo}>O seu Gás em casa</Text>
            <Text style={styles.titulo}>Registre-se</Text>
            <View >

              <TextInput 
                value={this.state.nome}
                style={styles.card}
                placeholder = 'Nome do Usuário'
                onChangeText = {texto => this.setState({nome : texto})} 
              />

            </View>
            <View >

              <TextInput 
                value={this.state.email}
                style={styles.card}
                keyboardType= 'email-address'
                placeholder = 'Telefone, e-mail ou nome'
                onChangeText = {texto => this.setState({email : texto})} 
              />

            </View>

            <View >
              <TextInput 
                value={this.state.senha}
                style={styles.card}
                placeholder = 'Senha'
                onChangeText = {texto => this.setState({senha : texto})}
                secureTextEntry={true}
              />
            </View>

            <View >            
              <TextInput 
                value={this.state.confirmarSenha}
                style={styles.card}
                placeholder = 'Confirmar Senha'
                onChangeText = {texto => this.setState({confirmarSenha : texto})}
                secureTextEntry={true}
              />
            </View>

            <TouchableOpacity style = {styles.button} onPress = { this.fazCadastro }>
              <Text style={{color: 'white'}}>
                REGISTRAR
              </Text>
            </TouchableOpacity>

        </View>
        );
    }
}



const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: corFundo,
    },

    logo: {
        width: '30%',
        height: '10%',
        resizeMode : 'contain',
        alignSelf: 'center',
    },

    subTitulo: {
        textAlign: 'center',
        color: corPadrao,
        fontWeight: 'bold',
        paddingBottom: '5%',
    },

    titulo: {
        textAlign: 'center',
        color: corDestaque,
        fontWeight: 'bold',
        paddingBottom: '3%',
        fontSize: 30,
    },

    seta: {
        marginTop: 30,
    },

    card: {
      marginLeft: 20,
      marginRight: 20,
      padding:5,
      borderStyle: 'solid',
      borderColor: corPadrao,
      borderWidth: 2,
      borderRadius: 15,
      shadowRadius: 2,
      backgroundColor: 'transparent',
      marginBottom: '10%',
    },

    button: {
      borderRadius: 40,
      paddingVertical: 15,
      paddingHorizontal: 40,
      backgroundColor:'#FE1717',
      textAlign: 'center',
      borderColor: corPadrao,
      borderWidth: 2,
      shadowColor: 'black',
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowOffset: {
        height: 1,
        width: 1 },
      alignSelf: 'center',
    },

  });