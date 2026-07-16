const menuContainer = document.getElementById("menu-container");// 這裡的 menuData 是從 menu.json 讀取的資料

// 產生菜單
function createMenu(){
    menuData.forEach(category=>{
        let html = `
        <section class="category">
            <h3>${category.category}</h3>
        `;
        category.items.forEach(food=>{
            html += `
            <div class="food">

                <label>
                    <input 
                    type="checkbox"
                    class="food-check">
                    ${food.name}
                </label>

                <div class="custom">

                    份數：
                    <input 
                    type="number"
                    value="1"
                    min="1"
                    class="quantity">
            `;
            if(food.options){
                html += `
                    <h4>加點</h4>
                `;
                food.options.forEach(add=>{
                    html += `
                    <label>
                        <input 
                        type="checkbox">
                        ${add.name}
                        <input 
                        type="number"
                        value="1"
                        min="1">
                    </label>
                    `;
                });
            }
            html += `
                    <textarea placeholder="備註"></textarea>
                </div>
            </div>
            `;
        });
        html += `
        </section>
        `;
        menuContainer.innerHTML += html;
    });
}

createMenu();

// 勾選顯示備註
document.querySelectorAll(".food-check").forEach(check => {// 這裡的 check 是每個勾選框的 DOM 元素

    check.addEventListener("change", function(){// 這裡的 this 是指被勾選的 checkbox

        const custom = this.closest(".food").querySelector(".custom");// 這裡的 this 是指被勾選的 checkbox，closest(".food") 是找到最近的父元素 .food，querySelector(".note") 是找到備註的 div

        if(this.checked){// 這裡的 this 是指被勾選的 checkbox
            custom.style.display = "block";// 顯示備註
        }else{
            custom.style.display = "none";// 隱藏備註
            note.querySelector("textarea").value = "";// 清空備註
        }
    });
});


// 選擇餐別
let selectedMeal = "";

document.querySelectorAll(".meal-btn").forEach(button => {// 這裡的 button 是每個餐別按鈕的 DOM 元素

    button.addEventListener("click", function(){// 這裡的 this 是指被點擊的按鈕

        selectedMeal = this.innerText;//這裡的 this 是指被點擊的按鈕，innerText 是取得按鈕的文字內容

        console.log("目前選擇:", selectedMeal);// 顯示目前選擇的餐別

    });
});


// 送出訂單
document.getElementById("submit-btn").addEventListener("click", () => {

    let order = [];

    document.querySelectorAll(".food-check").forEach(check => {

        if(check.checked){
            order.push({// 這裡的 check 是每個勾選框的 DOM 元素
                meal: selectedMeal,
                food: check.dataset.name,
                note: check.closest(".food")
                    .querySelector("textarea").value
            });
        }
    });

    console.log(order);// 顯示訂單內容

    alert("訂單送出成功");// 顯示送出成功訊息

});