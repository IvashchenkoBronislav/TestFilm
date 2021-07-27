

const content = document.querySelector('.content__film_labr');

//===== create first film
const firsObject = {
    titul: "Огонь",
    year: "2020",
    country: "Россия",
    genre: "Катастрофы, Приключения, Драмы",
    acters:	"Константин Хабенский, Иван Янковский, Стася Милославская",
    poster: "https://www.kino-teatr.ru/movie/poster/130649/105055.jpg",
    description: "Группа из шести десантников-пожарных находится в эпицентре лесного пожара. Руководитель группы инструктор Алексей Соколов приказывает подчиненным лечь на землю и укрыться огнеупорными одеялами. Однако один из пожарных, поддавшись приступу паники, бежит в лес, увидев просвет в пламени. Он погибает в огненной ловушке.",
    id:0,
    comment:['test comment','test comment']
};

const start =(obj)=>{
    const filmList =JSON.stringify({
        film:[obj]
    }) 

    localStorage.setItem("film", filmList)
};

if(localStorage.length === 0){
    start(firsObject)
};

//=== Edit modail Close

const closeModailEdit = (el)=>{
    el.classList.toggle('on_modail');
    el.classList.toggle('off_modail');
}

// ===Edit Modail value 

const editValueImput = (obj, num)=>{
    
    const titulValue = document.querySelector(`#input_title${num}`);
    const yearValue = document.querySelector(`#input_year${num}`);
    const countryValue = document.querySelector(`#input_country${num}`);
    const genreValue = document.querySelector(`#input_genre${num}`);
    const posterValue = document.querySelector(`#input_poster${num}`);
    const actorValue = document.querySelector(`#input_actors${num}`);
    const descriptionValue = document.querySelector(`#input_description${num}`);

    titulValue.value = obj.titul;
    yearValue.value = obj.year;
    countryValue.value = obj.country;
    genreValue.value = obj.genre;
    posterValue.value = obj.poster;
    actorValue.value = obj.acters;
    descriptionValue.value =  obj.description;


}

// === Edit Modail Censel Value

const canselValueImput = (num)=>{
    
    const titulValue = document.querySelector(`#input_title${num}`);
    const yearValue = document.querySelector(`#input_year${num}`);
    const countryValue = document.querySelector(`#input_country${num}`);
    const genreValue = document.querySelector(`#input_genre${num}`);
    const posterValue = document.querySelector(`#input_poster${num}`);
    const actorValue = document.querySelector(`#input_actors${num}`);
    const descriptionValue = document.querySelector(`#input_description${num}`);

    titulValue.value = ``;
    yearValue.value = ``;
    countryValue.value = ``;
    genreValue.value = ``;
    posterValue.value = ``;
    actorValue.value = ``;
    descriptionValue.value = ``;
}

//=== Render

const startRender = () =>{
    content.innerHTML = "";  

    if(localStorage != null){
        
        const arry = JSON.parse(localStorage.getItem("film"));
        const fixArry = arry
        arry.film.map((i)=>{
            renderEliment(i);
        })

        const allDel = document.querySelectorAll('.delete');
        const allCommentEl = document.querySelectorAll('.comment');
        const allCommentAdd =document.querySelectorAll('.comment_add');
        const allEditFilm = document.querySelectorAll('.edit')

        
        for (let i = 0; allDel.length >= i; ++i ){
            if(allDel[i]){
                //== del film
                allDel[i].addEventListener("click",(event)=>{ 
                    
                    arry.film.splice(i ,1);
                    localStorage.setItem("film",JSON.stringify(arry));
                    document.getElementById(`${event.toElement.id}`).remove();
                    console.log(arry.film, event.toElement.id)
                    
                });
            };

            //== open comments
            if(allCommentEl[i]){
                allCommentEl[i].addEventListener("click",(event)=>{
                    if(event.path.length === 10){
                        const id = event.toElement.id;
                        document.querySelector(`.c${id}>span>i`).classList.toggle("comment_on");
                        document.querySelector(`.comm${id}`).classList.toggle("off");
                        document.querySelector(`.add_comm${id}`).classList.toggle("off"); 
                    }    
                });
            };

            //==add comment
            if(allCommentAdd[i]){
                allCommentAdd[i].addEventListener('click', (event)=>{
                    if(event.target === allCommentAdd[i]){
                        const inputComment = document.querySelector(`#inputComm${i}`)

                        if(inputComment.value != null){
                            const value = inputComment.value;
                            fixArry.film[i].comment.push(value);
                            localStorage.setItem("film",JSON.stringify(fixArry));
                            startRender();
                        }else{
                            inputComment.placeholder = 'You did not leave a comment';
                        }
                    };
                });
            };

            //== edit film
            if(allEditFilm[i]){
                const modailButtonEdit = document.querySelector(`#edit_film${i}`);
                const modailButtonCensel = document.querySelector(`#cancel_edit_film${i}`);
                const editModail = document.querySelectorAll(`.modail_edit`) 

                if(modailButtonEdit){modailButtonEdit.addEventListener('click', (event)=>{

                    const titulValue = document.querySelector(`#input_title${i}`).value;
                    const yearValue = document.querySelector(`#input_year${i}`).value;
                    const countryValue = document.querySelector(`#input_country${i}`).value;
                    const genreValue = document.querySelector(`#input_genre${i}`).value;
                    const posterValue = document.querySelector(`#input_poster${i}`).value;
                    const actorValue = document.querySelector(`#input_actors${i}`).value;
                    const descriptionValue = document.querySelector(`#input_description${i}`).value;
                    const infoFilmEdit = {
                        titul: titulValue,
                        year: yearValue,
                        country: countryValue,
                        genre: genreValue,
                        acters:	actorValue,
                        poster: posterValue,
                        description: descriptionValue,
                        comment: fixArry.film[i].comment,
                        id: fixArry.film[i].id,
                    }

                    console.log(fixArry.film[i]);
                    
                    console.log(infoFilmEdit);

                    fixArry.film[i] = infoFilmEdit;
                    localStorage.setItem("film",JSON.stringify(fixArry))
                    startRender()

                })}

                modailButtonCensel.addEventListener('click',(event)=>{
                    canselValueImput(i);
                    closeModailEdit(editModail[i]);
                })

                allEditFilm[i].addEventListener('click', (event)=>{
                    
                    if(event.target.id === allEditFilm[i].id){
                        closeModailEdit(editModail[i]);
                        editValueImput(arry.film[i],i);
                    }
                })
            }
        };       
    };
};

