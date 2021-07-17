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

        
        for (let i = 0; allDel.length >= i; ++i ){
            if(allDel[i]){
                //== del film
                allDel[i].addEventListener("click",(event)=>{
                    const id = Number(event.toElement.id);
                    arry.film.splice(id ,1);
                    localStorage.setItem("film",JSON.stringify(arry));
                    document.getElementById(`${event.toElement.id}`).remove();
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
                        <button id="edit_id${obj.id}"class="button edit">Edit</button>
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
        document.querySelector('.commet__case').innerHTML += `<span>${i}</span>`
    }));

    const addCommentButton = document.querySelectorAll('.comment_add');

  

}


export default startRender;

