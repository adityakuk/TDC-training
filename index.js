const footer = [
  { items: ["Contact Us"] }, { items: [] }, { items: [] }
];

debugger
const innerHtml = footer.map(({ items }) => (`
    <div class="col-md-4">
    ${items.map((item) => (`<h5>${item}</h5>`))}
    </div>
`)).join("")

document.querySelector("#footer").innerHTML = innerHtml
const items = document.querySelector(".row");
const columns = [];

for (let i = 0; i <= 5; i++) {
  const no = i + 1;
  columns.push({
    id: no,
    title: `Product ${no}`,
    description: `Description of Product ${no}`,
    image: "https://via.placeholder.com/150",
    price: 100 * no,
  });
}

items.innerHTML = columns
  .map(({ title, description, price }) => {
    return `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img
            src="https://via.placeholder.com/150"
            class="card-img-top"
            alt="Product Image"
          />
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <p class="card-text">$${price}</p>
            <a href="#" class="btn btn-primary">
              Add to Cart
            </a>
          </div>
        </div>
      </div>
  `;
  })
  .join("");
