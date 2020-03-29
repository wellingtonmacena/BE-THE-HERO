import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'
import api from '../../services/api'
import logoImg from '../../assets/logo.svg'

export default function NewCase(){
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')

    const ongId = localStorage.getItem('ongId')
    const history = useHistory()

    async function handleNewIncident(e){
        e.preventDefault()

        const data = {
            titulo,
            descricao,
            valor
        }

        try{
            await api.post('cases', data,{
                headers:{
                    authorization: ongId
                }
            })
            history.push('/profile')
        }
        catch(error){
            alert('Erro ao cadastrar caso, tente novamente')
        }

    }

    return(
        <div className="new-incident-container">
            <div className="content"> 
                <section>
                    <img src={logoImg} alt="Seja O Herói" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um um herói para resolvê-lo</p>

                    <Link className='back-link' to='/'>
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para o home
                    </Link>
                    </section>
                    <form on onSubmit = { handleNewIncident}>
                        <input
                        value = {titulo}
                        onChange = {e => setTitulo(e.target.value)}
                        placeholder ='Título do caso' />

                        <textarea
                        value = {descricao}
                        onChange = {e => setDescricao(e.target.value)}
                        placeholder  ="Descrição" />

                        <input
                        value = {valor}
                        onChange = {e => setValor(e.target.value)}
                        placeholder ="Valor em reais" />

                        
                        <button className='button' type='submit'>Cadastrar</button>
                    </form>
                
            </div>
        </div>
    )

}