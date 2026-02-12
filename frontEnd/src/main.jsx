import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import Info from './page/info.jsx';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/info' element={<Info />} />
      </Routes>
    </BrowserRouter>
  </>
);

/* Avisos */

/* Altere o banco de dados para testar 
   Removi as informações do meu banco pra evitar vazamentos, 
   porque o repositório é público */

/* Evite entrar “furando” a página de login 
   ( digitando rotas direto na barra de endereço )
   Isso pode bagunçar o socket ele vai tentar se conectar com back-end sem 
   ter usuario logado e voce provavelmente nao conseguira mandar mensagens
   já que ele valida o usuario pelo socket.id pra diferenciar quem mandou 
   a mensagem; 
   
   Mais se quiser acessar para testar a rota do chat é (/info) 
   talvez ele pegue o ultimo usuario registrado no banco 
   de dados e permitir que consiga enviar mensagens porem não sei o que acontece
   se nao tiver nenhum usuário salvo no banco ainda estou descobrindo reações do codigo  */

/* Esta é a primeira versão do código então ele ainda tem cara de "codigo sujo" 
   ele foi feito para prática, mas decidi publicar no GitHub 
   porque o resultado ficou interessante 
   Quero trabalhar mais nele no futuro porem por enquanto o projeto 
   vai ficar "congelado" */
