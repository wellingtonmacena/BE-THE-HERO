import React from 'react'
import {Feather}from '@expo/vector-icons'
import {useNavigation, useRoute} from '@react-navigation/native'
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function detalhes(){

    const route =useRoute()
    const incident = route.params.incident
    const navigation = useNavigation()
    const message = `Olá ${incident.nome}, estou entrando em contato, pois gostaria de ajudar no ajudar "${incident.titulo}" de ${Intl.NumberFormat('pt-BR', {
        style: 'currency', currency: 'BRL'}).format(incident.valor)}`

    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.titulo}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatSapp(){
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`)
    }

    return(

        <View style={styles.container}>
            <View style = {styles.header}>
                 <Image source={logoImg}/> 

                <TouchableOpacity on onPress ={navigateBack}>
                    <Feather name ="arrow-left" size={28} color='#E82041'/>
                </TouchableOpacity>
            </View>

            <View style ={styles.incident}>
            <Text style = {[styles.incidentProperty, {marginTop:0}]}>Ong</Text>
                <Text style = {styles.incidentValue}>{incident.nome}</Text>

                <Text style = {styles.incidentProperty}>Caso</Text>
                <Text style = {styles.incidentValue}>{incident.titulo}</Text>
                
                <Text style = {styles.incidentProperty}>Valor</Text>
                <Text style = {styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(incident.valor)}</Text>
            </View>

            <View style ={styles.contactBox}>
                <Text style = {styles.heroTitle}>Salve o dia!</Text>
                <Text style ={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style ={styles.HeroDescription}>Entre em contato</Text>

                <View style ={styles.actions}>
                    <TouchableOpacity style ={styles.action} onPress={sendWhatSapp}>
                        <Text style ={styles.actionText} onPress ={() => {}}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style ={styles.action} onPress={sendMail}>
                        <Text style ={styles.actionText} onPress ={() => {}}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}