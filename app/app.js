const list = [
  {
    name: 'Joe',
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
    name: 'Joe',
    date: '2001-01-24',
    age: 30,
  },
]
const itemToRow = (item) =>
  `<tr><td>${item.name}</td><td>${item.date}</td><td>${item.age}</td></tr>`
const listToHtml = (list) => list.map(itemToRow).join('\n')

function sortTable() {
  const sorted = [list[0], list[2], list[3], list[1]]
  document.getElementById('people-data').innerHTML = listToHtml(sorted)
  enableButtons()
}
function reverseSortTable() {
  const sorted = [list[1], list[3], list[2], list[0]]
  document.getElementById('people-data').innerHTML = listToHtml(sorted)
  enableButtons()
}

// set the initial table
document.getElementById('people-data').innerHTML = listToHtml(list)

function disableButtons() {
  document.getElementById('sort-by-date').setAttribute('disabled', 'disabled')
  document.getElementById('sort-reverse').setAttribute('disabled', 'disabled')
}

function enableButtons() {
  document.getElementById('sort-by-date').removeAttribute('disabled')
  document.getElementById('sort-reverse').removeAttribute('disabled')
}

document.getElementById('sort-by-date').addEventListener('click', function () {
  disableButtons()
  // sort the table after some random interval
  setTimeout(sortTable, Math.random() * 2000 + 800)
})
document.getElementById('sort-reverse').addEventListener('click', function () {
  disableButtons()
  // sort the table after some random interval
  setTimeout(reverseSortTable, Math.random() * 2000 + 800)
})
