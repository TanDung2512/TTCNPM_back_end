// document.getElementById('table').innerHTML = ''
// document.getElementById("paginate-product").innerHTML = ''
let xmlhttp = new XMLHttpRequest()
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        let pagination = document.getElementById("paginate-product")
        let leftArrow = document.createElement("a")
        let leftIcon = document.createElement("i")
        leftIcon.className += "left chevron icon"
        leftArrow.className += "icon item"
        leftArrow.appendChild(leftIcon)
        let rightArrow = document.createElement("a")
        let rightIcon = document.createElement("i")
        rightIcon.className += "right chevron icon"
        rightArrow.className += "icon item"
        rightArrow.appendChild(rightIcon)
        pagination.appendChild(leftArrow)
        let response = JSON.parse(this.responseText)
        for(i = 1; i<=response.numOfPages; i++)
        {
            let item = document.createElement('a')
            // if(i==1) {
            //     item.className += "item active"
            // } else {
                
            // }
            item.className += "item"
            let number = document.createTextNode(i)
            item.onclick = function(){
                changeData(parseInt(number.nodeValue, 10))
            }
            item.appendChild(number)
            pagination.appendChild(item)
        }
        pagination.appendChild(rightArrow)
    }
}
xmlhttp.open("GET", "http://localhost:3003/products", true)
xmlhttp.send()

let xml = new XMLHttpRequest()
xml.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
        let table, item, id, name, type, brand, category, price, amount
        table = document.getElementById('table')
        for(let i = 0; i<response.length; i++)
        {
            item = document.createElement('tr')
            id = document.createElement('td')
            name = document.createElement('td')
            type = document.createElement('td')
            brand = document.createElement('td')
            category = document.createElement('td')
            price = document.createElement('td')
            amount = document.createElement('td')
            id.appendChild(document.createTextNode(response.data[i].product_id))
            name.appendChild(document.createTextNode(response.data[i].product_name))
            type.appendChild(document.createTextNode(response.data[i].product_type))
            brand.appendChild(document.createTextNode(response.data[i].product_brand))
            category.appendChild(document.createTextNode(response.data[i].product_category))
            price.appendChild(document.createTextNode(response.data[i].product_price))
            amount.appendChild(document.createTextNode(response.data[i].product_amount))
            item.appendChild(id)
            item.appendChild(name)
            item.appendChild(type)
            item.appendChild(brand)
            item.appendChild(category)
            item.appendChild(price)
            item.appendChild(amount)
            table.appendChild(item)
        }
    }
}
xml.open("GET", "http://localhost:3003/products/page/1", true)
xml.send()

function changeData(index) {
    // change active status
    // let pagination = document.getElementById("paginate-product")
    // let pageList = pagination.getElementsByClassName("item")
    // var current = pageList.getElementsByClassName("active")[0]
    // current.className = current.className.replace(" active", "");
    // className += " active";

    document.getElementById('table').innerHTML = ''
    let xml = new XMLHttpRequest()
    xml.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText)
            let table, item, id, name, type, brand, category, price, amount
            table = document.getElementById('table')
            for(let i = 0; i<response.length; i++)
            {
                item = document.createElement('tr')
                id = document.createElement('td')
                name = document.createElement('td')
                type = document.createElement('td')
                brand = document.createElement('td')
                category = document.createElement('td')
                price = document.createElement('td')
                amount = document.createElement('td')
                id.appendChild(document.createTextNode(response.data[i].product_id))
                name.appendChild(document.createTextNode(response.data[i].product_name))
                type.appendChild(document.createTextNode(response.data[i].product_type))
                brand.appendChild(document.createTextNode(response.data[i].product_brand))
                category.appendChild(document.createTextNode(response.data[i].product_category))
                price.appendChild(document.createTextNode(response.data[i].product_price))
                amount.appendChild(document.createTextNode(response.data[i].product_amount))
                item.appendChild(id)
                item.appendChild(name)
                item.appendChild(type)
                item.appendChild(brand)
                item.appendChild(category)
                item.appendChild(price)
                item.appendChild(amount)
                table.appendChild(item)
            }
        }
    }
    xml.open("GET", `http://localhost:3003/products/page/${index}`, true)
    xml.send()
}

function search() {
    document.getElementById('table').innerHTML = ''
    document.getElementById("paginate-product").innerHTML = ''
    let pagination = document.getElementById("paginate-product")
    let leftArrow = document.createElement("a")
    let leftIcon = document.createElement("i")
    leftIcon.className += "left chevron icon"
    leftArrow.className += "icon item"
    leftArrow.appendChild(leftIcon)
    let rightArrow = document.createElement("a")
    let rightIcon = document.createElement("i")
    rightIcon.className += "right chevron icon"
    rightArrow.className += "icon item"
    rightArrow.appendChild(rightIcon)
    pagination.appendChild(leftArrow)
    let item = document.createElement('a')
    item.className += "item"
    let number = document.createTextNode(1)
    item.onclick = function(){
        changeData(parseInt(number.nodeValue, 10))
    }
    item.appendChild(number)
    pagination.appendChild(item)
    pagination.appendChild(rightArrow)
    let search = document.getElementById("searchBar").value
    let xml = new XMLHttpRequest()
    xml.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText)
            let table, item, id, name, type, brand, category, price, amount
            table = document.getElementById('table')
            for(let i = 0; i<response.length; i++)
            {
                item = document.createElement('tr')
                id = document.createElement('td')
                name = document.createElement('td')
                type = document.createElement('td')
                brand = document.createElement('td')
                category = document.createElement('td')
                price = document.createElement('td')
                amount = document.createElement('td')
                id.appendChild(document.createTextNode(response.data[i].product_id))
                name.appendChild(document.createTextNode(response.data[i].product_name))
                type.appendChild(document.createTextNode(response.data[i].product_type))
                brand.appendChild(document.createTextNode(response.data[i].product_brand))
                category.appendChild(document.createTextNode(response.data[i].product_category))
                price.appendChild(document.createTextNode(response.data[i].product_price))
                amount.appendChild(document.createTextNode(response.data[i].product_amount))
                item.appendChild(id)
                item.appendChild(name)
                item.appendChild(type)
                item.appendChild(brand)
                itemmodalButton.appendChild(category)
                itemmodalButton.appendChild(price)
                itemmodalButton.appendChild(amount)
                tablmodalButtone.appendChild(item)
            }
        }
    }
    xml.open("GET", `http://localhost:3003/products/search/${search}`, true)
    xml.send()
}

window.onclick = function(event) {
    let modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function closeModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function showModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function createProduct() {
    let request = {
        id: document.getElementById('pid').value,
        name: document.getElementById('pname').value,
        type: document.getElementById('ptype').value,
        brand: document.getElementById('pbrand').value,
        category: document.getElementById('pcategory').value,
        amount: document.getElementById('pamount').value,
        price: document.getElementById('pprice').value,
        desc: document.getElementById('desc').value,
    }
    let xml = new XMLHttpRequest()
    xml.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText)
        }
    }
    xml.open("POST", `/products/create`)
    xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xml.send(JSON.stringify(request))
}