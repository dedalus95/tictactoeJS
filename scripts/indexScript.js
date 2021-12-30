


function store() {
  const p1Name = document.getElementById('p1Name');
  const p2Name = document.getElementById('p2Name');
  const p1Symbol = document.getElementById('p1Symbol');
  const p2Symbol = document.getElementById('p2Symbol');

  localStorage.setItem('p1Name', p1Name.value);
  localStorage.setItem('p2Name', p2Name.value);
  localStorage.setItem('p1Symbol', p1Symbol.value);
  localStorage.setItem('p2Symbol', p2Symbol.value);

}


document.getElementById('submitBtn').addEventListener('click', store);