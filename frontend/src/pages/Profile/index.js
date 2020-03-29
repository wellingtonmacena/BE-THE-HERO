import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'


import './styles.css'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Profile(){
    const [casos, setCasos] = useState([])
    const ongId = localStorage.getItem('ongId')
    const ongNome = localStorage.getItem('ongNome')
    const history = useHistory()

    useEffect(() =>{
        api.get('profile',
        {
            headers:{
                authorization: ongId,
            }
        }).then(response =>{
            setCasos(response.data)
        })

    }, [ongId])

    async function handleDeleteCaso(id){
        try{
            await api.delete(`cases/${id}`,{
                headers:{
                    authorization: ongId,
                }
            })

            setCasos(casos.filter(caso => caso.id !== id))
        } catch(error){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/')

    }



    return(
        <div className='profile-container'>
            <header>
            <img src={logoImg} alt='Seja O Herói'/>
            <span>Bem-vinda, {ongNome}</span>


            <Link className='button' to='/new'>Cadastrar novo caso</Link>
            <button type='button'
                onClick ={handleLogout}>
                <FiPower size={18} color ='#e02041'/>
                
            </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>    
                {casos.map(caso => (
                <li key={caso.id}>
                <strong>CASO: </strong>
                <p>{caso.titulo}</p>

                <strong>DESCRIÇÃO: </strong>
                <p>{caso.descricao}</p>

                <strong>VALOR: </strong>
                <p> {Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL'}).format(caso.valor)}</p>

                <button type='button'
                    onClick = {() =>handleDeleteCaso(caso.id)}>

                    <FiTrash2 size={20} color='#a8a8b3'/>
                </button>
            </li>
                ))}

            </ul>
        </div>
    )
}