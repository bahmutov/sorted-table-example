const list = [
  {
    name: 'Joe Z',
    date: '1990-02-25',
    age: 20,
  },
  {
    name: 'Anna',
    date: '2010-03-26',
    age: 37,
  },
  {
    name: 'Dave',
    date: '1997-12-23',
    age: 25,
  },
  {
    name: 'Joseph',
    date: '2001-01-24',
    age: 30,
  },
  {
    name: 'Jonathan',
    date: '2004-02-01',
    age: 30,
  },
]

let filtered = list

const itemToRow = (item) =>
  `<tr><td>${item.name}</td><td>${item.date}</td><td>${item.age}</td></tr>`
const listToHtml = (list) => list.map(itemToRow).join('\n')

// set the initial table
document.getElementById('people-data').innerHTML = listToHtml(filtered)

document.getElementById('by-name').addEventListener('input', (e) => {
  const filter = e.target.value
  setTimeout(() => {
    filtered = list.filter((item) => item.name.includes(filter))
    document.getElementById('people-data').innerHTML = listToHtml(filtered)
  }, 1000)
})
