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



//=======add new Film

addFilm.addEventListener("click", ()=>{ 
    
    const arry = JSON.parse(localStorage.getItem("film"));

    const fix = arry.film;
    const infoFilm={};
  

    if(inputTitul.value.length >= 3){
        infoFilm.titul = inputTitul.value;
        
        if(inputYear.value.length === 4){
            infoFilm.year = inputYear.value;

            if(inputCountry.value.length >= 3){
                infoFilm.country = inputCountry.value;

                if(inputGenre.value.length >0 ){
                    infoFilm.genre = inputGenre.value;
                    
                    if(inputPoster.value.length >0 ){
                        infoFilm.poster = inputPoster.value;

                        if(inputActors.value.length >0 ){
                            infoFilm.acters = inputActors.value;

                            if(inputDescription.value.length >0 ){
                                infoFilm.description = inputDescription.value;
                                infoFilm.id = arry.film.length;
                                infoFilm.comment = [];
                                fix[infoFilm.id] = infoFilm;
                                console.log()
                                localStorage.setItem("film",JSON.stringify(arry))
                                modailOff.classList.toggle('off_modail');
                                modailOff.classList.toggle('on_modail');
                                startRender();
                                
                            }else{
                                inputDescription.placeholder = "You didn’t tell the DESCRIPTION of the movie";
                                inputDescription.value = "";
                            };

                        }else{
                            inputActors.placeholder = "You did not enter the names of the Actors";
                            inputActors.value = "";
                        };

                    }else{
                        inputPoster.placeholder = "You have not entered a Poster";
                        inputPoster.value = "";
                    };
                    
                }else{
                    inputGenre.placeholder = "You have not entered a Genre";
                    inputGenre.value = "";
                };

            }else{
                inputCountry.placeholder = "You have not entered the name of the Country";
                inputCountry.value = "";
            };

        }else{
            inputYear.placeholder = "The Year is not correct";
            inputYear.value = "";
        };
    }else{
        inputTitul.placeholder = "Title name is too short";
        inputTitul.value = "";
    };

})