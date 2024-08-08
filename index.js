const express = require('express')
const customers = require('./routes/customers')

const app = express()
const port = 6546

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/flatline/customers', customers)

app.listen(port, () => {
    console.log(`Flatline app listening on port ${port}`)
})