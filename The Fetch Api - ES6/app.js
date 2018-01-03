// UI components
document.getElementById('button1').addEventListener('click',getText);
document.getElementById('button2').addEventListener('click',getJson);
document.getElementById('button3').addEventListener('click',getExternalApi);

//1. Get local txt data
function getText(){
    fetch('text.txt')  
       .then(response => response.text()
           //1. Call the fetch function passing the url of the API as a parameter
           //console.log(response);
           //console.log(response.text()); // we get a promise
        )
        .then(data => { 
           //2 Your code for handling the data you get from the API    
               //console.log(data);
           document.getElementById('output').innerHTML = data;
       })
       .catch(error => console.log(error));  //3. This is where you run code if the server returns any errors    
}

//2. Get local JSON data
function getJson(){
    fetch('posts.json')  
        .then(response => response.json())
        .then(data => {         
            let out = '';
            data.forEach(post => {
               out += `<li>${post.title }</li>`;
             });
               document.getElementById('output').innerHTML = out;
        })
        .catch(error => console.log(error));
}

//3. Get from External API
function getExternalApi(){
    fetch('https://api.github.com/users')  
        .then(response => response.json())
        .then(data => {         
           let out = '';
            data.forEach(user => {
               out += `
                <li><i class="fa fa-user-o" aria-hidden="true"></i> ${user.login }</li>
                <li><img src="${user.avatar_url}" width="80"></li>
                <li><i class="fa fa-globe" aria-hidden="true"></i><a href="${user.html_url}" target="_blank"> ${user.html_url}</a> </li>
                <hr>
               `;
        });
            document.getElementById('output').innerHTML = out;
        })
        .catch(error => console.log(error));
}