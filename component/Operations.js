import React,{ Component } from "react";
import { View, Text } from "react-native";
import {getMedicaments, getMedicamentById} from "../services/Services";
import * as repository from "../repositories/repositorie"
import { add } from "../repositories/firebase/firebase";
import { medicaments, pharmacies } from "../repositories/json/data";
import { Button } from "react-native-elements";

export default class Operations extends Component{

    constructor(props){
        super(props)
        this.state = {
            medicaments : []
        }
    }

    async componentDidMount(){
    }

    initFirestore = () => {
        
        medicaments.forEach( m => {
            add('medicaments', m)
        })

        pharmacies.forEach( p => {
            add('pharmacies',p)
        })
    }

    render = () => {
        let {medicaments} = this.state;
        return <View style={{flex:1, justifyContent : 'space-between'}}>
            <View style={{margin : 10}}><Text style={{fontWeight: 'bold', fontSize:16}}>Operation Administrations</Text></View>
            <Button  containerStyle={{marginHorizontal:10, marginVertical : 20}} title="Remplir firestore" onPress={this.initFirestore}/>
        </View>
    }
}