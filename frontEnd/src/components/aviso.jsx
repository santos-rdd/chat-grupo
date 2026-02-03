import './aviso.css';

export default function Aviso(props){

    const user = props.user;
    const tema = props.tema; 
    const mensagem = props.mensagem;

    return(
            <div className={`containerUserMessage3 ${ tema ? '' : 'active'}`}>
           
                       <div className={`containerMsg3 ${ tema ? '' : 'active'}`}>
           
                           <div className='divUserMessage3'>
                               <p> { user } </p>
                           </div>
           
                           <div className='mensagem3'>
                               <p> { mensagem } </p>
                           </div>
                       </div>
            </div>
    )
}