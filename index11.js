// const myCheck = getEl('myCheck')
let buttons = document.getElementsByClassName("button insert")
let btns = document.querySelectorAll('.radio')
let invPine = 0
let pineVolume = 0
let partId = '0'
let li
let inputNum
let blockId
let productType
let productName
let generateHt
let labels = document.querySelectorAll('.block')
let title = ""


const getEl = function (id) {
    return document.getElementById(id)
}
const volume = getEl("volume")

btns.forEach(btn => {
    debugger
    btn.addEventListener('click', () => {
        labels.forEach(label => {
            label.innerHTML = ''
            volume.innerText = ''
        })
        if (btn.value === "nihad") {
            productType = nihad
            productName = nihad.modelName

        } else if (btn.value === "star") {
            productType = star

        }
    })
})

const elementCreate = (leng, wid, depth, amount) => {

    partId++
    let li = `
<li class="size"><lable for="${partId}">${amount*inputNum.value} szt ${leng}x${wid}x${depth}</lable><input type="checkbox" name="sizeBox" id="${partId}" value ="${amount * inputNum.value}+' szt '+${leng}+'x'+${wid}+'x'+${depth}"/></li>`;
    //   li = document.createElement('li');
    //   let label = document.createElement('label');
    //   label.setAttribute("for", partId);
    //   li.className = "size"
    //   let checkbox = document.createElement('input')
    //   checkbox.type = "checkBox";
    //   checkbox.name = "sizeBox";
    // checkbox.value = amount * inputNum.value + ' szt ' + leng + 'x' + wid+'x'+depth;
    //   checkbox.id = partId;
    //   label.appendChild(document.createTextNode(checkbox.value))
    //   label.appendChild(checkbox);
    pineVolume += leng / 1000 * wid / 1000 * depth / 1000 * amount * inputNum.value;
    // li.appendChild(label);


    return li

}

function countRun(productType, blockId) {

    let elHtml = productType.map(el => {
        return elementCreate(el[0], el[1], el[2], el[3])
    }).join(' ')
    generateHt = `
        <li>${productName}</li>
        <a>${elHtml}</a>
    `
    blockId.innerHTML = generateHt
    blockId.insertAdjacentElement('beforebegin', blockId)
    volume.innerText = pineVolume.toFixed(3) + " m3"
// fullEl.innerHTML += elHtml;
// fullEl.insertAdjacentElement('beforebegin', fullEl);
}


function onClickCountRun(eventObject) {
    debugger;
    let clickedEl = eventObject.currentTarget
    let buttonId = clickedEl.innerHTML

    if (buttonId === "lc") {
        inputNum = getEl("inputLc")
        blockId = getEl('lcSaw')
        if (blockId.innerHTML === "") {
            countRun(productType.lc.sosna.saw.size, blockId)
        }
        blockId = getEl('lcMatrix')
        if (blockId.innerHTML === "") {
            countRun(productType.lc.sosna.matrix.size, blockId)
        }
    } else if (buttonId === "dwojka") {
        inputNum = getEl("inputDwojka")
        blockId = getEl('dwojkaSaw')
        if (blockId.innerHTML === "") {
            countRun(productType.dwojka.sosna.saw.size, blockId)
        }
        blockId = getEl('dwojkaMatrix')
        if (blockId.innerHTML === "") {
            countRun(productType.dwojka.sosna.matrix.size, blockId)
        }

    } else if (buttonId === "boczek") {
        inputNum = getEl("inputBoczek")
        blockId = getEl('boczSaw')
        if (blockId.innerHTML === "") {
            countRun(productType.boczek.sosna.saw, blockId)
        }
        blockId = getEl('boczMatrix')
        if (blockId.innerHTML === "") {
            countRun(productType.boczek.sosna.matrix, blockId)
        }
    }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', onClickCountRun)
}


