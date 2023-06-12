import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Logo from '../../../assets/logo.png';
import Gas1 from '../../../assets/Gas1.png';
import Gas2 from '../../../assets/Gas2.png';
import Gas3 from '../../../assets/Gas3.png';
import agua20L from '../../../assets/agua20L.png';
import valvula from '../../../assets/valvula.png';
import NumericInput from 'react-native-numeric-input';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const corFundo =    '#E5E6E8';              // 007
const corPadrao =   '#070607';              // 008
const corDestaque = '#FE1717';              // 009

export default class escolheProduto extends Component {

  constructor(props) {
    super(props);
    this.state = {
    // 017 - Adicionando as states que serão usadas pelo celular
    preco1: "Carregando...",
    preco2: "Carregando...",
    preco3: "Carregando...",
    preco4: "Carregando...",
    preco5: "Carregando...",
    total1: 0,
    total2: 0,
    total3: 0,
    total4: 0,
    total5: 0,
    numBot1: 0,
    numBot2: 0,
    numBot3: 0,
    numBot4: 0,
    numBot5: 0,
    };
  }

  componentDidMount = async () => {
    // 018 - Adicionar novas variáveis de resultado abaixo
    var resultado1 = 0;
    var resultado2 = 0;
    var resultado3 = 0;                         
    var resultado4 = 0;                         
    var resultado5 = 0;                         

    try{
      await axios.get('http://marciogas.herokuapp.com/api/precobotijao')
      .then(function (response) {
        // 019 - Receber informação na nova variável abaixo
        resultado1 = response.data.botijao1
        resultado2 = response.data.botijao2    
        resultado3 = response.data.botijao3 
        resultado4 = response.data.agua 
        resultado5 = response.data.valvula 
           
      });
    } catch (e) {
    console.log(e)
    }

    // 020 - Atualizando os states que criamos com as informações dos resultados
    await this.setState({preco1 : resultado1})
    await this.setState({preco2 : resultado2})    
    await this.setState({preco3 : resultado3})  
    await this.setState({preco4 : resultado4})  
    await this.setState({preco5 : resultado5})  
    console.log(this.state.preco1)
    console.log(this.state.preco2)
    console.log(this.state.preco3)
    console.log(this.state.preco4)
    console.log(this.state.preco5)
    await this.setState({flag : 1})
  }

  // 021 - Multiplicando os preços atuais pela quantidade de produtos selecionados
  multiplicador1 = (value) => {
    var resultado = 0; 
    resultado = value * parseFloat(this.state.preco1);
    console.log({resultado})
    this.setState({total1 : resultado})
    this.setState({numBot1 : value})
  }
  
  multiplicador2 = (value) => {
    var resultado = 0; 
    resultado = value * parseFloat(this.state.preco2);
    console.log({resultado})
    this.setState({total2 : resultado})
    this.setState({numBot2 : value})
  }
  
  multiplicador3 = (value) => {
    var resultado = 0; 
    resultado = value * parseFloat(this.state.preco3);
    console.log({resultado})
    this.setState({total3 : resultado})
    this.setState({numBot3 : value})
  }
	
  multiplicador4 = (value) => {
    var resultado = 0; 
    resultado = value * parseFloat(this.state.preco4);
    console.log({resultado})
    this.setState({total4 : resultado})
    this.setState({numBot4 : value})
  }
	
  multiplicador5 = (value) => {
    var resultado = 0; 
    resultado = value * parseFloat(this.state.preco5);
    console.log({resultado})
    this.setState({total5 : resultado})
    this.setState({numBot5 : value})
  }
	
	
  // 022 - Guardando informacao na memoria do celular antes de ir para a proxima pagina
  passaPagina = async () => {
    var resultado = this.state.total1 + this.state.total2 + this.state.total3 + this.state.total4 + this.state.total5
    await AsyncStorage.setItem('resultado', JSON.stringify(resultado) )
    await AsyncStorage.setItem('numBotijao1', JSON.stringify(this.state.numBot1) )
    await AsyncStorage.setItem('numBotijao2', JSON.stringify(this.state.numBot2) )
    await AsyncStorage.setItem('numBotijao3', JSON.stringify(this.state.numBot3) )
    await AsyncStorage.setItem('numBotijao4', JSON.stringify(this.state.numBot4) )
    await AsyncStorage.setItem('numBotijao5', JSON.stringify(this.state.numBot5) )
    this.props.navigation.navigate('Confirmar')
  }
    
