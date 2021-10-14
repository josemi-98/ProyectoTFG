import ejerciciosRouter from './routes/ejercicio'

export default (app) => {

    app.get('/', async (req, res) => {
        res.send('Router 💻');
    });

    app.use('/ejercicio', ejerciciosRouter)
  
  }