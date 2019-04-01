const main = document.querySelector("main");

const db = firebase.database();
const serier = db.ref("serier");


function visSerier(snapshot){
    let serier = snapshot.val();
    let key = snapshot.key;
    main.innerHTML +=`
        <div class="serier">
            <a href="../serier/serie.html?id=${key}">
            <p class="tittel">${serier.Tittel}</p>
            <img src=${serier.Bilde}>
            <p class="imdb">${serier.Rating}</p>
            <p class="sjanger">Sjanger: ${serier.Sjanger1}  ${serier.Sjanger2}</p>
            </a>

        </div>
    `};

    function visAlle(){
      main.innerHTML=""
      serier.on("child_added",visSerier);
      }

    function sorterRating(){
      main.innerHTML=""
      serier
        .orderByChild("Rating")
        .on("child_added", visSerier)
    }

    function kunHBO(){
      main.innerHTML=""
      serier
        .orderByChild("Kanal")
        .equalTo("HBO")
        .on("child_added", visSerier)
        }

    function kunAMC(){
      main.innerHTML=""
      serier
        .orderByChild("kanal")
        .equalTo("AMC")
        .on("child_added", visSerier)
        }

    function kunShowtime(){
      main.innerHTML=""
      serier
        .orderByChild("kanal")
        .equalTo("Showtime")
        .on("child_added", visSerier)
        }

    function kunNetflix(){
      main.innerHTML=""
      serier
        .orderByChild("kanal")
        .equalTo("Netflix")
        .on("child_added", visSerier)
        }

    function kunAmazon(){
      main.innerHTML=""
      serier
        .orderByChild("kanal")
        .equalTo("Amazon")
        .on("child_added", visSerier)
        }
        visAlle()
