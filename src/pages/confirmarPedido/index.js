import React, { Component } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, TextInput, Alert, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Logo from '../../../assets/logo.png';
import Gas1 from '../../../assets/entrega.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const corFundo =    '#E5E6E8';              // 007
const corPadrao =   '#070607';              // 008
const corDestaque = '#FE1717';              // 009
const corSecundaria = '#FF1520';



export default class confirmarPedido extends Component {

  constructor(props) {
    super(props);
    this.state = {
    flagDinheiro: null,
    troco: "00",
    nome: "",
    valor: 0,
    endereco: '',
    pagamento: '',
    bairro:'',
    troco: '',
    };
  }

  componentDidMount = async () => {
    await this.setState({valor: await AsyncStorage.getItem('resultado')})
  }

  enviaValores = async () => {
    var resultado = 0;
    var var_email = await AsyncStorage.getItem('2email') 
    var var_valor = await AsyncStorage.getItem('resultado') 
    var botijao1 = await AsyncStorage.getItem('numBotijao1')
    var botijao2 = await AsyncStorage.getItem('numBotijao2')
    var botijao3 = await AsyncStorage.getItem('numBotijao3')
    var botijao4 = await AsyncStorage.getItem('numBotijao4')
    var botijao5 = await AsyncStorage.getItem('numBotijao5')
  
    this.setState({nome: var_email})
  
    if(this.state.troco == ""){
      this.setState({troco:"00"})
    }
  
    var valores = {
      "nome": this.state.nome, 
      "botijao1": botijao1,
      "botijao2": botijao2,
      "botijao3": botijao3,
      "agua": botijao4,
      "valvula": botijao5,
      "valor": var_valor,
      "endereco": this.state.endereco,
      "bairro": this.state.bairro,
      "pagamento":this.state.pagamento,
      "troco": this.state.troco
    }
  
    try{
      await axios.post('http://marciogas.herokuapp.com/api/pedido',valores)
      .then(function (response) {
        resultado = response.data;
      });
    }
    catch (e) { //esse aqui retorna se der erro
      console.log(e);
    }
    
    if(resultado =! 0) {
      Alert.alert("Sucesso!", "O seu pedido já foi registrado!");
      
      // Abre o aplicativo WhatsApp com o número de telefone e mensagem pré-definidos
      const phoneNumber = '+5538997241243';
      const message = `Olá meu email é ${var_email} , meu pedido foi cadastrado com sucesso! \n Os seguintes itens foram selecionados:\n GLP 13KG = ${botijao1};\n GLP 20KG = ${botijao2};\n GLP 45KG = ${botijao3};\n Água de 20 L = ${botijao4};\n Valvula completa = ${botijao5};\n 
      \n Endereço: ${this.state.endereco},${this.state.bairro}\n
      Forma de pagamento : ${this.state.pagamento}\n
      Troco = ${this.state.troco} 
      VALOR TOTAL = ${var_valor}`;
      const url = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(message)}`;
      Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {
            console.log(`Não foi possível abrir o URL: ${url}`);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch((err) => console.error('Erro ao enviar mensagem: ', err));
      
      this.props.navigation.navigate('Produtos');
    }
    else {
      Alert.alert("Erro", JSON.stringify(resultado));
    }
  }

  pedeTroco = (value) =>  {
    this.setState({flagDinheiro : null})
    if(value == 'dinheiro') {
      this.setState({flagDinheiro : 1})
    } else {
      this.setState({troco : "00"})
    }
    this.setState({pagamento : value})
  }


    render() {
        const { goBack } = this.props.navigation;
        
        return(
          <ScrollView style={styles.container}>
          <View>
          
            <View style={styles.container}>
              <TouchableOpacity 
                style = {styles.seta}
                onPress = {()=> goBack()}>
                  <Feather name="chevron-left" size={38} color={ corPadrao } />
              </TouchableOpacity>
              <Image 
                source={Logo} 
                style={styles.logo} />
              <Text style={styles.subTitulo}>O seu Gás em casa</Text>
              <Text style={styles.titulo}>HORÁRIO E LOCAL DE ATENDIMENTO:</Text>
              <Text style={styles.titulo2}>Seg - Sáb das 8h às 19h | Dom das 8h às 12h</Text>
              <Text style={styles.titulo2}>Uberlândia - MG</Text>
              <View style={styles.card}>
              <Text style={styles.cardTitulo}>Confirmar pedido:</Text>
              <View style={styles.cardContent}>
                <Image source={Gas1} 
                style={styles.gas} />
                <View style={styles.teste}>
                <Text style={styles.cardPrice}> VALOR TOTAL :R$ {this.state.valor}</Text>
                <Text style={styles.titulo}>Endereço</Text>
                <TextInput 
                multiline
                numberOfLines={2}
                value={this.state.endereco}
                style = {styles.inputEndereco}
                placeholder = 'Endereço de entrega (Rua e número)'
                onChangeText = {texto => this.setState({endereco : texto})} 
                />
                <Text style={styles.titulo}>Bairro</Text>
                <TextInput 
                multiline
                numberOfLines={2}
                value={this.state.bairro}
                style = {styles.inputEndereco}
                placeholder = 'Bairro '
                onChangeText = {texto => this.setState({bairro : texto})} 
                />
                
                </View>
              </View>
              </View>
              <Text style={styles.titulo}>Qual será o método de pagamento?</Text>
              <View style={styles.pickerContainer}>
              <RNPickerSelect
                style={{	inputAndroid: {
                  color: '#aba',
                  justifyContent: 'center',
                  textAlign: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  fontSize: 18,
                },
                }}
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => this.pedeTroco(value)}
                placeholder={{label: 'Método de pagamento', value: null}}
                items={[
                    { label: 'Cartão de crédito', value: 'credito' },
                    { label: 'Cartão de débito', value: 'debito' },
                    { label: 'Dinheiro', value: 'dinheiro' },
                ]}
                
              />
              </View>
              <View style={{flexDirection:"row", alignSelf:"center", marginBottom: 20}}>
              {this.state.flagDinheiro && <Text style={{textAlignVertical: "center", color:"#00c1a4", fontSize:20, fontWeight:"bold", marginLeft:"auto"}}>Troco para R$ </Text>}
              {this.state.flagDinheiro && <TextInput 
                value={this.state.troco}
                style = {{     
                width: 'auto',
                padding: 8,
                borderColor: corSecundaria,
                borderWidth: 1.5,
                borderRadius: 3,}}
                keyboardType= 'numeric'
                placeholder = '  '
                onChangeText = {texto => this.setState({troco : texto})} 
              />}
              
              </View> 
              <TouchableOpacity 
                style = {styles.button} 
                onPress = {this.enviaValores}> 
                <Text style={{color: 'white'}}>CONFIRMAR</Text>
              </TouchableOpacity>
              <Text style={styles.titulo}>             </Text>
              <Text style={styles.titulo}>             </Text>
              <Text style={styles.titulo}>             </Text>
              <Text style={styles.titulo}>             </Text>
              <Text style={styles.titulo}>             </Text>
              <Text style={styles.titulo}>             </Text>
              <Text style={styles.titulo}>             </Text>
            </View>
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

    input: { //Caixa do Formulário
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 15,
      width: '50%',
      padding: 8,
      borderColor: corSecundaria,
      borderWidth: 1.5,
      borderRadius: 3,
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
      //paddingBottom: 250,
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
        paddingBottom: '5%',
        paddingTop: '5%',
    },

    titulo: {
        textAlign: 'center',
        color: corDestaque,
        fontWeight: 'bold',
        paddingBottom: '3%',
        fontSize: 18,
    },

    titulo2: {
      textAlign: 'center',
      color: corPadrao,
      fontWeight: 'bold',
      paddingBottom: '3%',
      fontSize: 15,
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
      backgroundColor: 'white',
      marginBottom: '10%',
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

    cardPrice: {
      textAlign: 'right',
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
        paddingHorizontal: 77,
        backgroundColor: corDestaque,
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

    pickerContainer: {
      backgroundColor: corPadrao,
      padding: "2%",
      marginBottom: 15,
      marginTop: 10,
      marginRight: "20%",
      marginLeft: "20%",
      borderRadius: 300,
    },

    teste:{
      flex: 0.9,
    },

    inputEndereco: {
      padding: 8,
      borderColor: corPadrao,
      borderWidth: 1.5,
      borderRadius: 3,
    }
});
