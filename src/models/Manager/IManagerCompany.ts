export interface IManagerProjectInfoModel {
  uuid: string | undefined | null;
  logo: string | undefined | null;
  title: string | undefined | null;
  description: string | undefined | null;
}

export interface IManagerCompanyModel {
  projects: IManagerProjectInfoModel[] | undefined | null;
  message: string | undefined | null;
}

export interface IManagerUuidModel {
  company_uuid: string;
  manager_uuid: string;
}