    render() {
      const { goBack } = this.props.navigation;
        return(
        <ScrollView style={styles.container} >
        
          <View style={styles.container}>
            <TouchableOpacity 
              style = {styles.seta}
              onPress = {()=> goBack()}>
                <Feather name="chevron-left" size={38} color={corPadrao} />
            </TouchableOpacity>
            <Image 
              source={Logo} 
              style={styles.logo} />
            <Text style={styles.subTitulo}>O seu Gás em casa</Text>
            <Text style={styles.titulo}>Escolha seu produto</Text>
            {!this.state.flag && <ActivityIndicator style={{flex: 1, flexDirection: 'row'}} size="large" color="#0B0D88" />}
            {this.state.flag && <View style={styles.card}>
            <Text style={styles.cardTitulo}>GLP 13 kg</Text>
            <View style={styles.cardContent}>
              <Image source={Gas1} 
              style={styles.gas} />
              <View style={styles.cardContentColuna}>
              <Text style={styles.cardPrice}>R$ {this.state.preco1}</Text>
              <NumericInput
                textColor={corPadrao}
                iconStyle={{ color: corDestaque }}
                borderColor= 'black' 
                rightButtonBackgroundColor='#white' 
                leftButtonBackgroundColor='white'
                totalWidth={120}
                rounded= 'true'
                separatorWidth= {0}
                onChange={value =>  this.multiplicador1(value)}  />
              </View>
            </View>
            </View>}
            {this.state.flag && <View style={styles.card}>
            <Text style={styles.cardTitulo}>GLP 20 kg</Text>
            <View style={styles.cardContent}>
              <Image source={Gas2} 
              style={styles.gas} />
              <View style={styles.cardContentColuna}>
              <Text style={styles.cardPrice}>R$ {this.state.preco2}</Text>
              <NumericInput
                textColor={corPadrao}
                iconStyle={{ color: corDestaque }}
                borderColor= 'black' 
                rightButtonBackgroundColor='#white' 
                leftButtonBackgroundColor='white'
                totalWidth={120}
                rounded= 'true'
                separatorWidth= {0}
                onChange={value =>  this.multiplicador2(value)}  />
              </View>
            </View>
            </View>}
            {this.state.flag && <View style={styles.card}>
            <Text style={styles.cardTitulo}>GLP 45 kg</Text>
            <View style={styles.cardContent}>
              <Image source={Gas3} 
              style={styles.gas} />
              <View style={styles.cardContentColuna}>
              <Text style={styles.cardPrice}>R$ {this.state.preco3}</Text>
              <NumericInput 
                textColor={corPadrao}
                iconStyle={{ color: corDestaque }}
                borderColor= 'black' 
                rightButtonBackgroundColor='#white' 
                leftButtonBackgroundColor='#white'
                totalWidth={120}
                rounded= 'true'
                separatorWidth= {0}
                onChange={value =>  this.multiplicador3(value)}  />
              </View>
            </View>
            </View>}
            {this.state.flag && <View style={styles.card}>
            <Text style={styles.cardTitulo}>Água 20L</Text>
            <View style={styles.cardContent}>
              <Image source={agua20L} 
              style={styles.gas} />
              <View style={styles.cardContentColuna}>
              <Text style={styles.cardPrice}>R$ {this.state.preco4}</Text>
              <NumericInput
                textColor={corPadrao}
                iconStyle={{ color: corDestaque }}
                borderColor= 'black' 
                rightButtonBackgroundColor='#white' 
                leftButtonBackgroundColor='white'
                totalWidth={120}
                rounded= 'true'
                separatorWidth= {0}
                onChange={value =>  this.multiplicador4(value)}  />
              </View>
            </View>
            </View>}
            {this.state.flag && <View style={styles.card}>
            <Text style={styles.cardTitulo}>Válvula Completa</Text>
            <View style={styles.cardContent}>
              <Image source={valvula} 
              style={styles.gas} />
              <View style={styles.cardContentColuna}>
              <Text style={styles.cardPrice}>R$ {this.state.preco5}</Text>
              <NumericInput
                textColor={corPadrao}
                iconStyle={{ color: corDestaque }}
                borderColor= 'black' 
                rightButtonBackgroundColor='#white' 
                leftButtonBackgroundColor='white'
                totalWidth={120}
                rounded= 'true'
                separatorWidth= {0}
                onChange={value =>  this.multiplicador5(value)}  />
              </View>
            </View>
            </View>}

            {this.state.flag && 
              <TouchableOpacity 
                style = {styles.button} 
                onPress = {() => this.passaPagina() }>
                  <Text style={{color: 'white'}}>
                    CONFIRMAR
                  </Text>
              </TouchableOpacity>}

            <Text style={styles.titulo}>             </Text>
            <Text style={styles.titulo}>             </Text>
            <Text style={styles.titulo}>             </Text>
            <Text style={styles.titulo}>             </Text>
            
          </View>
          
        </ScrollView>
        
        );
    }


}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: corFundo,
    },
    
    scrollView: {
      height: '100%',
      width: '100%',
      alignSelf: 'center',
      padding: 0,
    },

    contentContainer: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 250,
      backgroundColor: '#E5E6E8',
    },

    logo: {
        width: '30%',
        height: '10%',
        resizeMode : "contain",
        alignSelf: 'center',
        // marginTop: -40,
        // marginBottom: -30,
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
      padding:20,
      borderStyle: 'solid',
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 30,
      shadowRadius: 2,
      backgroundColor: "white",
      marginBottom: '10%',
    },

    contador: {
      backgroundColor: "red"
    },

    cardTitulo: {
      textAlign: 'left',
      color: corDestaque,
      fontWeight: 'bold',
      fontSize: 25,
    },

    cardContent: {
      flexDirection: "row",
    },

    cardContentColuna: {
      flexDirection: "column",
    },

    cardPrice: {
      textAlign: 'left',
      color: corPadrao,
      fontWeight: 'bold',
      marginTop: 35,
      fontSize: 22,
    },

    gas: {
      resizeMode : "center",
      flex: 0.4,
      height: 150,
      marginRight: 30
    },

    button: {
      borderRadius: 40,
      paddingVertical: 15,
      paddingHorizontal: 40,
      backgroundColor: corDestaque,
      textAlign: 'center',
      borderColor: corPadrao,
      borderWidth: 2,
      shadowColor: '#FE1717',
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowOffset: {
      height: 1,
      width: 1 },
      alignSelf: 'center',
    },

  });