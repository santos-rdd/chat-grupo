import User from '../assets/user.png';
import "./update.css";
import Paper from '../assets/paper.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Update (props){

    const [ user, setUser ] = useState();
    const userId = localStorage.getItem('userId');

    const [ nome, setNome ] = useState();
    const [ sobrenome, setSobre ] = useState();

    const [ time, setTime ] = useState(false);

    function corAleatoria() {
        const cores = ["#e74c3c", "#8e44ad", "#3498db", "#16a085", "#f39c12", "#d35400"];
        return cores[Math.floor(Math.random() * cores.length)];
    }


    function atualizar(){
        if(time == true){ return toast.error('Tem que esperar 10 segundo para atualziar o nome novamente!')}

        if(!nome || !sobrenome){return toast.error("Não pode color nome vazio!")};

        if(nome.length < 3 || sobrenome.length < 3 ){return toast.error("As informações precisam ter pelos menos 3 letras!")};

        if(nome.length >= 100 || sobrenome.length >= 100 ){return toast.error("As informações não podem ter mais que 100 caracteres!")};

        axios.put(`http://localhost:3000/info/${userId}`, {
            nome: nome,
            sobrenome: sobrenome 
        }).then(e =>{
            toast.success('Nome e Sobrenome Atualizados!')
            setNome('');
            setSobre('');  
            setUser({ ...user, nome, sobrenome });
            setTime(true)
            setTimeout(()=>{
                setTime(false)
            }, [10000])
        }).catch(err =>{
            toast.error('Não foi possivel atualizar!')
        })

    }
    useEffect(()=>{
        if(userId){
        axios.get(`http://localhost:3000/info/${userId}`).then(e => {
            setUser(e.data);
        })
        }
    },[userId]);

    return (
        <>
        <div className='containerImg'>

            <img src={User} alt="Usuario" />

            <div className='names'>
               {user ? (
                    <>
                        <p style={{ color: corAleatoria()}}>{user.nome}</p>
                        <p style={{ color: corAleatoria()}}>{user.sobrenome}</p>
                    </>
                ) : (
                    <p>Carregando...</p>
                )}

            </div>

            <div className='atualizar'>
                <h2>Atualizar Informações de usuário</h2>

                <input type="text" className="setnome" placeholder='Nome' value={nome}
                onChange={e => setNome(e.target.value)}/>

                <input type="text" className="setsobrename" placeholder='Sobrenome' value={sobrenome}
                onChange={e => setSobre(e.target.value)}/>

                <button onClick={ atualizar }>
                    Atualizar
                    <img src={ Paper } alt="Enviar" />
                </button>
            </div>
        </div>
        </>
    )
}