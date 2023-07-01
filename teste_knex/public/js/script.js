

let btn_createTable = document.getElementById('btn_createTable').addEventListener("click", function(){
    createTable();
});


function createTable(){
    let table_name_input = document.getElementById('tableName').value;

    if(table_name_input == '' || table_name_input == undefined){
        return alert('nome da tabela invalido');;
    }

    let table_name_json ={
        table_name : table_name_input
    }
    
    let action_config_fetch = { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(table_name_json)
    };

    fetch('/create_table',action_config_fetch)
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);    
    });

}