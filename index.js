let pineVolume = 0
let partId = '0'
let productType
let sizeArr = [];
const getEl = function (id) {
    return document.getElementById(id)
}

const getId = {
    blockId: getEl('productList'),
    modelsList: getEl("modelsList"),
    volume: getEl("volume"),
    multiSizeHtml: getEl("multiSizeHtml")

}
    // 1
let getModelList = (productType, buttonId, count, sizeArr) => {
    let partName = ""
    let partList = ""

    for (let i in productType.partOfModel) {

        if (productType.partOfModel[i].id === buttonId) {
            partName = productType.partOfModel[i].id
            //blockOperatorCreate
            partList = productType.partOfModel[i].partItem.map(item => {
                return getMaterialSize(item,count, sizeArr)
                }
            ).join(' ')
        }

    }
    let html = `<div class="block">${productType.id.toUpperCase()}_${partName} -${count} SZT
${partList} </div> `


    addHtmlToListsArr(productType, listsHtml, html)
    getId.volume.innerText ="PL_WIOROWA = " + pineVolume.toFixed(3) + " m3"
    genHtml(listsHtml, getId.blockId,)

}
//2 мапинг материала, внутри гет материал массив и гет штмлразмеры
let getMaterialSize = (item,count, sizeArr) => {
    let nameOfOperator = item.nameOfOperator
    let materialSize = item.material.map(material => {
        getMultiMaterialArr(material,count, sizeArr)
        return getSizeHtml(material)

    }).join(' ')
    return `<div class="item block"><b>${nameOfOperator}</b> ${materialSize}</div>`
}
//3 maping multiArr
let getMultiMaterialArr = (material, count,sizeArr) => {
    let materialNotExist = true;
    sizeArr.map(elOfArr => {
        if (elOfArr.id === material.id) {
            let diffSize = true;
            material.size.map(el => {
                elOfArr.size.forEach(thisSize => {
                    if (thisSize[0] === el[0] && thisSize[1] === el[1]) {
                        el[3] = el[3] * count
                        thisSize[3] += el[3]
                        materialNotExist = false;
                        return diffSize = false;
                    }
                })

                if (diffSize) {
                    el[3]= el[3]*count
                    elOfArr.size.push(el)
                    materialNotExist = false;}
            })
        }
    })
    if (materialNotExist ) {
        material.size.forEach(el => {
            el[3]= el[3]*count
        })


        sizeArr.push(material)
        return sizeArr}


}
//4 штмл для списк первого
let getSizeHtml = (material) => {

    let materialKind = material.id
    let sizeHtml = material.size.map(el => {
        return elementCreate(el[0], el[1], el[2], el[3], el[4],)
    }).join(' ')

    return `<a class="item operator"> <b>${materialKind}</b> ${sizeHtml}</a>`

}
//5
let elementCreate = (leng, wid, depth, amount, commit,) => {
    partId++
    if (commit!== "undefined*" ) {
        return `
<li class="size">
<lable for="${partId}">
 ${leng}x${wid}x${depth}     ${amount}    SZT    ${commit}
</lable>
</li>`
    } else {
        let li = `
<li class="size">
<lable for="${partId}">
${leng}x${wid}x${depth}     ${amount} SZT 
</lable>

</li>
`;
        pineVolume += leng / 1000 * wid / 1000 * depth / 1000 * amount;
        return li
    }

}
// return to 3
/*
<input type="checkbox" name="sizeBox" id="${partId}" value ="${amount * inputNum.value}+' szt '+${leng}+'x'+${wid}+'x'+${depth}"/>
<input type="checkbox" name="sizeBox" id="${partId}" value ="${amount * inputNum.value}+' szt '+${leng}+'x'+${wid}+'x'+${depth}"/>*/
//6
let addHtmlToListsArr = (productType, listsHtml, html) => {

    for (let i in listsHtml) {
        let newHtml = html;
        if (listsHtml[i].name === productType.id)
            return (listsHtml[i].objHtml ? listsHtml[i].objHtml += newHtml : listsHtml[i].objHtml = newHtml)
    }

}
//7 the last operation add html
function genHtml(listsHtml, blockId,) {
    let htmlList = ' '
    for (let i in listsHtml) {
        let id = listsHtml[i].name
        let newHtml = `
             <div class="modelBox" id="${id}">          
         ${listsHtml[i].objHtml}  
    </div>
            `
        htmlList += newHtml
        blockId.innerHTML = htmlList
    }

    getId.multiSizeHtml.innerHTML = sizeArr.map(material => {
        return getSizeHtml(material)

    }).join(' ')
}