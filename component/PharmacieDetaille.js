import React, {Component} from "react";
import {View, Text, ActivityIndicator, SectionList, Modal, Alert, TouchableHighlight, ScrollView, TextInput} from "react-native";
import {PricingCard, Icon, Button, Card} from "react-native-elements";
import MapView, {Marker} from "react-native-maps";
import * as repository from "../repositories/repositorie";
import { getPharmacieById, updatePharmacieMedicament} from "../services/Services";
import { isEmpty } from "../utilis/utils";
import { prixAchatNet, prixVenteNet } from "../metiers/metier";



export default class PharmacieDetaille extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Pharmacie',
        };
    };
    constructor(){
        super()
        this.state = {
            pharmacie  : {},
            medicament : {},
            markers : [],
            map : false,
            showAddMedicamant: false,
            medicamentForm : {name : '', prixBrut : '', taux : '', coeff : '' },
            loading : true
        }
    }

    async componentDidMount() {
        let key =this.props.navigation.getParam('ref');
        let positions = this.props.navigation.getParam('markers')
        let pharmacie = await getPharmacieById(repository, key)
        let markers = positions.filter(p => (p.latitude !== pharmacie.lat || p.longitude !== pharmacie.lang))
        console.log(markers)
        this.setState({pharmacie, loading:false, markers})
    }

    showMap = () =>{
        this.setState({map : !this.state.map})
    }

    showMedicamant = () => {
        this.setState({medicament : {}})
    }

    selectMedicament = (item) => {
        let prix_achat_net = prixAchatNet(item.prixBrut, item.taux/100)
        let prix_vente_net = prixVenteNet(prix_achat_net, Number(item.coeff))
        item['prixAchatNet'] = prix_achat_net
        item['prixVenteNet'] = prix_vente_net
        console.log(item)
        this.setState({medicament : item, medicamentForm : {}})
    }

    addMedicament = () => {
        let {medicamentForm, pharmacie} = this.state
        let medicament = {...medicamentForm}
        let medics = (pharmacie.medicaments) ? pharmacie.medicaments : []
        let data = { medicaments : [...medics, medicament]}
        updatePharmacieMedicament(repository,pharmacie.ref,data)

        let p = {...pharmacie,  medicaments : [...medics, medicament] }
        this.setState({showAddMedicamant : false, pharmacie : p})
    }

    showAddMedicament = () => {
        this.setState({showAddMedicamant : true})
    }
    close = () => {
        this.setState({showAddMedicamant : false})
    }

    render() {
        let {pharmacie,map,markers,loading, medicament,medicamentForm,showAddMedicamant} = this.state
        let { name, adresse, lat, lang, medicaments, horaire} = pharmacie        
        let { prixBrut , taux , coeff} = medicamentForm

        

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }

        if(isEmpty(pharmacie)){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }

        let sections = null
        if(medicaments){
            let data = medicaments.reduce((r, e) => {
                let group = e.name[0];
                if(!r[group]) r[group] = {group, data: [e]}
                else r[group].data.push(e);
                return r;
              }, {});

            sections = Object.entries(data)
            .map(([key,value])=>{
                return value;
            }).sort(function(a,b) {
                var x = a.group.toLowerCase();
                var y = b.group.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
        }


        return (
            <View style={{ flex: 1,justifyContent : 'space-between' }}>
                <PricingCard
                    color = '#3b6064'
                    title={name} 
                    price={adresse} 
                    info={[horaire]}
                    pricingStyle ={{fontSize:17, fontWeight: 'normal'}}
                    infoStyle = {{fontSize : 17, fontWeight: 'normal', color: '#000'}}
                    button={{ title: 'Localisation', onPress : this.showMap }} />


                {/* # AFFICHAGE SOUS FORMAT SECTION */}
                {sections && 
                <SectionList
                        sections={sections}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => 
                            <TouchableHighlight onPress = {() => this.selectMedicament(item)}>
                            <View style={{paddingVertical: 15,paddingHorizontal:10,marginHorizontal: 12, backgroundColor: '#cfd8d7'}}>
                                <Text style={{fontSize: 16}}>{item.name}</Text>
                            </View>
                            </TouchableHighlight>
                        }
                        renderSectionHeader={({ section: { group } }) => 
                                <Text style={{marginHorizontal: 12,fontSize: 20,backgroundColor: "#b5c9c3", 
                                              paddingHorizontal:10, paddingVertical:5, fontWeight: 'bold'}}>{group.toUpperCase()}</Text>
                        }
                />
                }

                {/* # POPUP AFFICHAGE LOCALISATION DANS LA MAP */}
                <Modal animationType="slide" transparent={false}visible={map} >
                    <MapView ref={(map) => this._map = map} style={{ flex: 1 }} loadingEnabled
                            initialRegion={{ latitude: lat, longitude: lang, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}     >
                        <Marker coordinate={{ latitude: lat,longitude: lang }} pinColor='#000'/>
                        {
                            markers.map( ({latitude, longitude, adresse}, i) => {
                                return <Marker key={i} coordinate={{ latitude,longitude }} pincolor= 'yellow' title={adresse}>
                                    <Icon name="map-pin" type='font-awesome' color="#fca311" size={36}></Icon>
                                </Marker>
                            })
                        }
                    </MapView>
                    <View style={{ position: 'absolute', width: 'auto', height: 'auto', top: 30, left: 5 }}>
                        <Icon reverse name='x' type='feather'
                            color='#f00' size={20} iconStyle={{ color: '#fff' }}
                            onPress={this.showMap} />
                    </View>
                </Modal>

                {/* # POPUP AFFICHER DETAILLE MEDICAMENT SELECTED */}
                <Modal animationType="slide" transparent={false}visible={!isEmpty(medicament)} >
                    <View style={{ backgroundColor : '#ccc'}}>
                        <Icon reverse name='x' type='feather'
                            color='#fff' size={20} iconStyle={{ color: '#000', fontWeight:'bold' }}
                            containerStyle = {{justifyContent : 'flex-end'}}
                            onPress={this.showMedicamant} />
                    </View>
                    <View style={{padding : 20}} >
                        <Card title={medicament.name}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginBottom: 10, fontWeight:'bold', color:'#2a9d8f'}}>Prix Brut :</Text><Text> {medicament.prixBrut}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginBottom: 10, fontWeight:'bold', color:'#2a9d8f'}}>Taux :</Text><Text>  {medicament.taux}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginBottom: 10, fontWeight:'bold', color:'#2a9d8f'}}>Prix Achat Net :</Text><Text>  {medicament.prixAchatNet}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginBottom: 10, fontWeight:'bold', color:'#2a9d8f'}}>Prix Vente Net :</Text><Text>  {medicament.prixVenteNet}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginBottom: 10, fontWeight:'bold', color:'#2a9d8f'}}>Coefficient Multiplicateur : </Text><Text> {medicament.coeff}</Text>
                            </View>
                        </Card>
                    </View>
                </Modal>

                {/* # POPUP AJOUTER MEDICAMENT DANS PHARMACIE */}
                <Modal animationType="slide" transparent={false} visible={showAddMedicamant} >
                    <View style={{ backgroundColor : '#ccc'}}>
                        <Icon reverse name='x' type='feather'
                            color='#fff' size={20} iconStyle={{ color: '#f00', fontWeight:'bold' }}
                            containerStyle = {{justifyContent : 'flex-end'}}
                            onPress={this.close} />
                    </View>

                    <ScrollView style={{padding : 20, flex : 1, marginBottom : 20}} >

                    <TextInput
                        placeholder = 'nom'  
                        value={this.state.medicamentForm.name}
                        onChangeText={name => this.setState({medicamentForm : {...medicamentForm, name}})}  
                        placeholderTextColor = "#463f3a"
                        style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                            paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
                    /> 

                    <TextInput
                        placeholder = 'prix brut'  
                        value={prixBrut}
                        onChangeText={prixBrut => this.setState({medicamentForm : {...medicamentForm, prixBrut}})}  
                        placeholderTextColor = "#463f3a"
                        style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                            paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
                    />
                    <TextInput
                        placeholder = 'Taux'  
                        value={taux}
                        onChangeText={taux => this.setState({medicamentForm : {...medicamentForm, taux}})}  
                        placeholderTextColor = "#463f3a"
                        style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                            paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
                    />
                    <TextInput
                        placeholder = 'Coefficient multiplication'  
                        value={coeff}
                        onChangeText={coeff => this.setState({medicamentForm : {...medicamentForm, coeff}})}  
                        placeholderTextColor = "#463f3a"
                        style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                            paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
                    />           

                    <Button
                        title="Ajouter"
                        onPress = { this.addMedicament }
                        buttonStyle = {{backgroundColor: '#4281a4'}}
                        containerStyle = {{marginVertical : 20}}
                    />
                    </ScrollView>
            </Modal>
                
                <Button buttonStyle={{backgroundColor: '#467599'}} containerStyle={{justifyContent : 'flex-end', marginHorizontal:10, marginVertical:20}} 
                      title=' + Ajouter Medicament' onPress = {this.showAddMedicament} />
            </View>
        );
    }
}
