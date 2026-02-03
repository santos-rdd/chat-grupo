import './userMensagem.css';
import User from '../assets/user.png';

export default function UserMensagem(props){

    const mensagem = props.mensagem;
    const tema = props.tema; 

    return (
             <div className='containerUserMessage2'>
            
                <div className={`containerMsg2 ${ tema ? '' : 'active' }`}>
            
                    <div className='mensagem2'>
                        <p> { mensagem } </p>
                    </div>

                </div>
            </div>
    )
}