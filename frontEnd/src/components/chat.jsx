import './chat.css';
import Mensagem from '../components/mensagem.jsx'
import UserMensagem from '../components/userMensagem.jsx'
import BarraEnviar from '../components/barraEnviar.jsx';
import Aviso from '../components/aviso.jsx';
import { useState, useEffect } from 'react';
import socket from '../../socket/socket.js'; 
import { toast } from 'react-toastify';

export default function Chat(props){

    const tema = props.tema;
    const user = props.novoUsuario;
    const avisado = props.avisado;

    const [ mensagem, setMensagem ] = useState('');
    const [ mensagemInput, setMensagemInput ] = useState([]);
    const [ userMensagem, setUserMensagem ] = useState();

    const [ usuarios, setUsuarios ] = useState([]);
    const [ saiu, setSaidos ] = useState([]);
    const [ eventos, setEventos ] = useState([]);

    console.log(eventos);
    console.log(mensagem);
    console.log(mensagemInput);
    console.log(userMensagem);

    useEffect(()=>{
        if(!user) return;
        setUsuarios(p => 
            { if (p.includes(user)) return p;
                return [...p, user]
            });

            setEventos( p => [
            ...p,
            {
                tipo: 'aviso',
                user,
                mensagem: 'acabou de se juntar a conversa'
            }
        ]);
    },[user]);

    useEffect(()=>{

        socket.on('erroMensagem', (data) =>{
            toast.error(data.erro);
        })

        socket.on('mensagemCliente', (data)=>{
            if(!data.nome?.trim()) return;
            if(!data.mensagem?.trim()) return;

            setUserMensagem(data.nome);
            setMensagemInput(p => [...p, { id: data.id, user: data.nome, mensagem: data.mensagem}]);
        
            setEventos(p => [
                    ...p,
                    {
                        tipo: 'mensagem',
                        id: data.id,
                        user: data.nome,
                        mensagem: data.mensagem
                    }
                ]);
        
        })

        return () => {
            socket.off('mensagemCliente');
            socket.off('erroMensagem');
        };
    }, []);



    function enviarMensagem(msg){
        socket.emit('serverMensagem',{
            nome: user,
            mensagem: msg
        })
    }


        return (
        <div className='maximoContainer'>
            <h1 className={`titleChat ${ tema ? '' : 'active'}`}>
                Chat em Grupo
            </h1>

            <div className={`containerChat ${ tema ? 'active' : ''}`}>

                {eventos.map((e, index) => {

                    if (e.tipo === 'aviso' && avisado) {
                        return (
                            <Aviso
                                key={index}
                                user={e.user}
                                tema={tema}
                                mensagem={e.mensagem}
                            />
                        );
                    }

                    if (e.tipo === 'mensagem') {
                        const minhaMensagem = e.id === socket.id;

                        return minhaMensagem ? (
                            <UserMensagem
                                key={index}
                                mensagem={e.mensagem}
                                tema={tema}
                            />
                        ) : (
                            <Mensagem
                                key={index}
                                user={e.user}
                                mensagem={e.mensagem}
                                tema={tema}
                            />
                        );
                    }

                    return null;
                })}

            </div>

            <BarraEnviar
                enviarMensagem={ enviarMensagem }
                setMensage={ setMensagem }
                tema={ tema }
            />
        </div>
    );
}
