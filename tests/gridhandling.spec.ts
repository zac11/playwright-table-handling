import { Page, Locator, Browser, test, chromium } from "@playwright/test";
const baseURL = `https://www.leafground.com/grid.xhtml`


test.describe(`Launch the browser and handle table data`, async () => {


    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
        await page.waitForSelector(".products-table-header", {
            state: 'visible'
        });

    });


    test(`Show all the orders of the all row`, async ({ page }) => {
        const tr = await page.locator('tbody.ui-datatable-data.ui-widget-content > tr.ui-datatable-selectable').all()
        const outData = []
        for (let i of tr) {
            const currentRow = i.getByRole('gridcell').nth(2)
            const currentName = await currentRow.innerText()
            await i.getByRole('gridcell').nth(1).click()
            await page.waitForTimeout(2000)
        }

    });

    test(`Print the inner table contents of all rows`, async({page})=>{
        const tr = await page.locator('tbody.ui-datatable-data.ui-widget-content > tr.ui-datatable-selectable').all()
        const outData = []
        for (let i of tr) {
            const currentRow = i.getByRole('gridcell').nth(2)
            const currentName = await currentRow.innerText()
            await i.getByRole('gridcell').nth(1).click()
            await page.waitForTimeout(2000);
            const subTableData = await page.locator(`xpath=//h5[text()='Orders for ${currentName}'] >> css=+div tbody.ui-widget-content`).locator(`tr`).allInnerTexts();
            outData.push({
                'name': currentName,
                'subTableText': subTableData
            })

        }
        
    });

   




});