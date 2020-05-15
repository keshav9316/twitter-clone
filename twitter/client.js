//import { response } from "express";

API_URL ='http://localhost:5000/mews';
const form = document.querySelector("form");
const loadingElement = document.querySelector('.loading');
const list = document.querySelector('#list');
const response = document.querySelector('#response');

loadingElement.style.display ="";

listallcontent();

function submitform(event){
event.preventDefault();
const formdata = new FormData(form);
const name = formdata.get('name');
const content = formdata.get('content');
const mew = {
    name: name,
    content: content
};

form.style.display ="none";
loadingElement.style.display ="";

fetch(API_URL,{
    method: 'POST',
    body: JSON.stringify(mew), // convert entire json to in string format
    headers: {
        'content-type': "application/json" //!important : define what type is being passed
    }
}).then( response => response.json())  // !important: parse the response back to json object form
   .then(createdmew => {
       console.log(createdmew);
       response.style.display = "";
       const response_server = document.createElement('h3');
       response_server.textContent = "Invalid Arguments";

       if( createdmew.status && createdmew.status === "success"){
        response_server.textContent = "success";
        response.style.background = "ffffff";
        response.appendChild(response_server);
       }else{
        response.style.background = "#ff9b9b";
        response.appendChild(response_server);
       }
       setTimeout(() => {
       response.style.display = "none";
       response.removeChild(response_server);
    }, 1000);
      form.reset();
});
form.style.display ="";  //display form
loadingElement.style.display ="none"; //hide loading
}

form.addEventListener('submit',submitform);


function listallcontent(){
    fetch(API_URL).then(response => response.json())
                    .then(database_array => {
                       // console.log(database_array);
                        database_array.forEach(element => {                            
    const div = document.createElement('div');
    const head = document.createElement('h2');
    const text = document.createElement('p');
    const date = document.createElement('small');
    
    head.textContent = element.name;
    text.textContent = element.content;
    date.textContent = new Date(element.date);
    
    div.appendChild(head);
    div.appendChild(text);
    if(date == new Date()){
        div.appendChild(date);
    }
    list.appendChild(div);
     });
    });
         
    loadingElement.style.display = "none";

    }
    
