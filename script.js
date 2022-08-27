let weather={
    displayWeather:function(data){
        
        var d = new Date();
        var n = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        localStorage.when=n+":"+m+":"+s;
        var loc_locaton=localStorage.getItem("location");
        var loc_temp=localStorage.getItem("temp");
        var loc_pressure=localStorage.getItem("pressure");
        var loc_humidity=localStorage.getItem("humidity");
        var loc_wind=localStorage.getItem("wind");
        var loc_winddeg=localStorage.getItem("winddeg");
        var loc_description=localStorage.getItem("description");
        var loc_icon=localStorage.getItem("icon");
        // console.log(loc_temp); 
            if(localStorage.when != null
                && parseInt(localStorage.when) + 300000 > Date.now()) {
                // console.log(data);
                document.querySelector(".location").innerText=loc_locaton;
                document.querySelector(".temp").innerText=loc_temp+"°C";
                document.querySelector(".info").innerText=loc_description;
                document.querySelector("#wind").innerHTML=loc_wind+"kph"+" "+loc_winddeg+"°";
                document.querySelector("#hum").innerHTML=loc_humidity+"%";
                document.querySelector("#per").innerHTML=loc_pressure+" "+"hPa";
                document.querySelector("#icon").src="http://openweathermap.org/img/w/"+loc_icon+".png";
            } 
            else {
                fetch('http://localhost/prototype2/grish.php/')
                .then(response => response.json())
                .then(response => {
                console.log(response);
                window.localStorage.clear();
                window.localStorage.setItem("location",response.location);
                window.localStorage.setItem("temp",response.temperature);
                window.localStorage.setItem("pressure",response.pressure);
                window.localStorage.setItem("humidity",response.humidity);
                window.localStorage.setItem("wind",response.wind);
                window.localStorage.setItem("winddeg",response.winddeg);
                window.localStorage.setItem("description",response.weatherdesc);
                window.localStorage.setItem("icon",response.icon);
                var d = new Date();
                var n = d.getHours();
                var m = d.getMinutes();
                var s = d.getSeconds();
                localStorage.when=n+":"+m+":"+s;
                
                
                var loc_locaton=localStorage.getItem("location");
                var loc_temp=localStorage.getItem("temp");
                var loc_pressure=localStorage.getItem("pressure");
                var loc_humidity=localStorage.getItem("humidity");
                var loc_wind=localStorage.getItem("wind");
                var loc_winddeg=localStorage.getItem("winddeg");
                var loc_description=localStorage.getItem("description");
                var loc_icon=localStorage.getItem("icon");
            
            document.querySelector(".location").innerText=loc_locaton;
            document.querySelector(".temp").innerText=loc_temp+"°C";
            document.querySelector(".info").innerText=loc_description;
            document.querySelector("#wind").innerHTML=loc_wind+"kph"+" "+loc_winddeg+"°";
            document.querySelector("#hum").innerHTML=loc_humidity+"%";
            document.querySelector("#per").innerHTML=loc_pressure+" "+"hPa";
            document.querySelector("#icon").src="http://openweathermap.org/img/w/"+loc_icon+".png";
            })
        }

        //for the time calculaion of sunrise and sunset
        theDate = new Date((data.sunrise) * 1000);
        dateString = theDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        document.querySelector("#up").innerHTML=dateString;
        thedate = new Date(data.sunset * 1000);
        datestring = thedate.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true });
        document.querySelector("#down").innerHTML=datestring;  
    },
    dailyweather: function(city){
        fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=9655cc0b7f1f78ea68cac5236d885963&units=metric')
        .then((daily)=> daily.json())
        .then((value)=>this.displayDaily(value));
    },
    displayDaily: function(value){
        
        document.querySelector(".d2").innerHTML = value.list[0].main.temp_max+"&deg;C"+"/"+value.list[0].main.temp_min+"&deg;C";
        document.querySelector(".d3").innerHTML = value.list[7].main.temp_max+"&deg;C"+"/"+value.list[7].main.temp_min+"&deg;C";
        document.querySelector(".d4").innerHTML = value.list[15].main.temp_max+"&deg;C"+"/"+value.list[15].main.temp_min+"&deg;C";
        document.querySelector(".d5").innerHTML = value.list[23].main.temp_max+"&deg;C"+"/"+value.list[23].main.temp_min+"&deg;C";
        document.querySelector(".d6").innerHTML = value.list[31].main.temp_max+"&deg;C"+"/"+value.list[31].main.temp_min+"&deg;C";
        document.querySelector(".d7").innerHTML = value.list[39].main.temp_max+"&deg;C"+"/"+value.list[39].main.temp_min+"&deg;C";
        document.querySelector("#i1").src="http://openweathermap.org/img/w/"+value.list[0].weather[0].icon+".png";
        document.querySelector("#i2").src="http://openweathermap.org/img/w/"+value.list[7].weather[0].icon+".png";
        document.querySelector("#i3").src="http://openweathermap.org/img/w/"+value.list[15].weather[0].icon+".png";
        document.querySelector("#i4").src="http://openweathermap.org/img/w/"+value.list[23].weather[0].icon+".png";
        document.querySelector("#i5").src="http://openweathermap.org/img/w/"+value.list[31].weather[0].icon+".png";
        document.querySelector("#i6").src="http://openweathermap.org/img/w/"+value.list[39].weather[0].icon+".png";
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
        this.dailyweather(document.querySelector(".search-bar").value);
    },
    quotefetch: function(){
    fetch('http://api.quotable.io/random')
	.then(response => response.json())
	.then(data => this.quote(data))
    },
    quote: function(data){
        var{content}=data;
        var{author}=data;
        console.log(content,author);
        document.querySelector(".quote").innerHTML=content;
        document.querySelector(".author").innerText="-"+author;
    },
    time: function(){
        var date=new Date();
        var day=date.getDate();
        var min=date.getMinutes();
        var hour=date.getHours();
        var hours= hour > 12 ? hour - 12 : hour;
        var month=date.getMonth();
        var year=date.getFullYear();
        
        const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        document.querySelector(".date").innerText=day+" "+monthNames[month]+" "+year;
        document.querySelector(".time").innerText=hours+":"+min;;
    }
};

document
    .querySelector(".search button")
    .addEventListener("click",function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key==="Enter"){
        weather.search();
    }
});
weather.quotefetch();
weather.dailyweather("Jaleshwar");
function runfunction(){
    weather.displayWeather();
    setInterval(runfunction,300000)
};
runfunction();

function timerun(){
    weather.time();
    setInterval(timerun,1000);
};

let d= new Date();
let day = d.getDay();
let daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
function checkday(n){
    if(n + day>6){
        return n+day-7;
    }
    else{
        return n+day;
    }
}
for(let i=0;i<8;i++){
    document.querySelector("#day"+(i+1)).innerHTML = daylist[checkday(i)];
}
