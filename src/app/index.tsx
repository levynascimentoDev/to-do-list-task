
import { global } from "@/styles"
import { View, StyleSheet, Text } from "react-native"
import { SquareCheckBig } from 'lucide-react-native'
import { Link } from "expo-router"

export default function App() {
    return (
        <View style={global.container}>
            <View style={styles.box}>
                <View style={styles.header}>
                    <SquareCheckBig 
                        height={60}
                        width={60}
                    />
                    <Text
                        style={styles.title}
                    >Sejá Bem Vindo</Text>
                </View>
                
                <Link
                    href="/login"
                    style={styles.link}
                >Entrar</Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box:{
        padding:20,
        alignItems:"center",
        justifyContent:"center",
        gap:100
    },
    header:{
        alignItems:"center",
        justifyContent:"center"
    },
    title:{
        fontSize:28,
        fontWeight:"500"
    },
    link:{
        backgroundColor:"#000",
        padding:20,
        width:"100%",
        borderRadius:10,
        color:"#fff",
        textAlign:"center",
        fontSize:19,
    }
})