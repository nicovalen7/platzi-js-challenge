const $4fa36e821943b400$var$$app = document.getElementById("app");
const $4fa36e821943b400$var$$observe = document.getElementById("observe");
const $4fa36e821943b400$var$API = "https://api.escuelajs.co/api/v1/products";
let $4fa36e821943b400$var$intersectionObserver;
const $4fa36e821943b400$var$setPaginationInStorage = (offset, limit)=>{
    const pagination = {
        offset: offset,
        limit: limit
    };
    localStorage.setItem("pagination", JSON.stringify(pagination));
};
const $4fa36e821943b400$var$getData = (api)=>{
    const pagination = JSON.parse(localStorage.getItem("pagination"));
    const apiUrl = `${api}?offset=${pagination.offset}&limit=${pagination.limit}`;
    fetch(apiUrl).then((response)=>response.json()).then((products)=>{
        let output = products.map((product)=>`
            <article class="Card">
              <img src="${product.images[0]}" alt="${product.title}">
              <h2>
                ${product.title}
                <small>${product.price}</small>
              </h2>
            </article>
          `).join("");
        let newItem = document.createElement("section");
        newItem.classList.add("Items");
        newItem.innerHTML = output;
        $4fa36e821943b400$var$$app.appendChild(newItem);
    }).catch((error)=>console.log(error));
};
const $4fa36e821943b400$var$loadData = async (offset, limit)=>{
    $4fa36e821943b400$var$setPaginationInStorage(offset, limit);
    if (offset <= 200) await $4fa36e821943b400$var$getData($4fa36e821943b400$var$API);
    else {
        $4fa36e821943b400$var$intersectionObserver.unobserve($4fa36e821943b400$var$$observe);
        let endOfItemsMessage = document.createElement("section");
        endOfItemsMessage.classList.add("Center");
        endOfItemsMessage.innerHTML = `
      <h1>Todos los productos Obtenidos</h1>
    `;
        $4fa36e821943b400$var$$app.appendChild(endOfItemsMessage);
    }
};
function $4fa36e821943b400$var$createObserver() {
    $4fa36e821943b400$var$intersectionObserver = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (entry.isIntersecting) {
                const actualPagination = JSON.parse(localStorage.getItem("pagination"));
                $4fa36e821943b400$var$loadData(actualPagination.offset + actualPagination.limit, actualPagination.limit);
            }
        });
    }, {
        rootMargin: "0px 0px 100% 0px",
        threshold: 1.0
    });
    $4fa36e821943b400$var$intersectionObserver.observe($4fa36e821943b400$var$$observe);
}
window.addEventListener("load", (event)=>{
    $4fa36e821943b400$var$loadData(5, 10).then(()=>{
        $4fa36e821943b400$var$createObserver();
    });
}, false);


//# sourceMappingURL=index.js.map
