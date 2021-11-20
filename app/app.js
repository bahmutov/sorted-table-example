const list = [
  {
    name: 'Joe',
    date: '1990-02-25',
  },
  {
    name: 'Anna',
    date: '2010-03-26',
  },
  {
    name: 'Dave',
    date: '1997-12-23',
  },
  {
    name: 'Cary',
    date: '2001-01-24',
  },
]
const itemToRow = (item) =>
  `<tr><td>${item.name}</td><td>${item.date}</td></tr>`
const listToHtml = (list) => list.map(itemToRow).join('\n')

function sortTable() {
  const sorted = [list[0], list[2], list[3], list[1]]
  document.getElementById('people-data').innerHTML = listToHtml(sorted)
}
function reverseSortTable() {
  const sorted = [list[1], list[3], list[2], list[0]]
  document.getElementById('people-data').innerHTML = listToHtml(sorted)
}

// set the initial table
document.getElementById('people-data').innerHTML = listToHtml(list)

document.getElementById('sort-by-date').addEventListener('click', function () {
  // sort the table after some random interval
  setTimeout(sortTable, Math.random() * 2000 + 500)
})
document.getElementById('sort-reverse').addEventListener('click', function () {
  // sort the table after some random interval
  setTimeout(reverseSortTable, Math.random() * 2000 + 500)
})
