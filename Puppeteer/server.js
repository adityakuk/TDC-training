// const puppeteer = require('puppeteer');

// async function main() {
//   try {
//     const browser = await puppeteer.launch({
//       headless: false,
//       defaultViewport: {
//         height: 800,
//         width: 1000
//       }
//     });

//     const page = await browser.newPage();
//     await page.goto('https://www.zeptonow.com/uncl/fresh-of-the-farms?clientParams=STORE_ID&scid=f2f64887-997c-48c9-868c-361059a19f53&itemLimit=10&type=store_products_by_subcategory');

//     await page.waitForSelector('#__next > div > div > div.main-layout_main__iGcRD.false div > div > div');

//     const jsonData = await page.evaluate(() => {
//       const dataNodes = document.querySelectorAll('#__next > div > div > div.main-layout_main__iGcRD.false div > div > div');

//       const data = [];
//       if (selectedElement) {
//         // Find all image elements within the selected element
//         var images = selectedElement.querySelectorAll('img');

//         if (images.length > 0) {
//           // Iterate over each image and log its title attribute
//           images.forEach(function (image) {
//             console.log('Image title:', image.title);
//           });
//         } else {
//           console.log('No images found within the selected element.');
//         }
//       } else {
//         console.log("Element not found");
//       }


//       return data;
//     });

//     console.log('jsonData:', jsonData);

//     await browser.close();
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// main();
