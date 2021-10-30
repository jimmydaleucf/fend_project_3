/* Global Variables */

const endpoint = {};

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '868d60b0f024eeb9e37e6857f607fb26';

//listen for 'click' and then run processInfo
document.getElementById('generate').addEventListener('click', processInfo)
const zipCode = document.getElementById("zip").value;
const userInput = document.getElementById("feelings").value;

function processInfo(e){
    const zipCode= document.getElementById('zip').value
    const userInput = document.getElementById("feelings").value;
    getWeather(baseURL, zipCode, apiKey)
    .then(function(data){
        // console.log(data);
        // console.log(data.main.temp);
        // console.log(userInput);
        // console.log(newDate);//working through this line// 
        postData('/addData', {temp:data.main.temp, date:newDate, input:userInput});
        updateUI()
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
    console.log('POST');
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });
    // console.log(data);

    try {
        const newData = await response.json();
        console.log(newData);
        // console.log(newData);//problem seems to be around here, newData is coming back empty//
        return newData;
        
    }
    catch(error) {
        console.log('error', error);
    }
}
const updateUI= async(url ='')=>{
    const request = await fetch('/all')
    try{
        const allData = await request.json()
        console.log(allData);
        document.getElementById('date').innerHTML = alldata[0].date;
        document.getElementById('temp').innerHTML = alldata[0].temp;
        document.getElementById('content').innerHTML = alldata[0].userInput;
    }catch(error){
        console.log('error', error);
    }

}

// // Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();