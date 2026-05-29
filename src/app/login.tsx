import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { global } from '../styles'
import { useState, useRef } from 'react'
import { router, Link } from 'expo-router'
import Checkbox from 'expo-checkbox'



export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [checkbox, setCheckbox] = useState(false)

    const inputEmail = useRef<TextInput>(null)
    const inputPassword = useRef<TextInput>(null)

    return (
        <View style={global.container}>

            <View style={styles.box}>
                
                <View style={styles.title}>
                    <Text style={styles.titleText}>Login</Text>
                </View>

                <View style={styles.form}>
                    
                    <View style={styles.label}>
                        <Text style={styles.textLabel}>Email</Text>
                        <TextInput 
                            onChangeText={setEmail}
                            onChange={() => setEmailError(false)}
                            value={email}
                            style={[
                                styles.input,
                                emailError && styles.inputError
                            ]}
                            ref={inputEmail}
                        />
                        {
                            emailError && <Text style={{color:"#ff0000", fontSize:12}}>Email Invalido</Text> 
                        }
                        
                    </View>

                    <View style={styles.label}>
                        <Text style={styles.textLabel}>Password</Text>
                        <TextInput 
                            onChangeText={setPassword}
                            value={password}
                            style={[
                                styles.input,
                                passwordError && styles.inputError
                            ]}
                            secureTextEntry={!checkbox}
                            onChange={() => setPasswordError(false)}
                            ref={inputPassword}
                        />
                        {
                            passwordError && <Text style={{color:"#ff0000", fontSize:12}}>Senha nescessario</Text> 
                        }
                    </View>
                
                </View>
                <View>
                    <View style={styles.actions}>
                        <View style={styles.showPassword}>
                            <Checkbox 
                                value={checkbox}
                                onValueChange={setCheckbox}
                                style={{
                                    width:15,
                                    height:15,
                                }}
                                color={checkbox ? "#000000" : undefined}
                            />
                            <Text style={{
                                color:"#000000a5"
                            }}>Mostrar senha</Text> 
                        </View>
                        <Link
                            href="/forgotPassword"
                            style={{
                                textDecorationLine:"underline",
                                color:"#1D61E7"
                            }}
                        > Esqueceu a senha?</Link>
                    </View>
                        
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {

                            if ((email.length && !email.includes("@gmail.com")) || !email.length ) {        
                                setEmailError(true)
                                inputEmail.current?.focus()
                            } else if (email.length && !password.length) {
                                setPasswordError(true)                         
                                inputPassword.current?.focus()
                            } else {
                                router.push("/dashboard")
                            }
                            
                        }}
                    >
                        <Text style={styles.textButton}>Entrar</Text>
                    </TouchableOpacity>
                        
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    box:{
        width:310,
        // height:400,
        padding:20,
        borderRadius:10,
        backgroundColor:"#fff",

        gap:5,
        boxShadow: "0px 3px 10px rgba(0,0,0,0.2)"
        
    },

    title:{
        marginBottom:20,
        alignItems:"center",
        userSelect:"none",
    },
    titleText:{
        fontSize:33,
        fontWeight:"600",
    },

    text:{
        fontSize:24,
        fontWeight:"bold"
    },

    form:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:10,
    },
    label:{
        width:"100%"
    },
    textLabel:{
        fontSize:14,
        fontWeight:"500",
        color:"#00000093"
    },
    input:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
        borderWidth:1,
        borderColor:"#00000036",
        borderRadius:10,
        width:"100%",
        fontSize:15,
        outlineColor:"#000000"
    },
    actions:{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        paddingTop:10,
        paddingBottom:10,
    },
    showPassword:{
        display:"flex",
        alignItems:"center",
        gap:3,
        flexDirection:"row"
    },
    button:{
        backgroundColor:"#000000",
        padding:12,
        borderRadius:10,
        marginTop:15
    },
    textButton:{
        color:"#fff" ,
        textAlign:"center", 
        fontSize:16,
        fontWeight:"500"
    },
    inputError:{
        borderWidth:1,
        borderColor:"#ff0000",
        outlineColor:"#ff0000",
    }
})