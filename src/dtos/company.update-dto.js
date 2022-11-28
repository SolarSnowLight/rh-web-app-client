export default class CompanyUpdateDto {
    uuid;
    title;
    description;
    email_company;
    phone;
    link;

    constructor(model) {
        this.uuid = model.uuid;
        this.title = model.title;
        this.description = model.description;
        this.email_company = model.email_company;
        this.phone = model.phone;
        this.link = model.link;
    }
}