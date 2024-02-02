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