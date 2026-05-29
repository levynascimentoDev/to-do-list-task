import { StyleSheet } from "react-native"

export const global = StyleSheet.create({
    container:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flex:1,
    },
    modal:{
        display:"flex",
        width:350,
        height:320,
        borderRadius:20,
        backgroundColor:"#fff",
        boxShadow: "0px 3px 10px rgba(0,0,0,0.25)",
    }
})