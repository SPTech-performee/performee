const userRadio = document.getElementById("AbaUserRadio")
    , empresaRadio = document.getElementById("AbaEmpresaRadio")
    , dcenterRadio = document.getElementById("AbaDCenterRadio")
    , serverRadio = document.getElementById("AbaServerRadio")

    , userCrud = document.getElementById('ContentUserCrud')
    , empresaCrud = document.getElementById('ContentEmpresaCrud')
    , dCenterCrud = document.getElementById('ContentDCenterCrud')
    , serverCrud = document.getElementById('ContentServerCrud');

function changeAba(radio) {
    switch (radio.value) {
        case "1":
            userCrud.style.display = "flex";
            empresaCrud.style.display = "none";
            dCenterCrud.style.display = "none";
            serverCrud.style.display = "none";
            break;
        case "2":
            userCrud.style.display = "none";
            empresaCrud.style.display = "flex";
            dCenterCrud.style.display = "none";
            serverCrud.style.display = "none";
            break;
        case "3":
            userCrud.style.display = "none";
            empresaCrud.style.display = "none";
            dCenterCrud.style.display = "flex";
            serverCrud.style.display = "none";
            break;
        case "4":
            userCrud.style.display = "none";
            empresaCrud.style.display = "none";
            dCenterCrud.style.display = "none";
            serverCrud.style.display = "flex";
            break;
    }
}  
