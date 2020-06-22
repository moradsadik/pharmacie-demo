import React, {Component} from "react";
import {View, Text, FlatList, TouchableWithoutFeedback} from "react-native";
import * as repository from "../repositories/repositorie";
import {Icon} from "react-native-elements";
import {getPharmacies} from "../services/Services";

export default class Pharmacies extends Component{

    constructor() {
        super();
        this.state = {
            pharmacies : []
        }
    }

    componentDidMount() {
        this.setState({pharmacies : getPharmacies(repository)})
    }


    render() {
        let {pharmacies} = this.state
        let {navigation} = this.props;


        return (<View>
            <FlatList
                keyExtractor={item => item.id+''}
                data={pharmacies}
                renderItem={({ item }) => <View style={{flexDirection: 'row',justifyContent: 'space-between',
                    paddingVertical:10, paddingHorizontal:10, borderBottomWidth:1, borderColor: '#dbdbdb', marginBottom : 5}}>
                    <View>
                        <View><Text style={{fontSize: 20, fontWeight : 'bold', color:'#317b82', textTransform: 'capitalize'}}>{item.name}</Text></View>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <TouchableWithoutFeedback onPress={ () => navigation.navigate('PharmacieDetaille', {id : item.id})}>
                            <Icon name="chevron-right" type="font-awesome" iconStyle={{color:'#879e9a',fontWeight: 'normal', fontSize: 15}} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>}
            />
        </View>);
    }
}
