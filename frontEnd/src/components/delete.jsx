import "./delete.css";
import Perigo from '../assets/warning.png';
import Reject from '../assets/reject.png';

import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function DeletePage(){

    const [ deletar, setDeleta ] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    async function deleteUser(){
        try{
            axios.delete(`http://localhost:3000/info/${userId}`);
            navigate('/');
        } catch (err) { 
            toast.error('Não foi possivel excluir usuario!');
        }
    }
        

    return(
        <>
            <div className="containerDelete">

                <h1>Deletar Conta</h1>

                <img src={Perigo} alt="Deletar Conta" />

                <p>Tenha certeza antes de apagar sua conta, voce perdera suas informações e nao podera recupera-las!</p>

                <button onClick={() => setDeleta(!deletar)}>Deletar</button>

                { deletar ? (
                    <>
                        <div className="confirm">
                            <div className="confirmDelete">

                                <div className="exit" onClick={() => setDeleta(!deletar)}>
                                    <img src={ Reject } alt="Cancelar" />
                                </div>

                                <p>Voce será redirecionado a pagina principal</p>

                                <p>Clique para confirmar</p>

                                <div className="apague">
                                    <button onClick={ deleteUser } >Confirmar</button>
                                </div>

                            </div>
                        </div>
                    </>
                ) : ''}
            </div>
        </>
    )
}