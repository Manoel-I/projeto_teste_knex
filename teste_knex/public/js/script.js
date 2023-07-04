

let btn_createTable = document.getElementById('btn_createTable').addEventListener("click", function () {
  createTable();
});


async function fill_tables_list() {
  let list = document.getElementById('ul_lista_games');

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  let elements;
  await fetch('/tables', {
    method: 'GET',
  }).then(response => {
    if (!response.ok) {
      throw new Error('fail');
    }
    return response.json();
  }).then(data => {
    elements = data;
  }).catch(error => {
    console.log(error);
  });

  elements.forEach(e => {
    let item = document.createElement('li');
    item.innerText = e.Tables_in_knex_teste;
    list.appendChild(item);
    create_btn_delete(item);
    let break_row = document.createElement("br");
    list.appendChild(break_row);
  });
}

function create_btn_delete(tag_father){
  let btn_delete = document.createElement('button');
  tag_father.setAttribute('data-table', tag_father.innerText);
  btn_delete.addEventListener("click", function(){
    delete_table(tag_father);
  });
  btn_delete.className = "btn btn-outline-danger";
  btn_delete.innerText = "Delete";
  btn_delete.style.height = "33px";
  btn_delete.style.width = "100px";
  btn_delete.style.marginLeft = "100px";
  tag_father.appendChild(btn_delete);
  
}

async function delete_table(tag_father){
  let table_name =tag_father.getAttribute("data-table");
  console.log(table_name);
  await fetch(`/delete/${table_name}`, {
    method : "DELETE"
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    return response.json();
  })
  .then(response =>{
    console.log(response);
  })
  .catch(err =>{
    console.log(err);
  })
  fill_tables_list();
}

fill_tables_list();

async function createTable() {
  let table_name_input = document.getElementById('tableName');

  if (table_name_input.value == '' || table_name_input.value == undefined) {
    return alert('nome da tabela invalido');;
  }

  let response;
  await fetch('/create', {
    body: JSON.stringify({ table_name: table_name_input.value }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      return response.json();
    })
    .then(data => {
      response = data;
    })
    .catch(error => {
      response = error;
  });

  console.log(response);
  table_name_input.value = '';
  fill_tables_list();
  alert(response.message);
}