let nizProizvoda = [];
let LetnjaKolekcija = document.getElementById("tabela-kolekcija");

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
                uKorpi : false
            }

            nizProizvoda.push(obj);
        }

        popuniTabeluMenu();
    }

            
    xhr.open("GET","dodaci/stvari.xml",true);
    xhr.send();

}

function popuniTabeluMenu1(){
    LetnjaKolekcija.innerHTML = "";
    document.getElementById("dugme1").className = "";
    document.getElementById("dugme2").className = "active";
    let brojac = 0;
    for (let majca of nizProizvoda) {
        if(majca.tip == "majca" && brojac>3 && brojac<=8){
            
            let elementDiv = document.createElement("div");
            elementDiv.className = "box1";
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

            elementDiv.appendChild(slika);
            elementDiv.appendChild(marka);
            elementDiv.appendChild(naziv);
            elementDiv.appendChild(cena);
            LetnjaKolekcija.appendChild(elementDiv);
        }
        brojac++;
    }
}

function popuniTabeluMenu(){
    LetnjaKolekcija.innerHTML = "";
    document.getElementById("dugme2").className = "";
    document.getElementById("dugme1").className = "active";
    let brojac = 0;
    for (let majca of nizProizvoda) {
        if(majca.tip == "majca" && brojac++<4){
            
            let elementDiv = document.createElement("div");
            elementDiv.className = "box1";
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

            elementDiv.appendChild(slika);
            elementDiv.appendChild(marka);
            elementDiv.appendChild(naziv);
            elementDiv.appendChild(cena);
            LetnjaKolekcija.appendChild(elementDiv);
        }
    }
}