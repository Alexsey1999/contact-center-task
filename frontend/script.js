const form = document.querySelector('form')
const one = document.querySelector('.one')
const two = document.querySelector('.two')
const result = document.querySelector('.result')
const sendBtn = document.querySelector('.send-btn')
const showBtn = document.querySelector('.show-btn')
const clearBtn = document.querySelector('.clear-btn')
const table = document.querySelector('table')
const tableContainer = document.querySelector('.table-container')

const host = 'http://localhost:3001'

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const oneVal = one.value
  const twoVal = two.value

  if (!oneVal || !twoVal) {
    return
  }

  const arr = new Map()
  arr.set('one', oneVal)
  arr.set('two', twoVal)

  try {
    await fetch(`${host}/add`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Array.from(arr.entries())),
    })

    sendBtn.classList.add('success')
  } catch (error) {
    sendBtn.classList.add('error')
  }
})

showBtn.addEventListener('click', async (e) => {
  try {
    const response = await fetch(`${host}/fetchData`)
    const data = await response.json()

    let html = '<table>'
    html += '<tr>'

    for (let j in data[0]) {
      html += '<th>' + j + '</th>'
    }

    html += '</tr>'

    for (let i = 0; i < data.length; i++) {
      html += '<tr>'
      for (let j in data[i]) {
        html += '<td>' + data[i][j] + '</td>'
      }
      html += '</tr>'
    }

    html += '</table>'
    tableContainer.innerHTML = html

    result.classList.add('show-result')
    e.target.disabled = true
  } catch (error) {
    e.target.disabled = false
  }
})

clearBtn.addEventListener('click', (e) => {
  one.value = ''
  two.value = ''

  sendBtn.classList.remove('success')
  showBtn.disabled = false

  result.classList.remove('show-result')

  tableContainer.querySelectorAll('tr').forEach((el) => {
    el.remove()
  })
})
