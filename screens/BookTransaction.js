import React from 'react';
import {Text,View,TouchableOpacity, StyleSheet} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCamerePermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermission=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState={
            hasCamerePermissions:status==='granted',
            buttonState:'clicked'
        }
    }
    handledBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        });
    }
    render(){
        const hasCamerePermissions=this.state.hasCamerePermissions;
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState==='clicked'&&hasCamerePermissions){
            return(
                <BarCodeScanner style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={scanned?undefined:this.handledBarCodeScanned}/>
            ) 
        }else if(buttonState==='normal'){
            return(
                <View style={styles.container}>
                    <Text style={styles.displayText}>
                        {hasCamerePermissions===true?this.state.scannedData:"Request Camera Permissions"}
                    </Text>
                    <TouchableOpacity style={styles.scanButton}>
                        <Text style={styles.buttonText} 
                            onPress={this.getCameraPermission}>
                            Scan QR Code
                        </Text>
                    </TouchableOpacity>
                </View>
            )   
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });