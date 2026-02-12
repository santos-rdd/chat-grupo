import "./info.css";
import { useEffect, useState } from 'react';
import axios from "axios";
import socket from '../../socket/socket.js'; 

import Rows from '../components/rows.jsx';
import UpdatePage from '../components/update.jsx';
import DeletePage from '../components/delete.jsx';
import Chat from '../components/chat.jsx';

import Seta from '../assets/seta.png';
import Delete from '../assets/delete.png'
import Read from '../assets/read.png'
import Update from '../assets/update.png'
import Claro from '../assets/claro.png'
import Escuro from '../assets/escuro.png'

export default function Info (){

    const [ rows , setRows ] = useState([]);
    const [ tema , setTema ] = useState(true);
    const [ ativa , setAtiva ] = useState(1);
    const [ mensagemUsuario, setMensagemUsuario ] = useState('');
    const [ avisado, setAvisado ] = useState(false);

    const [ user, setUser ] = useState();
    const userId = localStorage.getItem('userId');

    useEffect(()=>{
        axios.get('http://localhost:3000/').then(e=>{
            const user = e.data.response.find( res => res.id === Number(userId)); 
            setUser(user);
        })
    },[]);

    useEffect(()=>{
        if(!user) return;
        socket.connect();
        

        socket.on('connect', ()=>{
            console.log("Usuario conectado: ", socket.id);
        })

        socket.emit('registro', {
            id: user.id,
            nome: user.nome
        });

        socket.on('novoUsuario', (info)=>{
            setMensagemUsuario(info.mensagem);
            setAvisado(true);
        });

        socket.on('userOffline', (info)=>{
            setMensagemUsuario(info.mensagem);
        })

        return () => {      
            socket.off('connect');
            socket.off('novoUsuario');
            socket.off('userOffline');
            socket.disconnect();
    };
        
    },[user]);

    useEffect(()=>{
        axios.get('http://localhost:3000/').then(e =>{
            setRows(e.data.response);
        })
    },[]);




    useEffect(() => {

        socket.on('userOnline', (user) => {
            setRows(prev =>
                prev.map(r =>
                    r.id === user.id
                        ? { ...r, online: true }
                        : r
                )
            );
        });

        socket.on('userOffline', ({ id }) => {
            setRows(prev =>
                prev.map(r =>
                    r.id === id
                        ? { ...r, online: false }
                        : r
                )
            );
        });

        return () => {
            socket.off('userOnline');
            socket.off('userOffline');
        };

    }, []);





    function corAleatoria() {
        const cores = ["#e74c3c", "#8e44ad", "#3498db", "#16a085", "#f39c12", "#d35400"];
        return cores[Math.floor(Math.random() * cores.length)];
    }

    return (
        <div className={`infoContainer ${ tema ? '' : 'active'}`}>
            <div className="cont">

                <div className="iconsCont">
                    <div className="sideBar">
                        <img className={`${ativa == 1 ? "activeImg" : ""}`}src={ Read } alt="usuarios" onClick={()=> setAtiva(1)}/>

                        <img className={`${ativa == 2 ? "activeImg" : ""}`}src={ Update } alt="mudar nome"  onClick={()=> setAtiva(2)}/>

                        <img className={`${ativa == 3 ? "activeImg" : ""}`}src={ Delete } alt="apagar informações"  onClick={()=> setAtiva(3)}/>

                    { tema ? (
                        <img className="teme" src={ Escuro } alt="tema claro" 
                        onClick={()=> setTema(!tema)}/>
                        ) : 
                        <img className="teme" src={ Claro } alt="tema escuro" 
                        onClick={()=> setTema(!tema)}/>
                        }
                    </div>

                        
                </div>

                <div className={`estrutura`}>
                    { ativa === 1 && (
                        <>
                            <h1>
                                Chats
                            </h1>
                            { rows.map((r)=>(
                                <Rows 
                                    key={r.id}
                                    nome={r.nome}
                                    sobrenome={r.sobrenome}
                                    cor={corAleatoria()}
                                    status={r.online}
                                />
                            ))}
                        </>
                    )}

                    { ativa === 2 && (
                        <>
                            <UpdatePage/>
                        </>
                    )}
                    
                    { ativa == 3 && (
                        <>
                            <DeletePage />
                        </>
                    )}

                    </div>
                   
            </div>       

            <Chat tema={ tema } novoUsuario={ mensagemUsuario } avisado={ avisado }/> 
        </div>
    )
}