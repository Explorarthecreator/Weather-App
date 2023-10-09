const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const cardDetails = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');


const updateUI = (data)=>{

    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    // destructirng data and is exactly like the code above and it makes the code cleaner
    const{cityDetails,weather}= data;


    cardDetails.innerHTML = `
                <h5>
                    ${cityDetails.EnglishName}, ${cityDetails.Country.EnglishName}
                </h5>
                <div class="condition">
                    ${weather.WeatherText}
                </div>
                <div class="degrees">
                    <span>
                        ${weather.Temperature.Metric.Value}
                    </span>
                    <span>
                        &deg;C
                    </span>
                </div>
    `;
// Updtae the night and day image
    let timeSrc = weather.IsDayTime? 'img/day.svg':'img/night.svg';

    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg'
    // }else{
    //     timeSrc = 'img/night.svg'
    // }
// ternary ooperator 


    time.setAttribute('src',timeSrc)

    // update the icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src',iconSrc)

    // remove d-none
    if(card.classList.contains('none')){
        card.classList.remove('none')
    }
}

const updateCity = async (city)=>{

    // console.log(city)
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    // return{
    //     cityDetails : cityDetails,
    //     weather : weather
    // };

    // object shorthand notation for the above
    return {
        cityDetails,weather
    }
}

cityForm.addEventListener('submit', e =>{
    e.preventDefault();

    // get value from form
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update the UI
    updateCity(city).then(data=>{
        updateUI(data)
        console.log(data)
    }).catch(err =>{
        console.log(err)
    });
})