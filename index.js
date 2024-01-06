document.addEventListener("DOMContentLoaded", function () 
{
    const pList = document.querySelectorAll(".product");

    const list = document.getElementById("list-ol");

    const price = document.getElementById("price");


    const discountText = document.getElementById("discountP");

    const totalPriceText = document.getElementById("total-price");

    const cField = document.getElementById("coupon-field");

    const applyBtn = document.getElementById("apply-btn");

    const makePurchaseBtn = document.getElementById("mPurchase");

    let totalPrice = 0;
    let sNumber = 1;
    let discount = 0;
    let couponApplied = false;

    pList.forEach(product => {
        product.addEventListener("click", function () {
            const productName = this.querySelector(".card-title").textContent;
            const productPrice = parseFloat(this.querySelector(".price").textContent);
            totalPrice += productPrice;

            const listItem = document.createElement("li");
            listItem.textContent = sNumber + ". " + productName;
            list.appendChild(listItem);

            price.textContent = "Total price: TK  " + totalPrice.toFixed(2);

            sNumber++;

            if (totalPrice > 200) {
                makePurchaseBtn.removeAttribute("disabled");
            }
        });
    });


    applyBtn.addEventListener("click", function () 
    
    {
        const couponCode = cField.value;

        if (couponCode === "SELL200") {
            discount = 20;
            const discountAmount = (totalPrice * discount) / 100;
            const discountedTotalPrice = totalPrice - discountAmount;

            discountText.textContent = "Discount: " + discount + "%";


            totalPriceText.textContent = "Total: TK : " + discountedTotalPrice.toFixed(2);


            couponApplied = true;


            applyBtn.disabled = true;

            if (totalPrice > 200 && couponApplied) 
            {
                makePurchaseBtn.removeAttribute("disabled");

                applyBtn.setAttribute("disabled");
            }


        } else 
        {
            alert("Invalid code");
        }


    });


    makePurchaseBtn.addEventListener("click", function () 
    
    
    
    
    {

        totalPrice = 0;
        sNumber = 1;
        discount = 0;
        couponApplied = false;

        list.innerHTML = "";
        price.textContent = "Total price: 0.00";
        discountText.textContent = "Discount:";
        totalPriceText.textContent = "Total:";
        cField.value = "";

        applyBtn.disabled = false;
        makePurchaseBtn.disabled = true;

     
    });
});

