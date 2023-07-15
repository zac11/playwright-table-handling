import { Page, Locator, Browser, test, chromium } from "@playwright/test";


test.describe(`Launch the browser and handle table data`, async () => {

    const baseURL = `https://datatables.net/extensions/select/examples/initialisation/checkbox.html`

    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
        await page.waitForSelector(`table#example`, {
            state: 'visible'
        });

    });


    test(`Get all the row count`, async ({ page }) => {

        const parentBody = await page.locator(`table#example tbody`);
        await page.waitForTimeout(3000);
        console.log(await parentBody.locator('tr').count());
    });

    test(`Get all the columns for each row`, async ({ page }) => {
        const allRows = await page.locator(`table#example tbody tr`).all();
        allRows.forEach(async (rows) => {
            console.log(await rows.locator(`td`).count());
        });
    })

    test(`Get the data for a specific row`, async ({ page }) => {
        const tableLocator = await page.locator(`table#example tbody`);
        const second_row_text = await tableLocator.locator(`tr`).nth(1).locator(`:scope`).allInnerTexts();
        await second_row_text.forEach((text) => {
            console.log(text);
        });
    });


    test(`Search for people who have Tokyo office and select last person`, async ({ page }) => {
        const search_tokyo = await page.locator(`input[type='search']`);
        await search_tokyo.fill(`Tokyo`);

        const tableLocator = await page.locator(`table#example tbody`);
        await page.waitForTimeout(5000);
        const last = await tableLocator.locator('tr').last().locator(':scope', { hasText: `Tokyo` }).locator('td.select-checkbox').click();
        await page.waitForTimeout(3000);
    });


    test(`Increase count of rows and get all names`, async ({ page }) => {
        await page.locator(`select[name='example_length']`).selectOption(`25`);
        await page.waitForTimeout(3000);
        const allnames = await page.locator(`table#example tbody`).locator(`tr`).locator(`:scope`).locator(`td.sorting_1`).allInnerTexts();
        await allnames.forEach((text) => {
            console.log(text);
        });
    });


    test(`Print the name of people who have office as Tokyo`, async({page})=>{
        const search_tokyo = await page.locator(`input[type='search']`);
        await search_tokyo.fill(`Tokyo`);
        const tableLocator = await page.locator(`table#example tbody`);
        const row = await tableLocator.locator(`tr`).locator(":scope").locator(`td.sorting_1`).allInnerTexts();
        await row.forEach((text)=>{
            console.log(text);
        })
    });


});