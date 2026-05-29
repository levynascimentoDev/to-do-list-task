import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { Search, Plus, SearchX } from 'lucide-react-native'
import { useEffect, useState } from "react";
import ModalTask from "@/components/ModalTask";
import Task from "@/components/Task";
import { global } from "@/styles";
import type { Tasks } from "@/types";

export default function dashboard() {
    const [search, setSearch] = useState("");
    const [tasks, setTasks] = useState<Tasks>([]);
    const [filter, setFilter] = useState<Tasks>([]);
    const [edit, setEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(0);
    const [create, setCreate] = useState(false);

    useEffect(() => {   
        if (search.length) {
            const value = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            const valuesFilter = tasks.filter(task => task.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()))

            setFilter([
                ...valuesFilter
            ])
            
        } else {
            setFilter(
                [
                    ...tasks
                ]
            )
        }
        
    }, [tasks, search])

    return (    
        <View style={[global.container, {justifyContent:"flex-start", alignItems:"flex-start"}]}>
            
            {
                (edit || create) &&
                <View style={styles.modal}>
                    {
                        create ?
                            <ModalTask
                                title="Tarefa"
                                label="Nome"
                                button="Criar"
                                close={() => setCreate(false)} 
                                submit={value => {
                                    setTasks([
                                        ...tasks,
                                        {
                                            title:value,
                                            finished:false
                                        }
                                    ])
                                }}  
                            />
                        :
                            <ModalTask
                                title="Editar Tarefa"
                                label="Nome"
                                button="Editar"
                                indexTask={editIndex}
                                task={tasks[editIndex]}
                                submit={(value, key) => {
                                    setTasks(tasks.map((task, index) => {
                                        if (index == key) {
                                            return { ...task, title:value}                                            
                                        }
                                        return task;
                                    }))
                                }}
                                close={() => setEdit(false)} 
                            />
                    }
                </View>
            }


            <View style={styles.header}>
                <View style={styles.top}>
                    <Pressable onPress={() => setCreate(true)}>
                        <Plus width={32} height={32} style={{cursor:"pointer"}} />
                    </Pressable>
                </View>
                <View> 
                    <Text style={styles.textH1}>Painel</Text>  
                    <Text style={styles.textH2}>de Tarefas</Text>
                </View>

                <View style={styles.navigator}>

                    <View style={styles.inputContainer}>
                        <Search height={18} width={18} style={{position:"absolute", left:3}}/>
                        <TextInput
                            style={styles.input}
                            onChangeText={setSearch}
                            value={search}
                        />  
                    </View>
                </View>
                
            </View>
            <View style={styles.body}>
                {
                    
                    !filter.length
                    ? 
                        <View>

                            {
                                search 
                                ?
                                    <View style={{
                                        alignItems:"center",
                                        justifyContent:"center"
                                    }}>
                                        <SearchX 
                                            height={50} 
                                            width={50}
                                            style={{opacity:0.7}}
                                        />
                                        <Text
                                            style={{fontSize:16, fontWeight:"400"}}
                                        >"{search}" Não encontrado</Text>
                                    </View>
                                :
                                    <Text style={{fontSize:22, fontWeight:"700", color:"#00000093"}}>Sem resultados</Text>
                            }
                        </View>

                    : filter.map((value, key) => {
                        return (
                            <Task 
                                key={key} 
                                task={value} 
                                check={() => {
                                    let tasksCopy = [...tasks]
                                    setTasks(tasks.map((value, index) => {
                                        if (index == key ) {
                                            return {...value, finished:true}
                                        }
                                        return value;
                                    }))
                                }}
                                edit={() => {
                                    setEdit(true);
                                    setEditIndex(key);
                                }}
                                remove={() => setTasks(tasks.filter((_, index) => index != key))}
                            />
                        )
                    })
                }

                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"

    },
    top:{
        width:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-end",
        padding:10
    },
    navigator:{
        width:"100%",
        backgroundColor:"#000000",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    body:{
        width:"100%",
        padding:10,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:10
    },
    tasksContainer:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:8,
        flex:1
    },

    textH1:{
        fontSize:33,
        fontWeight:"700",
        textAlign:"center"

    },
    textH2:{
        fontSize:28,
        fontWeight:"500",
        textAlign:"center"
    },
    inputContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width:242,
        height:37,
        margin:20,
        overflow:"hidden",
        borderRadius:10
    },
    input:{
        flex:1,
        fontSize:17,
        padding:8,
        paddingLeft:28,
        backgroundColor:"#fff",
        borderRadius:10,
        outlineWidth:0,
        outlineColor:"#ffffff00"
    },
    modal:{
        position:"absolute",

        top:0,
        left:0,
        right:0,
        bottom:0,

        zIndex:999,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#00000071"

    }
    
})