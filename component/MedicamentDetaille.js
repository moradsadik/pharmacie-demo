import React, {Component} from "react";
import {View, Text} from "react-native";
import {getMedicamentById, getPharmacieById} from "../repositories/repositorie";
import {coeffMultiplicateur, prixAchatNet, prixVenteNet} from "../metiers/metier";
import {PricingCard} from "react-native-elements";


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
            prixBrut:null
        }
    }

    componentDidMount() {
        let key =this.props.navigation.getParam('id');
        let {id, name, prixBrut, taux} = getMedicamentById(key)
        console.log(id, name, prixBrut, taux)
        this.setState({id, name, prixBrut, taux})
    }

    render() {
        let {id, name, prixBrut, taux} = this.state
        let prix_achat_net = prixAchatNet(prixBrut, taux/100)
        let prix_vente_net = prixVenteNet(prix_achat_net, 2)
        let coeff_multiplicateur = coeffMultiplicateur(prix_achat_net, prix_vente_net )
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
