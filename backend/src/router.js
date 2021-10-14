import ejerciciosRouter from './routes/ejercicio'
import userRouter from './routes/user'
import userController from './controllers/user'


export default (app) => {

    app.get('/', async (req, res) => {
        res.send('Router 💻');
    });

    app.use('/ejercicio', ejerciciosRouter)
    app.use('/user', userRouter)
    
  
  }