import { global } from "@/styles";
import { View, StyleSheet, Text } from "react-native";
import { Wrench } from 'lucide-react-native'
import { Link } from "expo-router";


export default function forgot_password() {
    return (
        <View style={global.container}>
            <View style={styles.message}>
                <Wrench 
                    height={60} 
                    width={60} 
                    style={{opacity:0.7}}
                />
                <Text style={styles.text}>Em Construção</Text>
                <Link
                    href="/login"
                    style={styles.link}
                >Voltar para Login</Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    message:{
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        fontSize:22,
        fontWeight:"500",
        color:"#0000008d"
    },
    link:{
        padding:10,
        width:"100%",
        borderRadius:10,
        color:"#000",
        textDecorationLine:"underline",
        textAlign:"center",
        fontSize:18,
    }
})