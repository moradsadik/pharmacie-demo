import React, {Component} from "react";
import {View, Text, FlatList, TouchableWithoutFeedback} from "react-native";
import {getMedicaments} from "../services/Services";
import {Icon} from "react-native-elements";
import * as repository from "../repositories/repositorie";

class Medicaments extends Component{

    constructor() {
        super();
        this.state = {
            medicaments : [],
            medicament : {},
            search : null,
            message : null
        }
    }

    componentDidMount() {
        this.setState({medicaments : getMedicaments(repository)})
    }


    render() {
        let {medicaments} = this.state
        let {navigation} = this.props;


        return (<View>
            <FlatList
                keyExtractor={item => item.id+''}
                data={medicaments}
                renderItem={({ item }) => <View style={{flexDirection: 'row',justifyContent: 'space-between',
                    paddingVertical:10, paddingHorizontal:10, borderBottomWidth:1, borderColor: '#dbdbdb', marginBottom : 5}}>
                    <View>
                        <View><Text style={{fontSize: 20, fontWeight : 'bold', color:'#317b82', textTransform: 'capitalize'}}>{item.name}</Text></View>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <TouchableWithoutFeedback onPress={ () => navigation.navigate('MedicamentDetaille', {id : item.id})}>
                            <Icon name="chevron-right" type="font-awesome" iconStyle={{color:'#879e9a',fontWeight: 'normal', fontSize: 15}} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>}
            />
        </View>);
    }
}

export default Medicaments