if(localStorage!=null){
    startRender();
}



function renderEliment (obj){

    let arry = obj.comment;

    console.log(arry);
    const htmlElementCase = `
        <div id='${obj.id}' class="relative">
            <img src="${obj.poster}" alt="" class="bg_labr">
            <div class="case_film">

                    <div class="modail_edit off_modail" id="${obj.id}">
                        <div class="content__add_film_modail__case">
                            <div>
                                <span>TITLE</span>
                                <input type="text" id="input_title${obj.id}" class="input_add_film">
                                <span>YEAR</span>
                                <input type="text" id="input_year${obj.id}" class="input_add_film">
                                <span>COUNTRY</span>
                                <input type="text" id="input_country${obj.id}" class="input_add_film">
                                <span>GENRE</span>
                                <input type="text" id="input_genre${obj.id}" class="input_add_film">
                                
                            </div>
                            <div>
                                <span>POSTER {LINK}</span>
                                <input type="text" id="input_poster${obj.id}" class="input_add_film">
                                <span>ACTORS</span>
                                <input type="text"  id="input_actors${obj.id}" class="input_add_film">
                                <span>DESCRIPTION</span>
                                <textarea name="" id="input_description${obj.id}" cols="30" rows="10" ></textarea>
                            </div>
                        </div>
                        <div class="button_case">
                            <button class="button cencel" id="cancel_edit_film${obj.id}">Cencel</button>
                            <button class="button add" id="edit_film${obj.id}">Edit</button>
                        </div>
                    </div>
                <img class="case_film__poster" src="${obj.poster}" alt="" class="poster">
                <div class="case_film__info">
                    <div class="case_film__info__titul">
                        <div>
                            <span class="titul">${obj.titul}</span>
                            <span class="info_film">${obj.description}</span>
                        </div>
                        <table class="case_film__info__table">
                            <tr>
                                <th>Country</th>
                                <th>${obj.country}</th>
                            </tr>
                            <tr>
                                <th>Year</th>
                                <th>${obj.year}</th>
                            </tr>
                            <tr>
                                <th>Genre</th>
                                <th>${obj.genre}</th>
                            </tr>
                            <tr>
                                <th>Acters</th>
                                <th>${obj.acters}</th>
                            </tr>
                        </table>
                    </div>
                    <div class="button_case_film">
                        <button id="${obj.id}" class="button delete">Delete</button>
                        <button id="${obj.id}"class="button edit">Edit</button>
                    </div>
                </div>
                
            </div>
            <div class="comment c${obj.id} " id="${obj.id}" >
                <span id="${obj.id}">Comment: ${obj.comment.length} <i class="fas fa-angle-down"></i> </span>
                <div class="commet__case comm${obj.id} off">
                    
                </div>
                <div class="add_comment_case add_comm${obj.id} off">
                    <input type="text" id='inputComm${obj.id}' placeholder="Add yor comment">
                    <button class="comment_add button" id="${obj.id}">Add</button>
                </div>
            </div>
        </div>   
    `;

    content.innerHTML += htmlElementCase;

    arry.map((i=>{
        document.querySelector(`.comm${obj.id}`).innerHTML += `<span>${i}</span>`
    }));

    const addCommentButton = document.querySelectorAll('.comment_add');

  

}


export default startRender;

