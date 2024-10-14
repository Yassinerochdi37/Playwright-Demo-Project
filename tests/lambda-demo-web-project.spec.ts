import test, { chromium, expect } from "@playwright/test";


test.describe.only("Lambda Demo Website", async () => {
    test("Add product to panel test", async () => {
        let context = await chromium.launch();
        let page = await context.newPage();

        let searchForProductInput = page.getByRole('textbox', { name: 'Search For Products' })
        
        await page.goto("https://ecommerce-playground.lambdatest.io/");
        await expect(page).toHaveTitle("Your Store");

        await searchForProductInput.fill("Iphone");
        await searchForProductInput.press("Enter");

        await expect(page).toHaveTitle("Search - Iphone");

        let resultItems = page.locator(".product-layout");
        await expect(resultItems).toHaveCount(4);

        await resultItems.nth(2).click();
        await expect(page).toHaveTitle(/iphone/i);
        // await (new Promise(() => {}));

        await expect(page.getByText("In Stock")).toBeVisible();

        let price = await page.getByRole('heading', {name : '$'}).innerText();
        console.log("Le prix affiché est " + price);
        test.info().annotations.push({ type: 'Price', description: "Le prix affiché est " + price });

        await page.getByRole('button', { name: 'Add to Cart' }).click();
        await expect(page.locator("#notification-box-top>div")).toBeVisible();

        await page.getByRole('link', { name: /Checkout/ }).click();

        await expect(page).toHaveTitle(/Checkout/i);

        await page.waitForTimeout(2000);
    });
});