

const modailOff = document.querySelector('.off_modail');
const button_modail_on = document.querySelector('.button_modail_on_off');
const simbyl = document.querySelector('.simbyl');
const cencel = document.querySelector('.cencel');




cencel.addEventListener('click',()=>{
    modailOff.classList.toggle('off_modail');
    modailOff.classList.toggle('on_modail');
});



button_modail_on.addEventListener('click',()=>{
    modailOff.classList.toggle('off_modail');
    modailOff.classList.toggle('on_modail');
});


button_modail_on.addEventListener('mouseenter',()=>{
    simbyl.classList.toggle('anim_button_on');
    setTimeout(()=>{
        simbyl.classList.toggle('anim_button_on');
    }, 1000);
});
