import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Logo from '../../../assets/logo.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const corFundo =    '#E5E6E8';              // 007
const corPadrao =   '#070607';              // 008
const corDestaque = '#070607';              // 009

const corSecundaria = '#082D95';                // 013

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    email: "",
        senhanova: "",
        confirmasenhanova: "",
    };
  }
  mudasenha = async ()  => {
    var resultado = 0;
      try{
        await AsyncStorage.setItem('email', this.state.email)
        await AsyncStorage.setItem('senhanova', this.state.senhanova)
        await AsyncStorage.setItem('confirmasenhanova', this.state.confirmasenhanova)
        Keyboard.dismiss();
        const valores1 = await AsyncStorage.multiGet(['email','senhanova','confirmasenhanova']);
        await axios.post('http://marciogas.herokuapp.com/api/senhaApp', {valores1})
        Alert.alert("Sucesso!", "A sua senha foi trocada com sucesso!");
        }catch (e){
        Alert.alert("Erro!", "A sua senha não foi alterada");
        console.log (e);
        }
        this.props.navigation.navigate('Login')
    }
        
  
    
    render() {
      const { goBack } = this.props.navigation;
        return(
          <View style={styles.container}>

            <TouchableOpacity 
              style = {styles.seta}
              onPress = {()=> goBack()}>
                <Feather name="chevron-left" size={38} color= { corPadrao }/>
            </TouchableOpacity>

            <Image 
              source={Logo} 
              style={styles.logo} />

            <Text style={styles.subTitulo}>
              O seu Gás em casa
            </Text>

            <Text style={styles.titulo}>
              Altere sua senha
            </Text>
  
            <View >
              <TextInput 
                value={this.state.senha}
                style={styles.card}
                keyboardType= 'email-address'
                placeholder = 'Telefone, e-mail ou nome'
                onChangeText = {texto => this.setState({email : texto})} 
              />
            </View>
  
            <View >
              <TextInput 
                value={this.state.senhanova}
                style={styles.card}
                placeholder = 'Nova Senha'
                onChangeText = {texto => this.setState({senhanova : texto})}
                secureTextEntry={true}
              />
              <TextInput 
                value={this.state.confirmanovasenha}
                style={styles.card}
                placeholder = 'Confirme a nova senha'
                onChangeText = {texto => this.setState({confirmasenhanova : texto})}
                secureTextEntry={true}
              />
            </View>
            
            <TouchableOpacity style = {styles.button} onPress = { this.mudasenha }>
              <Text style={{color: 'white'}}>
                SALVAR
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
        resizeMode : "contain",
        alignSelf: 'center',
    },

    subTitulo: {
        textAlign: 'center',
        color: corPadrao,
        fontWeight: 'bold',
        paddingBottom: '10%',
        padding: 10,
    },
    
    titulo: {
        textAlign: 'center',
        color: corDestaque,
        fontWeight: 'bold',
        paddingBottom: '10%',
        fontSize: 30,
    },

    seta: {
        marginTop: 30,
    },

    card: {
      marginLeft: 20,
      marginRight: 20,
      padding:5,
      borderStyle:'solid',
      borderColor: corPadrao,
      borderWidth: 2,
      borderRadius: 15,
      shadowRadius: 0.5,
      backgroundColor: 'transparent',
      marginBottom: '10%',
    },

    cardContent: {
      flexDirection: "row",
    },
    
    button: {
      borderRadius: 40,
      paddingVertical: 15,
      paddingHorizontal: 40,
      backgroundColor: corDestaque,
      textAlign: 'center',
      borderColor: corPadrao,
      borderWidth: 2,
      shadowColor: 'black',
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowOffset: {
      height: 1,
      width: 8 },
      alignSelf: 'center',
    },
    
    divider1: {
      backgroundColor: corPadrao,
      height: 2,
      margin: 10 
    },
    
    input: { //Caixa do Formulário
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '50%',
      padding: 8,
      borderColor: corSecundaria,
      borderWidth: 1.5,
      borderRadius: 3,
    },

  });