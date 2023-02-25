let html = [' ']
let buttons
let pineVolume = 0
let partId = '0'
let inputNum
let productType
let buttonId
let blockHtml = [];
const getEl = function (id) {
    return document.getElementById(id)
}
let blockId = getEl('productList')
let navbar = getEl("navbar")
let volume = getEl("volume")
for (let i in state) {
    navbar.innerHTML += `
   <a> <input type="radio" class="radio" name="model" value="${state[i].id}" id="${state[i].id}"> ${state[i].productName}</a>    
    `
    navbar.insertAdjacentElement('beforebegin', navbar)
}
let btns = document.querySelectorAll('.radio')
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        productType = state[btn.value]
        buttonCreate(productType)
        html += `
<h1>${productType.productName}</h1>       
`
    })
})
let onClickCountRun = (e) => {
    debugger
    let clickedEl = e.currentTarget
    buttonId = clickedEl.innerHTML
    inputNum = getEl(buttonId)
    getModelList(productType, blockId)
}

let buttonCreate = (productType) => {
    let buttonsId = getEl("buttonsArray")
    let buttonsHTML = [' '];
    for (let i in productType.partOfModel) {

        buttonsHTML +=
            `
        <input type="text" id="${productType.partOfModel[i].partName}" title="set" class="input"/>
        <button id="${productType.partOfModel[i].partName}" class="button insert">${productType.partOfModel[i].partName}</button>
        `
    }


    buttonsId.innerHTML = buttonsHTML
    buttonsId.insertAdjacentElement("beforebegin", buttonsId)
    buttons = document.getElementsByClassName("button insert")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', onClickCountRun)
    }

}

//productType = nihad
let getModelList = (productType, blockId) => {
    let sizeHtml
    let partName
    let materialKind
    let partList
    let productName = productType.productName
    for (let i in productType.partOfModel) {

        if (productType.partOfModel[i].id === buttonId) {
            partName = productType.partOfModel[i].partName
            //blockOperatorCreate
            partList = productType.partOfModel[i].partItem.map(material => {
                let nameOfOperator = material.nameOfOperator

                //blockSizeCreate
                let getMaterialSize = material.material.map(size => {
                    materialKind = size.kind
                    sizeHtml = size.size.map(el => {
                        return elementCreate(el[0], el[1], el[2], el[3])
                    }).join(' ')
                    return blockSizeCreate(sizeHtml, materialKind)

                }).join(' ')
                return blockOperatorCreate(nameOfOperator, getMaterialSize)
            }).join(' ')
        }

    }
    generateHtml(productName, partName, partList)
}

let generateHtml = (productName, partName, partList) => {
    html += `
        <h3>${partName}</h3>        
       <a>${partList}</a> 
`
    blockHtml = `
    <div class="item">
        ${html}
    </div>
    `

    blockId.innerHTML = blockHtml
    blockId.insertAdjacentElement('beforebegin', blockId)
    volume.innerText = pineVolume.toFixed(3) + " m3"
}
let blockSizeCreate = (sizeHtml, materialKind) => {
    return `
    <a class="item block"> ${materialKind} ${sizeHtml}</a>   
    `
}
let blockOperatorCreate = (nameOfOperator, getMaterialSize) => {
    return `
     ${nameOfOperator} ${getMaterialSize}    
    `
}
let elementCreate = (leng, wid, depth, amount) => {
    partId++
    let li = `
<li class="size"><lable for="${partId}">
${amount * inputNum.value} szt ${leng}x${wid}x${depth}
</lable><input type="checkbox" name="sizeBox" id="${partId}" value ="${amount * inputNum.value}+' szt '+${leng}+'x'+${wid}+'x'+${depth}"/></li>`;
    pineVolume += leng / 1000 * wid / 1000 * depth / 1000 * amount * inputNum.value;
    return li
}

