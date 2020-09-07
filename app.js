window.addEventListener('load',()=>{
    let long;
    let lat;

    let tempholder=document.querySelector('.temperature-degree');
    let conditionholder=document.querySelector('.temperature-description');
    let tzoneholder=document.querySelector('.location-timezone');
    let iconholder=document.querySelector('.condition-icon'); //try using query selector
    let unitholder=document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positon=>{
            console.log(positon);
            long=positon.coords.longitude;
            lat=positon.coords.latitude;
            
            // const apikey='124c7752eb29fee33241cabb396fd0b7';
            const proxy='https://cors-anywhere.herokuapp.com/';
            const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=124c7752eb29fee33241cabb396fd0b7&units=metric`;
            
            fetch(api)
                .then(response=>{
                    return response.json();
                })
                .then(data=>{
                    console.log(data);
                    const temp=data.main.temp;
                    const condition=data.weather[0].main;
                    const tzone=data.sys.country;
                    const iconcode=data.weather[0].icon;
                    console.log(temp);
                    console.log(condition);
                    console.log(tzone);
                    console.log(iconcode);
                    tempholder.textContent=temp;
                    conditionholder.textContent=condition;
                    tzoneholder.textContent=tzone;
                    iconholder.src="http://openweathermap.org/img/wn/"+iconcode+"@2x.png";

                    tempholder.addEventListener("click",()=>{
                        if(unitholder.textContent=="C")
                        {
                            tempholder.textContent=(temp*(9/5)+32).toFixed(2);
                            unitholder.textContent="F";
                            
                        }
                        else
                        {
                            tempholder.textContent=temp;
                            unitholder.textContent="C";
                        }
                        

                    })
                });
        });
    }
});