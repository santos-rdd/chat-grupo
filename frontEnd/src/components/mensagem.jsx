import './mensagem.css'
import User1 from '../assets/user1.png';
import User2 from '../assets/user2.png';

export default function Mensagem(props){

    const user = props.user;
    const mensagem = props.mensagem;
    const tema = props.tema;

    return (
        <div className={`containerUserMessage ${ tema ? 'active' : ''}`}>

            <div className={`containerMsg ${ tema ? 'active' : ''}`}>

                <div className='divUserMessage'>
                    <p> { user } </p>
                </div>

                <div className='mensagem'>
                    <p> { mensagem } </p>
                </div>
            </div>
        </div>
    )
}