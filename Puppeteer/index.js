const puppeteer = require('puppeteer');
const fs = require('fs');

async function main() {

    isRunning = true;

    const browser = await puppeteer.launch({ headless: false });
    // await page.setViewport({
    //     width: 1920,
    //     height: 1080
    // });
    const page = await browser.newPage();
    await page.goto('https://redtape.com/');
    await page.screenshot({ path: 'redtape.png' });
    await page.type("input[id=search-input]", 'Men shirt');
    await page.keyboard.press("Enter");
    await page.waitForNavigation();

    const itemDetails = await page.evaluate(() => {
        const details = [];

        const items = document.querySelectorAll('#content > div:nth-child(8) > div');

        items.forEach(item => {
            const title = item.querySelector('div.caption > h4 > a').textContent.trim();
            const price = item.querySelector('div.caption > p.price').textContent.trim();
            const imageSrc = item.querySelector('div.image > a > img').src;
            const productUrl = item.querySelector('div.image > a').href;

            details.push({ title, price, imageSrc, productUrl });
        });

        return details;
    });

    const jsonContent = JSON.stringify(itemDetails, null, 2);
    fs.writeFileSync('products.json', jsonContent)

    console.log(itemDetails);
    await browser.close()


}

console.log("Hello puppeteer");
main();



// if (fs.existsSync('puppeteer_running.flag')) {
//     console.log('Puppeteer script is already running. Exiting.');
//     process.exit(0);
// }321

// fs.writeFileSync('puppeteer_running.flag', '');

// fs.unlinkSync('puppeteer_running.flag')


// imgurl = []
// for (i = 0; i < 12; i++) {
//     imgurl[i] = document.querySelector(
//         `#content > div:nth-child(8) > div:nth-child(${i + 1}) > div > div.image > a > img`
//     )
// }
// console.log(imgurl)

// const imgElements = document.querySelectorAll('#content > div:nth-child(8) > div > div > div.image > a > img');
// const urls = [];
// imgElements.forEach(img => {
//     urls.push(img.src);
// });

// const title = item.querySelector("h2").textContent.trim();
// const price = item.querySelector(".price").textContent.trim();
// const imageUrl = item.querySelector(".image img").scr;
// return { title, price, imageUrl }

// titles = await page.evaluate(() => {
//     return document.querySelector("#content").textContent.trim();
// })

// titles = await page.evaluate(() => {
//     const element = document.querySelector("#content > div:nth-child(8) > div:nth-child(1)");
//     if (element) {
//         return element.textContent.trim()
//     }
//     return "Element not found"
// })