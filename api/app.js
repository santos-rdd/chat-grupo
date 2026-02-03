import express from 'express';
import cors from 'cors';
import db from './model/db.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

/*-----------------------------Lidando com socket-----------------------------*/


const server = createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

io.on('connection', (socket)=>{ 
    console.log(`Um usuario esta conectado!`);

    socket.on('registro', (user)=> {
        socket.user = user;

        io.emit('novoUsuario', {
            mensagem: `${socket.user.nome}`
        });

        io.emit('userOnline', {
            id: socket.user.id,   
            nome: socket.user.nome
        });
    });

    socket.on('disconnect', () => {
        if (socket.user) {
            io.emit('userOffline', {   
                id: socket.user.id
            });
        }
    });

    socket.on('serverMensagem', (retorno)=> {
        io.emit('mensagemCliente', {
            id: socket.user.id, 
            mensagem: retorno.mensagem
        });
    });
});


server.listen(3000, ()=>{
    console.log('Servidor On ❤️🔥');
});


/*-----------------------------Lidando com socket-----------------------------*/


/* Pagina principal */
app.get('/', async (req, res)=>{
    const [ rows ] = await db.execute('select * from apresentacao');
    res.status(201).json({ response: rows });
});

app.post('/', async (req, res)=>{
    const { nome, sobrenome } = req.body;

    try{
        const [insert, fields] = await db.execute('insert into apresentacao (nome,sobrenome) values(?,?)', [nome, sobrenome]);
        res.status(201).json({ 
            id: insert.insertId,
            response: insert, 
        });
    } catch (err){
        res.status(500).json({ response: err });
    }

})

/* Outra pagina */
app.get('/info/:id', async ( req, res )=>{
    const { id } = req.params;
    try {
        const [ rows , fields ] = await db.execute('select * from apresentacao where id = ?',[id]);
        res.json(rows[0]);
    } catch(err){
        res.json({ erro: err });
    }
})

app.put('/info/:id', async( req, res ) =>{
    const { id } = req.params;
    const { nome, sobrenome } = req.body;

    try{
        const [ rows, fields ] = await db.execute('update apresentacao set nome = ?, sobrenome = ? where id = ?',[nome, sobrenome, id]);
        res.json({ message: 'Atualizado com sucesso' })
    } catch (err) {
        res.json({ message: err })
    }
})

app.delete('/info/:id' , async ( req, res ) => {
    const { id } = req.params;

    try{
        const [ resultado ] = await db.execute('delete from apresentacao where id = ?', [id]);
        res.status(200).json({ resposta: resultado });
    } catch (err){
        res.status(500).json({ erro: err });
    }
})

