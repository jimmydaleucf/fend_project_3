/* Global Variables */

const data = {};

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '868d60b0f024eeb9e37e6857f607fb26';

document.getElementById('generate').addEventListener('click', processInfo)


function processInfo(e){
    const zipCode= document.getElementById('zip').value
    const userInput = document.getElementById("feelings").value;
    getWeather(baseURL, zipCode, apiKey)
    .then(function(data){
        console.log(data);
        console.log(data.main.temp);
        console.log(userInput);
        console.log(newDate);//working through this line// 
        postData(url='/addData', {temp:data.main.temp, date:newDate, input:userInput});
    });
};

const getWeather = async (baseURL, zipCode, apiKey) =>{
    const res = await fetch(baseURL+zipCode+'&units=imperial&appid='+apiKey)
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }catch (error){
        console.log('error', error);
    }
}

const postData = async (url='', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log(response);

    try {
        const newData = await response.json();
        console.log(newData);//problem seems to be around here, newData is coming back empty//
        return newData;
    }
    catch(error) {
        console.log('error', error);
    }
}

// // Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();