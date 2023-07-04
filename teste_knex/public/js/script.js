

let btn_createTable = document.getElementById('btn_createTable').addEventListener("click", function(){
    createTable();
});

function fill_tables_list(){
    let list = document.getElementById('ul_lista_games');
    if(list.firstChild != null){
        return;
    }
}


async function createTable(){
    let table_name_input = document.getElementById('tableName').value;

    if(table_name_input == '' || table_name_input == undefined){
        return alert('nome da tabela invalido');;
    }

    let response; 
    await fetch('/create', {
        method: 'POST',
        body: JSON.stringify({ table_name : table_name_input}),
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
    alert(response.message);
}