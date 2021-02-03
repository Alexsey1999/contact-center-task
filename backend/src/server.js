const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3001

app.post('/add', async (req, res) => {
  const arr = new Map(req.body)

  const one = arr.get('one')
  const two = arr.get('two')

  const dataFromDb = await db.query(
    'INSERT INTO task.app (one, two) VALUES($1, $2) RETURNING *',
    [one, two]
  )

  res.status(200).json(dataFromDb)
})

app.get('/fetchData', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM task.app')
  res.status(200).json(rows)
})

app.delete('/delete', async (req, res) => {
  await db.query('DELETE FROM task.app')
  res.status(200).json({ message: 'Данные успешно удалены' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})
