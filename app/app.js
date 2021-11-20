function sortTable() {
  document.getElementById('people-data').innerHTML = `
      <tr><td>Joe</td><td>2022-02-25</td></tr>
      <tr><td>Dave</td><td>2023-12-23</td></tr>
      <tr><td>Cary</td><td>2024-01-24</td></tr>
      <tr><td>Anna</td><td>2027-03-26</td></tr>
    `
}
function reverseSortTable() {
  document.getElementById('people-data').innerHTML = `
      <tr><td>Anna</td><td>2027-03-26</td></tr>
      <tr><td>Cary</td><td>2024-01-24</td></tr>
      <tr><td>Dave</td><td>2023-12-23</td></tr>
      <tr><td>Joe</td><td>2022-02-25</td></tr>
    `
}
document.getElementById('sort-by-date').addEventListener('click', function () {
  // sort the table after some random interval
  setTimeout(sortTable, Math.random() * 2000 + 500)
})
document.getElementById('sort-reverse').addEventListener('click', function () {
  // sort the table after some random interval
  setTimeout(reverseSortTable, Math.random() * 2000 + 500)
})
