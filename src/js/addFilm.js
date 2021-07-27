import startRender from "./render";


const inputTitul = document.querySelector("#input_title");
const inputYear  = document.querySelector("#input_year");
const inputCountry = document.querySelector("#input_country");
const inputGenre  = document.querySelector("#input_genre");
const inputPoster = document.querySelector("#input_poster");
const inputActors = document.querySelector("#input_actors");
const inputDescription = document.querySelector("#input_description");
const addFilm = document.getElementById("add_film");
const modailOff = document.querySelector('.off_modail');
const infoFilm={};


//=======add new Film

const addFilmFanction = ()=>{
    let everythingFull = false
    

    if(inputTitul.value.length >= 3){
        infoFilm.titul = inputTitul.value;
        everythingFull = true
    }else{
        inputTitul.placeholder = "Title name is too short";
        inputTitul.value = "";
        everythingFull = false
    };

    if(inputYear.value.length === 4){
        infoFilm.year = inputYear.value;
        everythingFull = true
    }else{
        inputYear.placeholder = "The Year is not correct";
        inputYear.value = "";
        everythingFull = false
    };

    if(inputCountry.value.length >= 3){
        infoFilm.country = inputCountry.value;
        everythingFull = true
    }else{
        inputCountry.placeholder = "You have not entered the name of the Country";
        inputCountry.value = "";
        everythingFull = false
    };

    if(inputGenre.value.length >0 ){
        infoFilm.genre = inputGenre.value;
        everythingFull = true
    }else{
        inputGenre.placeholder = "You have not entered a Genre";
        inputGenre.value = "";
        everythingFull = false
    };

    if(inputPoster.value.length >0 ){
        infoFilm.poster = inputPoster.value;
        everythingFull = true
    }else{
        inputPoster.placeholder = "You have not entered a Poster";
        inputPoster.value = "";
        everythingFull = false
    };

    if(inputActors.value.length >0 ){
        infoFilm.acters = inputActors.value;
        everythingFull = true
    }else{
        inputActors.placeholder = "You did not enter the names of the Actors";
        inputActors.value = "";
        everythingFull = false
    };

    if(inputDescription.value.length >0 ){
        infoFilm.description = inputDescription.value;
        everythingFull = true      
    }else{
        inputDescription.placeholder = "You didn’t tell the DESCRIPTION of the movie";
        inputDescription.value = "";
        everythingFull = false
    };

    if(everythingFull != false){
        const arry = JSON.parse(localStorage.getItem("film"));
        const fix = arry.film;

        inputTitul.value = '';
        inputYear.value = '';
        inputCountry.value = '';
        inputGenre.value = '';
        inputPoster.value = '';
        inputActors.value = '';
        inputDescription.value = '';

        

        infoFilm.id = arry.film.length;
        infoFilm.comment = [];
        fix[infoFilm.id] = infoFilm;
        localStorage.setItem("film",JSON.stringify(arry))
        modailOff.classList.toggle('off_modail');
        modailOff.classList.toggle('on_modail');
        startRender();

        
    }else{
        
    }
};

addFilm.addEventListener("click", ()=>{ 
    addFilmFanction()
})


