import React, {Component} from "react";
import {View, Text, FlatList, TouchableWithoutFeedback, ActivityIndicator, Modal, TextInput, ScrollView} from "react-native";
import * as repository from "../repositories/repositorie";
import {Icon, Button, Slider} from "react-native-elements";
import {getPharmacies, addPharmacie} from "../services/Services";
import MapView, {Marker} from "react-native-maps";




export default class Pharmacies extends Component{

    constructor() {
        super();
        this.state = {
            pharmacies : [],
            pharmacie : {},
            markers : [],
            show :false,
            name : '',
            adresse : '',
            lat : 48.8534,
            lang : 2.3488,
            horaire : '',
            effectif : 0,
            loading :true
        }
    }

    async componentDidMount() {
        const pharmacies = await getPharmacies(repository);
        const markers = pharmacies.map( p => {return {latitude : p.lat, longitude : p.lang, adresse : p.adresse}})
        this.setState({loading:false, pharmacies, markers})
    }

    add = () => {
        let {name, adresse, horaire,effectif, lat,lang} = this.state
        let pharmacie = {name, adresse, horaire,effectif, lat,lang}
        addPharmacie(repository,pharmacie)
        this.setState({show : false, pharmacies : [...this.state.pharmacies, pharmacie]})
    }  

    show = () => {
        this.setState({show : true})
    }

    close = () => {
        this.setState({pharmacie : {}, show: false})
    }

    position = (position) => {
        let {latitude,longitude} = position.coordinate;
        this.setState({lat:latitude, lang:longitude})
    }

    render() {
        let {pharmacies, markers, loading, show, name, adresse, horaire,effectif, lat,lang } = this.state
        let {navigation} = this.props;

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }
        return (<View style={{flex : 1}}>
            <FlatList
                keyExtractor={item => item.ref}
                data={pharmacies}
                renderItem={({ item }) => 
                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('PharmacieDetaille', {ref : item.ref, markers})}>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',
                        paddingVertical:10, paddingHorizontal:10, borderBottomWidth:1, borderColor: '#dbdbdb', marginBottom : 5}}>
                        <View>
                            <View>
                                <Text style={{fontSize: 20, fontWeight : 'bold', color:'#317b82', textTransform: 'capitalize'}}>{item.name}</Text>
                            </View>
                            <Text style={{color:'#495057'}}>{item.adresse}</Text>
                            <Text style={{color:'#495057'}}>{item.horaire}</Text>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                                <Icon name="chevron-right" type="font-awesome" iconStyle={{color:'#879e9a',fontWeight: 'normal', fontSize: 15}} />
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                }
            />
            
            
            <Modal animationType="slide" transparent={false} visible={show} >
                    <View style={{ backgroundColor : '#ccc'}}>
                        <Icon reverse name='x' type='feather'
                            color='#fff' size={20} iconStyle={{ color: '#f00', fontWeight:'bold' }}
                            containerStyle = {{justifyContent : 'flex-end'}}
                            onPress={this.close} />
                    </View>

                    <ScrollView style={{padding : 20, flex : 1, marginBottom : 20}} >

                    <TextInput
                        placeholder = 'nom'  
                        value={name}
                        onChangeText={name => this.setState({name})}  
                        placeholderTextColor = "#463f3a"
                        style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                            paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
                    />

                    <View style={{ marginBottom:20 }}>
                        <Slider minimumValue={1}
                            maximumValue={50}
                            value={effectif} 
                            step = {1}
                            onValueChange={(effectif) => this.setState({ effectif })}
                        />
                        <Text>Effectifs: {effectif}</Text>
                    </View>  

                    <TextInput
                        placeholder = 'entre 8h:00min et 18h:30min'
                        value={horaire}
                        onChangeText={horaire => this.setState({horaire})}  
                        placeholderTextColor = "#463f3a"
                        style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                            paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
                    /> 

                    <TextInput
                        placeholder = 'Adresse'  
                        value={adresse}
                        onChangeText={adresse => this.setState({adresse})}  
                        placeholderTextColor = "#463f3a"
                        style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                            paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
                    />

                    <View style={{marginBottom:20}}>
                        <Text style = {{marginBottom : 10}}>Map Localisation</Text>
                        <MapView ref={(map) => this._map = map} 
                                onPress = { e => this.position(e.nativeEvent)} 
                                style={{ height: 350 }}
                                loadingEnabled
                                initialRegion={{ latitude: lat, longitude: lang, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}     >
                            <Marker coordinate={{ latitude: lat,longitude: lang }} title="test"/>
                        </MapView>
                    </View>             

                    <Button
                        title="Ajouter"
                        onPress = { this.add }
                        buttonStyle = {{backgroundColor: '#4281a4'}}
                        containerStyle = {{marginVertical : 20}}
                    />
                    </ScrollView>
            </Modal>


            <Button buttonStyle={{backgroundColor: '#588b8b'}} 
                    containerStyle={{ justifyContent : 'flex-end', marginHorizontal:10, marginVertical:20}} 
                    title=' + Ajouter pharmacie' 
                    onPress = {this.show} />

        </View>);
    }
}
