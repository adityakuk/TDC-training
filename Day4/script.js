fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const productSection = document.getElementById("productSection");
        const bannerSection = document.querySelector(".container.mx-auto.my-4");
        const specialOffersSection = document.querySelector(".bg-gray-200.py-4");

        function displayProducts(products) {
            productSection.innerHTML = '';
            products.forEach(products => {
                const productCard = document.createElement('div');
                productCard.classList.add('bg-white', 'p-4', 'rounded-md', 'shadow-md', 'mb-4');
                productCard.innerHTML = `
          <h3 class="text-lg font-semibold mb-2">${products.name}</h3>
          <p class="text-gray-600">Category: ${products.category}</p>
          <p class="text-gray-600">Brand: ${products.brand}</p>
          <p class="text-gray-600">Price: $${products.price}</p>
          <p class="text-gray-600">Discount: $${products.discount}</p>
          <img src="${products.image}" alt="${products.name}" class="w-200 h-200 object-cover rounded-md mt-2 mb-4">
          <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">Add to Cart</button>
        `;
                productSection.appendChild(productCard);
            });
            toggleSectionsVisibility();
        }

        function toggleSectionsVisibility() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            bannerSection.style.display = searchTerm ? 'none' : 'block';
            specialOffersSection.style.display = searchTerm ? 'none' : 'block';

        }

        displayProducts(products);

        document.getElementById('searchInput').addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const filteredProducts = products.filter(products =>
                products.name.toLowerCase().includes(searchTerm) ||
                products.category.toLowerCase().includes(searchTerm) ||
                products.brand.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        });
    })
    .catch(error => console.error(error));




// using for show the data Today Deals
// fetch('TodayDeals.json')
//     .then(response => response.json())
//     .then(TodayDealProducts => {
//         const todayDealsSection = document.getElementById("todayDealsSection");

//         function displayDeals(TodayDealProducts) {
//             todayDealsSection.innerHTML = '';
//             TodayDealProducts.forEach(TodayDealProducts => {
//                 // Check if the TodayDealProducts has a discount
//                 if (TodayDealProducts.discount > 0) {
//                     const productCards = document.createElement('div');
//                     productCards.classList.add('bg-white', 'p-4', 'rounded-md', 'shadow-md');
//                     productCards.innerHTML = `
//                         <h3 class="text-lg font-semibold mb-2">${TodayDealProducts.name}</h3>
//                         <p class="text-gray-600">Category: ${TodayDealProducts.category}</p>
//                         <p class="text-gray-600">Brand: ${TodayDealProducts.brand}</p>
//                         <p class="text-gray-600">Price: $${TodayDealProducts.price}</p>
//                         <p class="text-gray-600">Discount: ${TodayDealProducts.discount}%</p>
//                         <img src="${TodayDealProducts.image}" alt="${TodayDealProducts.name}" class="w-full h-auto rounded-md mt-2 mb-4">
//                         <button class="bg-blue-500 text-white px-4 py-2 rounded-md">Add to Cart</button>
//                     `;
//                     todayDealsSection.appendChild(productCards);
//                 }
//             });
//         }

//         displayDeals(TodayDealProducts);
//     })
//     .catch(error => console.error(error));
