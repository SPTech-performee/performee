const btnExpandir = document.getElementById('Expand')
    , nav = document.getElementById('Nav')

    , btnChangeCpu = document.getElementById('ChangeInputCpu')
    , inputCpu = document.getElementById('InputCpu')
    , slcCpu = document.getElementById('SlcCpu')

    , btnChangeRam = document.getElementById('ChangeInputRam')
    , inputRam = document.getElementById('InputRam')
    , slcRam = document.getElementById('SlcRam')

    , btnChangeDisc = document.getElementById('ChangeInputDisc')
    , inputDisc = document.getElementById('InputDisc')
    , slcDisc = document.getElementById('SlcDisc')

    , btnChangeRede = document.getElementById('ChangeInputRede')
    , inputRede = document.getElementById('InputRede')
    , slcNet = document.getElementById('SlcNet')

    , inputLog = document.getElementById('InputLog')
    , slcLog = document.getElementById('SlcLog');

let navOpen = false;
const expandirNav = () => {
    nav.classList.toggle('opened');
    if (navOpen) {
        navOpen = false;
        btnExpandir.setAttribute('src', '../assets/icons/open-icone.png');
    } else {
        navOpen = true;
        btnExpandir.setAttribute('src', '../assets/icons/close-icone.png');
    }
}
btnExpandir.addEventListener('click', expandirNav);

function trocarInputs(btn) {
    if (btn === btnChangeCpu) {
        slcCpu.classList.toggle('changed');
        inputCpu.classList.toggle('changed');
    } else if (btn === btnChangeRam) {
        slcRam.classList.toggle('changed');
        inputRam.classList.toggle('changed');
    } else if (btn === btnChangeDisc) {
        slcDisc.classList.toggle('changed');
        inputDisc.classList.toggle('changed');
    } else if (btn === btnChangeRede) {
        slcNet.classList.toggle('changed');
        inputRede.classList.toggle('changed');
    }
}