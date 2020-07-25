import React, {Component} from "react";
import {View, Text, ActivityIndicator} from "react-native";
import {coeffMultiplicateur, prixAchatNet, prixVenteNet} from "../metiers/metier";
import {PricingCard} from "react-native-elements";
import * as repo from "../repositories/repositorie";
import {getMedicamentById} from "../services/Services";


export default class MedicamentDetaille extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Medicament',
        };
    };
    constructor(){
        super()
        this.state = {
            id : null,
            name : null,
            taux: null,
            coeff : 2,
            prixBrut:null,
            loading : true
        }
    }

    async componentDidMount() {
        let mid =this.props.navigation.getParam('id');
        console.log("id : ",mid)
        let {id, name, prixBrut, taux} = await getMedicamentById(repo, mid);
        console.log(id, name, prixBrut, taux)
        this.setState({id, name, prixBrut, taux, loading : false})
    }

    render() {
        let {id, name, prixBrut, taux, loading, coeff} = this.state
        let prix_achat_net = prixAchatNet(prixBrut, taux/100)
        let prix_vente_net = prixVenteNet(prix_achat_net, coeff)
        let coeff_multiplicateur = coeffMultiplicateur(prix_achat_net, prix_vente_net )

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }

        return (
            <View style={{ flex: 1 }}>
                <PricingCard
                    color="#4f9deb"
                    title={name}
                    price={prixBrut + ' €'}
                    info={[`Taux = ${taux}`, `Prix de vente =  ${prix_vente_net} €`, `Prix achat net =  ${prix_achat_net} €`, `Coefficient multiplicateur =  ${coeff_multiplicateur}`]}
                    button={<Text></Text>}
                />
            </View>
        );
    }
}
