export interface ICompanyModel {
    uuid: string;
    data: ICompanyInfoModel;
    created_at: Date;
    rules: string[];
}

export interface ICompanyInfoModel {
    logo: string;
    title: string;
    description: string;
    phone: string;
    link: string;
    email_company: string;
    email_admin: string;
}