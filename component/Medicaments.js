import React, {Component} from "react";
import {View, Text, FlatList, TouchableWithoutFeedback, ActivityIndicator} from "react-native";
import {getMedicaments} from "../services/Services";
import {Icon, Button} from "react-native-elements";
import * as repository from "../repositories/repositorie";

class Medicaments extends Component{

    constructor() {
        super();
        this.state = {
            medicaments : [],
            medicament : {},
            search : null,
            message : null,
            loading : true
        }
    }

    async componentDidMount() {
        const medicaments = await getMedicaments(repository);
        this.setState({medicaments, loading:false})
    }

    render() {
        let {medicaments, loading} = this.state
        let {navigation} = this.props;

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }
        return (<View>
            <FlatList
                keyExtractor={item => item.ref}
                data={medicaments}
                renderItem={({ item }) => 
                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('MedicamentDetaille', {id : item.ref})}>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',
                        paddingVertical:10, paddingHorizontal:10, borderBottomWidth:1, borderColor: '#dbdbdb', marginBottom : 5}}>
                        <View>
                            <View><Text style={{fontSize: 20, fontWeight : 'bold', color:'#317b82', textTransform: 'capitalize'}}>{item.name}</Text></View>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                                <Icon name="chevron-right" type="font-awesome" iconStyle={{color:'#879e9a',fontWeight: 'normal', fontSize: 15}} />
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                }
            />
        </View>);
    }
}

export default Medicaments