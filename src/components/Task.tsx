import { Pencil, Trash, ClockFading, CheckCheck, Check} from 'lucide-react-native'
import { View, StyleSheet, Text, Pressable, Animated } from 'react-native';
import type { TaskType } from "@/types";
import { useEffect, useRef } from 'react';


interface Props {
    task:TaskType;
    edit:() => void;
    remove:() => void;
    check:() => void;
}

export default function Task({task, edit, remove, check} : Props) {

    const opacity = useRef(new Animated.Value(0)).current 
    const translateY = useRef(new Animated.Value(20)).current 

    useEffect(() => {
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
        <Animated.View style={[
            styles.container, 
            {
                opacity:opacity, 
                transform:[{translateY:translateY}]
            }
        ]}>
            <View style={styles.content}>
                {
                    !task.finished ?
                        <ClockFading 
                            height={22}
                            width={22}
                        />
                    : 
                        <CheckCheck 
                            height={22}
                            width={22}
                            color={"green"}
                        />
                    
                }
                <Text style={styles.textTask}>{task.title}</Text>
            </View>
            <View style={styles.buttons}>
            
                {
                    !task.finished &&
                    <Pressable onPress={() => edit()}>
                        <Pencil/>
                    </Pressable>    
                }
                <Pressable onPress={() => remove()}>
                    <Trash color={"red"} />
                </Pressable>
                
                {
                    !task.finished &&
                    <Pressable onPress={() => check()}>
                        <Check color={"green"} />
                    </Pressable>
                }
            </View>
        </Animated.View>        
    )
}

const styles = StyleSheet.create({
    container:{
        width:333,
        height:59,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        padding:10,
        borderColor:"#000000a7",
        borderWidth:1,
        borderRadius:10
    },

    content:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:5
    },
    buttons:{
        display:"flex",
        flexDirection:"row",
        gap:10
    },
    textTask:{
        fontSize:18
    }
    
})