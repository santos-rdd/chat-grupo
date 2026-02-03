import './barraEnviar.css';
import Paper from '../assets/paper.png';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function BarraEnviar(props){

    const setMensage = props.setMensage;
    const enviarMensagem = props.enviarMensagem;
    const tema = props.tema;

    const [ mensagem, setMensagensInput ] = useState('');
    const [ timer, setTime ] = useState(false);

    function enviar(){
        if(!mensagem.trim()) return toast.error('A mensagem não pode estar vazia!');
        if(timer) return toast.error('Não podes mandar varias mensagens em sequencia!');

        setMensage(mensagem);
        setMensagensInput('');
        setTime(true);
        enviarMensagem(mensagem);

        setTimeout(()=>{
            setTime(false);
        }, 1000);
    };

    return(
            <div className='barra'>
                <input 
                className={`inputBarra ${tema ? '' : 'active'}`}
                type="text" 
                placeholder='Digite uma mensagem'
                value={ mensagem } 
                onChange={ (e) => setMensagensInput(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                        enviar();
                    }
                }}/>

                <img className="paperSend" src={ Paper } alt="Enviar" onClick={enviar}/>
            </div>
    )
}