let createBtn = document.querySelector(".create")
let formDiv = document.querySelector(".form")
let closeBtn = document.querySelector("#close")
let form = document.querySelector("form")
let productDiv = document.querySelector(".products")

createBtn.addEventListener("click",()=>{
    formDiv.style.display="flex"
})

closeBtn.addEventListener("click",()=>{
    formDiv.style.display="none"
})

let products = JSON.parse(localStorage.getItem("products")) || [];
let updateIdx = null;

let ui = ()=>{
   productDiv.innerHTML = ""
   products.forEach((e,idx)=>{
    productDiv.innerHTML += ` <div class="product-card">
                <div class="img">
                    <img src="${e.image}" alt="">
                </div>
                <div class="text">
                    <h3>${e.productName}</h3>
                    <p>${e.des}</p>
                    <p>₹${e.price}</p>
                </div>

                <div class="btns" >
                    <button onclick= "updateProduct('${e.productName}')" class="upd">Update</button>
                    <button onclick="del(${idx})" class="del">Delete</button>
                </div>
            </div>` 
   })
}
ui()

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let productName = event.target[0].value;
  let des = event.target[1].value;
  let price = event.target[2].value;
  let image = event.target[3].value;

  if (
    productName.trim() === "" ||
    des.trim() === "" ||
    price.trim() === "" ||
    image === ""
  ) {
    alert("please fill all the fields");
    return;
  }

  let obj = {
    productName,
    des,
    price,
    image,
  };

  if(updateIdx !== null){
    products[updateIdx] = obj
    updateIdx = null
    localStorage.setItem("products", JSON.stringify(products));
  }else{
    products.push(obj)
    localStorage.setItem("products", JSON.stringify(products));
  }

  ui();

  form.reset();

  formDiv.style.display = "none";
});

let del = (id)=>{
    products.splice(id,1)
    localStorage.setItem("products", JSON.stringify(products));
    ui()
}

let updateProduct = (name)=>{
   formDiv.style.display="flex"
   let product = products.find((e)=> e.productName === name);
   updateIdx = products.findIndex((e)=> e.productName === name);

  form[0].value = product.productName;
  form[1].value = product.des;
  form[2].value = product.price;
  form[3].value = product.image;
}
