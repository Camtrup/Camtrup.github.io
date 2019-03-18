const main = document.querySelector("main");
const article = document.querySelector("article");

const db = firebase.database();
const serier = db.ref("serier")


function visSerier(snapshot){
    let serier = snapshot.val();
    main.innerHTML +=`
        <div class="serier">
            <p class="tittel">${serier.Tittel}</p>
            <img src=${serier.Bilde}>
            <p class="imdb">${serier.Rating}</p>
            <p class="sjanger">Sjanger: ${serier.Sjanger1}  ${serier.Sjanger2}</p>

        </div>
    `};

    function visAlle(){
      main.innerHTML="";
      serier.on("child_added", visSerier);
    }
