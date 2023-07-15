import { Page, Locator, Browser, test, chromium } from "@playwright/test";
const baseURL = `https://www.leafground.com/table.xhtml`


test.describe(`Launch the browser and handle table data`, async () => {


    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
        await page.waitForSelector(".customers-table-header", {
            state: 'visible'
        });

    });


    test(`Print all the table data`, async ({ page }) => {

        const getTableLocator = await page.locator(`tbody.ui-datatable-data.ui-widget-content`).allInnerTexts();
        getTableLocator.forEach((text) => {
            console.table(text);
        });
    });

    test(`Get all the status from the table`, async ({ page }) => {
        for (const li of await page.locator(`tbody.ui-datatable-data.ui-widget-content`).getByRole(`row`).all())
            console.log(await li.locator(`td`).nth(1).allInnerTexts());
    });


    test(`Get all the activity % from the table`, async ({ page }) => {
        // selecting all the elements
        const elements = page.locator('div.ui-progressbar-value.ui-widget-header.ui-corner-all');

        // get the count of elements
        const elementsCount = await elements.count();

        for (let i = 0; i < elementsCount; i++) {
            // get style attribute for each element
            const styleAttribute = await elements.nth(i).getAttribute('style');

            // check if style attribute is not null
            if (styleAttribute !== null) {
                // split the styles into an array
                const styles = styleAttribute.split(';');

                // find the width style
                const widthStyle = styles.find(style => style.trim().startsWith('width'));

                // check if width style is found
                if (widthStyle !== undefined) {
                    // get the width value
                    const widthValue = widthStyle.split(':')[1].trim();
                    console.log(`Width value for element ${i + 1}: ${widthValue}`);
                } else {
                    console.log(`Width style not found for element ${i + 1}`);
                }
            } else {
                console.log(`Style attribute not found for element ${i + 1}`);
            }
        }
    });





});