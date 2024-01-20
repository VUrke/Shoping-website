let nizProizvoda = [];
let Prodavnica = document.getElementById("prodavnica");
let tipProizvoda = document.getElementById("tip_proizvoda");
let markaProizvoda = document.getElementById("marka");
let opis = document.getElementById("opis");

let nizMarki = [];
let nizKategorija = [];

function ucitajXML(){

    let xhr = new XMLHttpRequest();

    xhr.onload = function(){

        if(xhr.status != 200) return;

        let XMLProdavnica = xhr.responseXML.getElementsByTagName("proizvod");

        for (let xmlProizvod of XMLProdavnica) {
            
            let obj = {
                tip : xmlProizvod.getElementsByTagName("tip")[0].textContent,
                ime : xmlProizvod.getElementsByTagName("ime")[0].textContent,
                marka : xmlProizvod.getElementsByTagName("marka")[0].textContent,
                cena : xmlProizvod.getElementsByTagName("cena")[0].textContent,
                slika : xmlProizvod.getElementsByTagName("slika")[0].textContent,
                kolicina : 1,
                uKorpi : false
            }

            if(nizKategorija.indexOf(obj.tip) == -1){
                nizKategorija.push(obj.tip);
                tipProizvoda.innerHTML +=
                `
                <option value="${obj.tip}">${obj.tip}</option>
                `
            }

            if(nizMarki.indexOf(obj.marka) == -1){
                nizMarki.push(obj.marka);
                markaProizvoda.innerHTML +=
                `
                <option value="${obj.marka}">${obj.marka}</option>
                `
            }

            nizProizvoda.push(obj);
        }
        
        popuniShop();
    }

            
    xhr.open("GET","dodaci/stvari.xml",true);
    xhr.send();
}

function popuniShop(){

    Prodavnica.innerHTML = "";
    for (let majca of nizProizvoda) {
        
        if(! filter(majca)) continue;

        let elementDiv = document.createElement("div");
        elementDiv.className = "box2";
        let naziv = document.createElement("p");
        let marka = document.createElement("h5");
        let slika = document.createElement("img");
        let cena = document.createElement("p");
        naziv.innerHTML = majca.ime;
        cena.innerHTML = majca.cena + ".00 RSD";
        cena.style.color = "#465b52";
        cena.style.fontWeight = "bold";
        marka.innerHTML = majca.marka;
        slika.src = majca.slika;

        let dugme = document.createElement("button");
        dugme.innerHTML = "KUPI"

        dugme.onclick = function(){
            pokaziInformacije(majca);
        }

        elementDiv.appendChild(slika);
        elementDiv.appendChild(marka);
        elementDiv.appendChild(dugme);
        elementDiv.appendChild(naziv);
        elementDiv.appendChild(cena);
        Prodavnica.appendChild(elementDiv);
    }
}

let txtElem = document.getElementById("text-filter");

function filter(proizvod){

    let okText = proizvod.ime.toLowerCase().indexOf(txtElem.value.toLowerCase()) != -1;
    let okTIP = tipProizvoda.value == "sve" || tipProizvoda.value == proizvod.tip;
    let okMarka = markaProizvoda.value == "sve" || markaProizvoda.value == proizvod.marka;

    return okText && okTIP && okMarka;
}

let korpa = document.getElementById("korpa");
let brojUKorpi = document.getElementById("broj-proizvoda");

