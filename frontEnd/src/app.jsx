import axios from 'axios';
import './app.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function App(props){

    const [ nome, setNome ] = useState('');
    const [ sobreNome, setSobre ] = useState('');
    const [ page, setPage ] = useState(true);
    const navigate = useNavigate();

    function cadastro(e){
        e.preventDefault();
        if(!nome || !sobreNome){return toast.error("Não pode color nome vazio!")};
        if(nome.length < 3 || sobreNome.length < 3 ){return toast.error("As informações precisam ter pelos menos 3 letras!")};
        if(nome.length >= 100 || sobreNome.length >= 100 ){return toast.error("As informações não podem ter mais que 100 caracteres!")};

        axios.post('http://localhost:3000/', {
            nome: nome,
            sobrenome: sobreNome
        }).then(e => {
            toast.success("Cadastrado com sucesso!");
                setNome("");
                setSobre("");
                localStorage.setItem('userId', e.data.id);
                navigate('/info');
        }).catch(err => {
            toast.error("Erro ao cadastrar!");
            console.log(err);
        })
    }

    return (
        <>
                    <div className="container">
                        <div className={`card ${page ? "" : "active"}`}>
                            <div className="left">
                                    <h1>Bem vindo!</h1>
                                    <p>Uma pequena apresentação de um programador iniciante</p>
                                    <p>( Não criei o design apenas copiei )</p>
                                    <button onClick={ () => setPage(!page) }>
                                        {page ? "Entrar" : "Voltar"}
                                    </button>
                            </div>


                            <div className="right">
                                <h2>Criar Conta</h2>

                                <div className="socials">
                                    <span className='infos'>L</span>
                                    {/* Git Hub não esquecer */}
                                    <span className='infos'>G</span>
                                    <span className='infos'>In</span>
                                </div>


                                <form onSubmit={ cadastro }>
                                    <input type="text" placeholder="Nome" 
                                    onChange={(e)=> setNome(e.target.value)}
                                    value={nome}/>
                                    
                                    <input type="text" placeholder="Sobrenome" 
                                    onChange={(e)=> setSobre(e.target.value)}
                                    value={sobreNome}/>

                                    <button type="submit">Cadastrar</button>
                                </form>
                            </div>
                        </div>                
                </div>    
        </>          
    )
}