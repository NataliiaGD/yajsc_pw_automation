import { Locator, Page } from "@playwright/test";
export class AccountPage {
    page: Page;
    title: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = this.page.getByTestId('page-title');
    }


}