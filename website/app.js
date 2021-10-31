/* Global Variables */


let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '868d60b0f024eeb9e37e6857f607fb26';

//listen for 'click' and then run processInfo
document.getElementById('generate').addEventListener('click', processInfo)
const zipCode = document.getElementById("zip").value;
const userInput = document.getElementById("feelings").value;

//Once a click occurs, this function will call and get the weather info from the API//
function processInfo(e){
    const zipCode= document.getElementById('zip').value
    const userInput = document.getElementById("feelings").value;
    getWeather(baseURL, zipCode, apiKey)//get weather data//
    .then(function(data){//then post the data to the server//
        postData('/addData', {
            temp:data.main.temp, 
            date:newDate, 
            input:userInput});
        updateUI()//this runs and updates the UI!//
    });
};

const getWeather = async (baseURL, zipCode, apiKey) =>{
    const res = await fetch(baseURL+zipCode+'&units=imperial&appid='+apiKey)
    try {
        const data = await res.json();
        // console.log(data);
        return data;
    }catch (error){
        console.log('error', error);
    }
}

const postData = async (url='', data = {}) => {
    console.log('POST');
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
        // console.log(newData);
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
            // console.log(allData);
            document.getElementById('date').innerHTML = 'Date: '+ allData.date;
            document.getElementById('temp').innerHTML = 'Temp: ' + allData.temp + '\u00B0 F';
            document.getElementById('content').innerHTML ='How I feel today: '+ allData.userInput;
        }catch(error){
            console.log('error', error);
    }

}

// // Create a new date instance dynamically with JS
let d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let newDate = months[d.getMonth()]+'.'+ d.getDate()+'.'+ d.getFullYear();