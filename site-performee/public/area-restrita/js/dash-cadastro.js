const userRadio = document.getElementById("AbaUserRadio")
    , empresaRadio = document.getElementById("AbaEmpresaRadio")
    , dcenterRadio = document.getElementById("AbaDCenterRadio")
    , serverRadio = document.getElementById("AbaServerRadio")

    , userCrud = document.getElementById('ContentUserCrud')
    , empresaCrud = document.getElementById('ContentEmpresaCrud')
    , dCenterCrud = document.getElementById('ContentDCenterCrud')
    , serverCrud = document.getElementById('ContentServerCrud')

    , containerComp = document.getElementById('Componentes');

let componentes = {};
let totalComponentes = 6;
function addComponente() {
    totalComponentes++;

    containerComp.innerHTML += `
            <div id="Comp${totalComponentes}">
            <img class="select-disable menos" src="../assets/icons/Menos.png" alt="Remover" onclick="removeComponente(this)" id="${totalComponentes}">
            <label>
                <span>Tipo Componente:</span>
                <input type="text" placeholder="Exemplo: RAM" id="IptTipoServer${totalComponentes}">
            </label>
            <label>
                <span>Modelo:</span>
                <select name="modelo-server" id="SlcModelo${totalComponentes}">
                    <option value="CPU XPTO">CPU XPTO</option>
                    <option value="RAM XPTO">RAM XPTO</option>
                    <option value="DISK XPTO">DISK XPTO</option>
                    <option value="GPU XPTO">GPU XPTO</option>
                </select>
            </label>
            <label>
                <span>Capacidade:</span>
                <input type="text" placeholder="40 ('medida')"
                    id="IptCapacidadeServer${totalComponentes}">
            </label>
            <label>
                <span>Medida:</span>
                <select name="unimed-server" id="SlcUniMed${totalComponentes}">
                    <option value="GB">Gigabyte</option>
                    <option value="Ghz">Ghz</option>
                    <option value="T">Terabyte</option>
                    <option value="MB">Megabyte</option>
                </select>
            </label>
        </div>
    `
    loadComponentes();
}

function removeComponente(componente) {
    let id = componente.id;
    let attributeComp = `componente${id}`;
    let elementHtml = document.getElementById(`Comp${id}`);

    delete componentes[attributeComp];
    elementHtml.parentNode.removeChild(elementHtml);

    console.log(componentes)
}

function loadComponentes() {
    for (i = 1; i <= totalComponentes; i++) {
        componentes[`componente${i}`] = {
            tipo: document.getElementById(`IptTipoServer${i}`).value,
            modelo: document.getElementById(`SlcModelo${i}`).value,
            capacidade: document.getElementById(`IptCapacidadeServer${i}`).value,
            medida: document.getElementById(`SlcUniMed${i}`).value
        }
    }
}

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
