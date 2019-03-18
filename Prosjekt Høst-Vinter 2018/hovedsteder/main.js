


// HTML-elementer
const skjema = document.querySelector("#skjema");
const inpNavn = document.querySelector("#inpNavn");
const inpTelefon = document.querySelector("#inpTelefon");
const inpEpost = document.querySelector("#inpEpost");
const secKontakter = document.querySelector("#secKontakter");
// Firebase
const db = firebase.database();
const kontakter = db.ref("kontakter");
// Registrere en ny kontakt
function registrerKontakt(evt) {
    evt.preventDefault();
    const key = inpTelefon.value;
    const data = {
        navn: inpNavn.value,
        epost: inpEpost.value
    };
    const kontakt = kontakter.child(key);
    kontakt.set(data);

    // Nuller ut skjemaet
    skjema.reset();
}
// Knytter funksjonen til hendelsen at skjemaet blir sendt inn
skjema.addEventListener("submit", registrerKontakt);
 
