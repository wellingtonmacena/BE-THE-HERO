import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import{FiLogIn} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'


import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon(){

    const [id, setId] = useState('')
    const history = useHistory()

    async function handleLogin(e){
        e.preventDefault()

        try{
            const response = await  api.post('login', {id})
            console.log(response.data.nome)

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongNome',response.data.nome)
            
            history.push('/profile')
        }
        catch (error){
                alert('Falha no login. Tente novamente')
        }
    }

    return(
        <div className='logon-container'>
        <section className='form'>
        <img src={logoImg} alt='Seja O Herói'/>

        <form onSubmit = {handleLogin}>
            <h1>Faça seu logon</h1>

            <input placeholder ='Seu ID'
                value = {id}
                onChange ={e => setId(e.target.value)}/>
            <button className = 'button' type='submit'>Entrar</button>

            <Link className='back-link' to ='/register'>
            <FiLogIn size = {16} color = '#E02041'></FiLogIn>
            Não tenho cadastro
            </Link>

        </form>
        </section>

        <img src={heroesImg} alt='Heróis'/>
        </div> 
        
    )
}