export const BuilderAdminRouteDefault = "/builder/admin";

/* Routes for builder admin in web app */
const BuilderAdminRoute = {
    builder_admin: BuilderAdminRouteDefault,

    // company
    company: "company",
    company_edit: 'company/edit',

    // manager
    manager_list: 'manager/list',
    manager_info: 'manager/info',

    // project
    project_list: 'project/list',
    project_create: 'project/create',
    project_info: 'project/info',
    project_add_object: 'project/create/add/object',
    project_edit_object: 'project/create/edit/object',

    main: 'main',

    // messenger
    messenger: 'messenger'
};

export default BuilderAdminRoute;