import { Alert } from "react-native";


const alert = (title, msg) => {
    Alert.alert(
        title,
        msg,
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
    );
}

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
}


export {isEmpty, alert}