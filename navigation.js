import React, {Component} from 'react';
import {ScrollView, View, Text, Dimensions} from "react-native";
 import {Avatar, Icon} from "react-native-elements";
 import {createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
 import {createStackNavigator} from "react-navigation-stack";
 import Pharmacies from './component/Pharmacies';
 import Medicaments from './component/Medicaments';
 import MedicamentDetaille from './component/MedicamentDetaille';
import PharmacieDetaille from "./component/PharmacieDetaille";


const medicamentStack = createStackNavigator({
    Medicaments: {
        screen: Medicaments,
        navigationOptions: ({navigation}) => ({
            title: 'Medicaments',
            headerStyle: {
                backgroundColor: '#7bdfa0',
                borderBottomWidth: 2,
                borderBottomColor: '#7bdfa0'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerRight: () => (
                <Icon
                    onPress={() => navigation.openDrawer()}
                    name="bars" type="font-awesome" containerStyle={{marginHorizontal: 15}}
                    color="#fff"
                />
            ),
        }),
    },
    MedicamentDetaille: {
        screen: MedicamentDetaille,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#7bdfa0',
                borderBottomWidth: 2,
                borderBottomColor: '#7bdfa0',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center'
        }),
    }
});

const pharmacieStack = createStackNavigator({
    Pharmacies: {
        screen: Pharmacies,
        navigationOptions: ({navigation}) => ({
            title: 'Pharmacies',
            headerStyle: {
                backgroundColor: '#7bdfa0',
                borderBottomWidth: 2,
                borderBottomColor: '#7bdfa0'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerRight: () => (
                <Icon
                    onPress={() => navigation.openDrawer()}
                    name="bars" type="font-awesome" containerStyle={{marginHorizontal: 15}}
                    color="#fff"
                />
            ),
        }),
    },
    PharmacieDetaille: {
        screen: PharmacieDetaille,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#7bdfa0',
                borderBottomWidth: 2,
                borderBottomColor: '#7bdfa0',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center'
        }),
    }
});

const DrawerContent = (props) => {
     return <ScrollView>
         <View style={{flex: 1}}>
             <View style={{
                 flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#41ce7b',
                 padding: 10, borderBottomColor: '#429770', borderBottomWidth: 1
             }}>
                 <Avatar rounded size="xlarge" source={require('./assets/logo.png')}/>
             </View>
             <DrawerItems {...props} />
         </View>
     </ScrollView>
 }


 const drawernavigation = createDrawerNavigator({
     Pharmacies: {
         screen: pharmacieStack,
         navigationOptions: {
             drawerLabel: 'Pharmacies',
             drawerIcon: ({tintColor}) => (
                 <Icon name='hospital-o' type="font-awesome" color={tintColor}/>
             )
         }
     },
     Medicaments: {
         screen: medicamentStack,
         navigationOptions: {
             drawerLabel: 'Medicaments',
             drawerIcon: ({tintColor}) => (
                 <Icon name='medkit' type="font-awesome" color={tintColor}/>
             )
         }
     }

 }, {
     contentComponent: DrawerContent,
     drawerWidth: Dimensions.get('window').width * 0.85,
     hideStatusBar: true,
     contentOptions: {
         activeTintColor: '#f8961e',
         activeBackgroundColor: '#fff',
         labelStyle: {fontWeight: 'bold'},
         iconContainerStyle: {padding: 0}
     }
 })


 export {drawernavigation};