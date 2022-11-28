export const ProjectApiBase = "/project";
export const CompanyApiBase = "/company";

const CompanyApi = {
    get_all_projects: `${CompanyApiBase}${ProjectApiBase}/get/all`,
    get_all_managers: `${CompanyApiBase}/manager/get/all`,
    get_manager: `${CompanyApiBase}/manager/get`,
    create_project: `${CompanyApiBase}${ProjectApiBase}/create`,

    /* CRUD for project in company */
    project_update_image: `${CompanyApiBase}${ProjectApiBase}/update/image`,
    project_update: `${CompanyApiBase}${ProjectApiBase}/update`,

    /* CRUD for company */
    update_image: `${CompanyApiBase}/update/image`,
    update: `${CompanyApiBase}/update`
};

export default CompanyApi;