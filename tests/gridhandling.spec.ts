import { Page, Locator, Browser, test, chromium } from "@playwright/test";
const baseURL = `https://www.leafground.com/grid.xhtml`


test.describe(`Launch the browser and handle table data`, async () => {


    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
        await page.waitForSelector(".products-table-header", {
            state: 'visible'
        });

    });


    test(`Show all the orders of the first row`, async ({ page }) => {
        const parenttable = await page.locator(`tbody#form\\:dt-products_data.ui-datatable-data.ui-widget-content`).locator(`tr`);
        const elementCount = await parenttable.count();

        for(let i=0;i< elementCount;i+=2){
            const clickeleme = await parenttable.nth(i).locator(`td`).nth(1).getByLabel(`Toggle Row`);
            await clickeleme.click();
            await page.waitForTimeout(3000);
        }
        

    

        
    });

   




});