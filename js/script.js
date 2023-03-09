// Istruzioni
//-------------------------------------------------------

// Consegna:
// Dato un array di oggetti letterali con:
//  - url dell’immagine
//  - titolo
//  - descrizione
// Creare un carosello come nella foto allegata.
// Milestone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
// Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
// Milestone 2:
// Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
// BONUS 3:
// Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.

//-------------------------------------------------------
// fine Istruzioni



// Variabili
//-------------------------------------------------------

//Array img
const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, 
    
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, 
    
    {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, 
    
    {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    },
    
    {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

let variabileContatoreGlobale = 0;
let mainImg;
let mainTitle;
let mainText;

let thumbnailsImgElement;

//variabili elementi genitori
const bigImgWrapperElement = document.getElementById('img-wrapper');
const thumbnailsSliderElement = document.getElementById('thumbnails-slider');
const textWrapperElement = document.getElementById('text-wrapper')

//Variabili bottoni
const btnUp = document.getElementById('up')
const btnDown = document.getElementById('down')
//-------------------------------------------------------
// fine Variabili


createElementAppend('img', 'image', '', bigImgWrapperElement, 1);
mainImg = document.querySelector('.image');
mainImg.src = `./${images[0].image}`;

createElementAppend('h4', 'title', '', textWrapperElement, 1);
mainTitle = document.querySelector('.title');
mainTitle.innerText = images[0].title;

createElementAppend('p', 'paragraph', '', textWrapperElement, 1);
mainText = document.querySelector('.paragraph');
mainText.innerText = images[0].text;


createElementAppend('img', 'thumbnail', '', thumbnailsSliderElement, images.length);
thumbnailsImgElement = document.querySelectorAll('.thumbnail');


//Bonus
for(let i = 0; i < images.length; i++){
    thumbnailsImgElement[i].style.height = `calc(100% / ${images.length})`;
    thumbnailsImgElement[i].src = "./" +images[i].image
}

thumbnailsImgElement[0].style.opacity= "1"




// inizio Eventi
//-------------------------------------------------------

btnUp.addEventListener('click', () => {
    
    upBtnBehavior()

    //console.log(variabileContatoreGlobale)
})

btnDown.addEventListener('click', () => {
    downBtnBehavior();

    //console.log(variabileContatoreGlobale)
})

//-------------------------------------------------------
// fine Eventi


// inizio Function
//-------------------------------------------------------

/** Crea degli elementi con classe e li aggiunge all'elemento padre, il numero è specificabile */
function createElementAppend (elementoDaCreare, classe, contenuto, elementoGenitore, numeroElementi){
    
    for(let i= 0; i<numeroElementi; i++){

        let newEl = document.createElement(elementoDaCreare);
        newEl.classList.add(classe);
        newEl.innerHTML = contenuto;
    
        elementoGenitore.append(newEl);

    }
}

/**
 * Limita il valore della variabileGlobale in crescenza
 * @returns {any}
 */
function upLimited(arr){
    if(variabileContatoreGlobale > arr.length-1){
        variabileContatoreGlobale = 0;
    }
}

/**
 * Limita il valore della variabileGlobale in decrescenza
 * @returns {any}
 */
function downLimited(arr){
    if(variabileContatoreGlobale < 0){
        variabileContatoreGlobale = arr.length-1;
    }
}

function upBtnBehavior(){

    thumbnailsImgElement[variabileContatoreGlobale].style.opacity = '.4'
    variabileContatoreGlobale--;
    downLimited(images);

    mainImg.src = `./${images[variabileContatoreGlobale].image}`;
    mainTitle.innerText = images[variabileContatoreGlobale].title;
    mainText.innerText = images[variabileContatoreGlobale].text;

    thumbnailsImgElement[variabileContatoreGlobale].style.opacity = '1'

}

function downBtnBehavior(){

    thumbnailsImgElement[variabileContatoreGlobale].style.opacity = '.4'
    variabileContatoreGlobale++;
    upLimited(images);

    mainImg.src = `./${images[variabileContatoreGlobale].image}`;
    mainTitle.innerText = images[variabileContatoreGlobale].title;
    mainText.innerText = images[variabileContatoreGlobale].text;

   
    thumbnailsImgElement[variabileContatoreGlobale].style.opacity = '1'
}
//-------------------------------------------------------
// fine Function