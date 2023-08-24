const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      date: "2019-05-30T18:39:34.091Z",
      important: true
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    },
    {
      content: "Developing with React is easy",
      important: false,
      id: 4
    },
    {
      content: "Now learning is very straightforward",
      important: false,
      id: 5
    },
    {
      content: "JavaScript is cool!!!!",
      date: "2022-12-05T02:39:55.694Z",
      important: false,
      id: 6
    },
    {
      content: "JavaScript isn't Java",
      date: "2022-12-05T02:40:57.280Z",
      important: false,
      id: 7
    },
    {
      content: "Python too is a good language",
      date: "2022-12-06T01:42:40.006Z",
      important: false,
      id: 8
    },
    {
      content: "What about Rust?",
      date: "2023-08-02T23:08:23.583Z",
      important: false,
      id: 9
    }
  ]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/notes', (request, response) => {
    response.json(notes)
})

app.get('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0

  return maxId + 1
}

app.post('/notes', (request, response) => {
  const body = request.body

  if (body.content === '') {
    response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }

  notes = notes.concat(note)

  response.json(note)
})

app.delete('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})