function pokaziInformacije(majca){
    Prodavnica.style.display = "none";
    opis.innerHTML = "";

    slika = document.createElement("img");
    naziv = document.createElement("h2");
    cena = document.createElement("p");
    dugme = document.createElement("button");
    span = document.createElement("span");
    opisProizvoda = document.createElement("h5");
    ceoDIV = document.createElement("div");
    paraprafSlicni = document.createElement("h4");
    divSlicnihProizvoda = document.createElement("div");
    divSlicnihProizvoda.className = "slicni-proizvodi";

    opisProizvoda.innerHTML = majca.tip + " / " + majca.marka;
    paraprafSlicni.innerHTML = "Slicni proizvodi : "
    dugme.innerHTML = "<--";
    span.innerHTML = "Vrati se unazad";
    naziv.innerHTML = majca.ime;
    cena.innerHTML = "RSD " + majca.cena + ".00";   
    slika.src = majca.slika;

    brojac=0
    for (let proizvod of nizProizvoda) {
        if(brojac<4 && proizvod.ime != majca.ime && proizvod.tip == majca.tip)
        {
            novaSlika = document.createElement("img");
            novaSlika.src = proizvod.slika;
            divSlicnihProizvoda.appendChild(novaSlika);
            brojac++;
        }
    }
    
    dugmeKorpa = document.createElement("button");
    dugmeKorpa.innerHTML = "Ubaci u korpu"
    dugmeKorpa.className = "dugmeKorpa";

    dugmeKorpa.onclick = function(){
        majca.uKorpi = true;
        dugmeKorpa.disabled = true;
        brojUKorpi.innerHTML = Number(brojUKorpi.innerText) + 1; 
        dugmeKorpa.innerHTML = "Ubaceno"
    }

    dugme.className = "obicnoDugme"
    dugme.onclick = function(){
        opis.innerHTML = "";
        Prodavnica.style.display = "flex";
    }

    // <input type="number" value="1" min="0" max="5" id="">
    brojProizvoda = document.createElement("input");
    brojProizvoda.type = "number";
    brojProizvoda.value = "1";
    brojProizvoda.min = 1;
    brojProizvoda.max = 5;

    brojProizvoda.onchange = function(){
        majca.kolicina = Number(brojProizvoda.value);
    }

    tekstBrojProizvoda = document.createElement("h6");
    tekstBrojProizvoda.innerHTML = "broj artikala : "

    ceoDIV.appendChild(naziv);
    ceoDIV.appendChild(opisProizvoda);
    ceoDIV.appendChild(cena);
    ceoDIV.appendChild(tekstBrojProizvoda);
    ceoDIV.appendChild(brojProizvoda);
    ceoDIV.appendChild(dugmeKorpa);
    ceoDIV.appendChild(paraprafSlicni);
    ceoDIV.appendChild(divSlicnihProizvoda);
    opis.appendChild(span);
    opis.appendChild(dugme);
    opis.append(ceoDIV);
    opis.append(slika);
}

let prikaziProdavnicu = document.getElementById("first");
let prikazKorpe = document.getElementById("second");
let korpaTabela = document.getElementById("korpa-tabela");

function prikaziKorpu(){
    korpaPuna();
    prikazKorpe.style.display = "inline-block";
    prikaziProdavnicu.style.display = "none";
}

function korpaPuna(){
    korpaTabela.innerHTML =
    `
        <tr>
            <th>Izbaci</th>
            <th>Slika</th>
            <th>Ime proizvoda</th>
            <th>Marka</th>
            <th>Cena</th>
        </tr>
    `
    let brojac=0
    let RacunCena=0;
    for (let proizvod of nizProizvoda){
        if(proizvod.uKorpi == true){
        
            row = document.createElement("tr");
            tdHelper = document.createElement("td");
            dugmeIzbaci = document.createElement("button");
            dugmeIzbaci.innerHTML = "X";

            let tdSlika = document.createElement("td");
            let imgSlika = document.createElement("img");
            imgSlika.src = proizvod.slika;
            tdSlika.appendChild(imgSlika);

            let tdIme = document.createElement("td");
            tdIme.textContent = proizvod.ime;

            let tdMarka = document.createElement("td");
            tdMarka.textContent = proizvod.marka;

            let tdCena = document.createElement("td");
            UkupnaCena = Number(proizvod.cena) * Number(proizvod.kolicina);
            tdCena.textContent = `RSD ${proizvod.cena}.00 * ${proizvod.kolicina} = RSD ${UkupnaCena}.00`;

            RacunCena += UkupnaCena;

            dugmeIzbaci.onclick = function(){
                proizvod.uKorpi = false;
                brojUKorpi.innerHTML = Number(brojUKorpi.innerHTML) - 1;
                korpaPuna();
            }

            tdHelper.appendChild(dugmeIzbaci);
            row.appendChild(tdHelper);
            row.appendChild(tdSlika);
            row.appendChild(tdIme);
            row.appendChild(tdMarka);
            row.appendChild(tdCena);
            korpaTabela.appendChild(row);
        }
    }
    document.getElementById("cena-racuna").innerHTML = `RSD ${RacunCena}`
    document.getElementById("cena-racuna1").innerHTML = `RSD ${RacunCena}`
}



function vratiNaProdavnicu(){
    document.getElementById("second").style.display = "none";
    document.getElementById("first").style.display = "inline-block";
    
}

let iskoriscen=0
let kuponFlag = document.getElementById("kupon-text")
let upisatiKonacnuCenu = document.getElementById("cena-racuna");
let upisatiKonacnuCenu2 = document.getElementById("cena-racuna1")

function iskoristiKupon(){

    if(iskoriscen == 0 && kuponFlag.value == "uros"){
        iskoriscen = 1;

        broj = parseInt(upisatiKonacnuCenu.innerHTML.split(" ")[1]) - (parseInt(upisatiKonacnuCenu.innerHTML.split(" ")[1]) * 0.05);
        upisatiKonacnuCenu.innerHTML = `RSD ${broj}.00`
        upisatiKonacnuCenu2.innerHTML = `RSD ${broj}.00`

        upisatiKonacnuCenu.style.color = "red";
        upisatiKonacnuCenu2.style.color = "red";

    }

}