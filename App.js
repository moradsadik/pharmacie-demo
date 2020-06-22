import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
import {Header, Icon, ListItem, SearchBar} from "react-native-elements";
import {getMedicaments} from "./services/Services";
import * as repository from './repositories/repositorie';
import {drawernavigation} from './navigation';
import Medicaments from "./component/Medicaments";
import { createAppContainer } from 'react-navigation';


const AppContainer = createAppContainer(drawernavigation);
export default class App extends Component {
  render() {
    return (
        <View style={{ flex: 1 }}>
          <AppContainer />
        </View>
    );
  }
}