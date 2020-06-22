import React, {Component} from "react";
import {View, Text} from "react-native";
import { getPharmacieById} from "../repositories/repositorie";
import {PricingCard} from "react-native-elements";
import MapView, {Marker} from "react-native-maps";


export default class PharmacieDetaille extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Pharmacie',
        };
    };
    constructor(){
        super()
        this.state = {
            id : null,
            name : null,
            adresse : null,
            lat : null,
            lang : null,
            achats : [],
            ventes : [],
            formations : []
        }
    }

    componentDidMount() {
        let key =this.props.navigation.getParam('id');
        let pharmacie = getPharmacieById(key)
        this.setState({...pharmacie})
    }

    showMap = () =>{
        console.log('map')
    }
    render() {
        let {id, name,adresse, lat, lang, ventes, achats, formations} = this.state
        return (
            <View style={{ flex: 1 }}>
                <PricingCard
                    color="#4f9deb"
                    title={name} titleStyle={{fontSize:28}}
                    price={adresse} pricingStyle ={{fontSize:17, fontWeight: 'normal'}}
                    button={{ title: 'Localisation', onPress : this.showMap }}  />

                <View style={{ height:350, width:'auto', paddingHorizontal:15 }}>
                    <MapView ref={(map) => this._map = map} style={{ flex: 1 }}
                             showsUserLocation
                             loadingEnabled
                             initialRegion={{
                                 latitude: 48.871090,
                                 longitude: 2.372073,
                                 latitudeDelta: 0.0922,
                                 longitudeDelta: 0.0421,
                             }}
                    >
                        <Marker coordinate={{ latitude: 48.871090,longitude: 2.372073 }} title="test"/>
                    </MapView>
                </View>

            </View>
        );
    }
}
