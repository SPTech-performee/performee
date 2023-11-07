function exibirMaisInfo(type) {
    for (i = 1; i < 6; i++) {
        document.getElementById(`Container${i}`).style.display = 'none';
    }

    switch (type) {
        case 1: {
            document.getElementById(`Container1`).style.display = 'flex';
            break;
        }
        case 2: {
            document.getElementById(`Container2`).style.display = 'flex';
            break;
        }
        case 3: {
            document.getElementById(`Container3`).style.display = 'flex';
            break;
        }
        case 4: {
            document.getElementById(`Container4`).style.display = 'flex';
            break;
        } case 5: {
            document.getElementById(`Container5`).style.display = 'flex';
            break;
        }
    }
    abrirModal();
}