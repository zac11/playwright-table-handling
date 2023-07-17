import { chromium,test } from "@playwright/test";

test.describe(`First test`,()=>{
    test('Launch the charts page and get values',async({page})=>{

    
        await page.goto("https://demo.guru99.com/test/web-table-element.php#");
        await page.waitForSelector(".dataTable",{
            state: 'visible'
        });

        const tableRows = page.locator('table.dataTable tr');
        const rowCount = await tableRows.count();

        let data = [];

        for(let i=0; i<rowCount; i++){
            let row = tableRows.nth(i);
            let companyName = await row.locator('td:nth-child(1)').allInnerTexts();
            let prevClose = await row.locator('td:nth-child(3)').allInnerTexts();
            let currentPrice = await row.locator('td:nth-child(4)').allInnerTexts();
            
            if(companyName && prevClose && currentPrice){
                data.push({
                    companyName: companyName,
                    prevClose: prevClose,
                    currentPrice: currentPrice
                });
            }
        }

        await page.waitForTimeout(3000);

        console.log(data);

        
    
    
    });
    
   
})
