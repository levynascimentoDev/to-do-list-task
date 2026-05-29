
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Pressable,  Animated} from "react-native";
import { X } from 'lucide-react-native'
import { global } from "@/styles";
import { useState, useRef, useEffect } from "react";
import type { TaskType } from "@/types";


interface Props {
    title:string;
    label:string;
    button:string;
    task?:TaskType;
    indexTask?:number;
    submit:(inputVale:string, key?:number) => void;
    close:() => void;
}


export default function ModalTask({title, label, button, indexTask, task, submit, close} : Props) {
    const [value, setValue] = useState(task ? task.title : "");
    const inputRef = useRef<TextInput>(null)

    const opacity = useRef(new Animated.Value(0)).current
    const translateY = useRef(new Animated.Value(30)).current

    useEffect(() => {
        inputRef.current?.focus()

        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start()

    }, [])
    
    return (
        <Animated.View style={[global.modal,  { opacity, transform: [{ translateY }]} ]} >
            <View style={styles.header}>
                <View style={styles.top}>
                    
                    <Pressable onPress={() => close()}>
                        <X style={{cursor:"pointer"}} />
                    </Pressable>
                </View>
                <View>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>

            <View style={styles.form}>
                <View style={styles.label}>
                    <Text style={styles.textLabel}>{label}</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setValue}
                        value={value}
                        maxLength={19}
                        ref={inputRef}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        submit(value, indexTask)
                        close()
                    }}
                >
                    <Text style={styles.textButton}>{button}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    header:{
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    },
    top:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end", 
        alignItems:"center",
        padding:15
    },
    title:{
        fontSize:33,
        fontWeight:"600"
    },
    form:{  
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        padding:20,
        gap:15
    },
    label:{
        width:"100%",
        gap:3
    },
    input:{
        flex:1,
        fontSize:18,
        padding:10,
        borderColor:"#00000067",
        borderWidth:1,
        borderRadius:10,
        outlineColor:"#000"
    }, 
    textLabel:{
        fontSize:15,
        color:"#000000a0",

    },
    button:{
        width:"100%",
        borderRadius:10,
        padding:15,
        backgroundColor:"#000"
        
    },
    textButton:{
        fontSize:18,
        textAlign:"center",
        color:"#fff"
    }
    
})