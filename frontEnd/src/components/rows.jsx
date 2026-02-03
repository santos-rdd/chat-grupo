import "./rows.css";
import User from '../assets/user.png';

export default function Rows(props){

    const nome = props.nome;
    const sobrenome = props.sobrenome;
    const cor = props.cor;
    const status = props.status;

    return (
        <div className="persona">
            <div className="user">
                <img src={ User } alt="Usuario" />
                <p style={{ color: cor }}>{ nome }</p>
                <p style={{ color: cor }}>{ sobrenome }</p>
                { status ? (
                    <p className='statusStyle on'> Online </p>
                ): (
                    <p className='statusStyle off'> Offline </p>
                )}
            </div>

            <div className="message">
                <p>Message</p>
            </div>
        </div>
    )
}