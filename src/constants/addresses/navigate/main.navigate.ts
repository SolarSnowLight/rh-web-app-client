/* Константы */
import BuilderAdminRoute from "../routes/builder.admin.route";
import MainRoute from "../routes/main.route";

export const MainNavigate = [
    {
        title: 'Главная',
        url: MainRoute.home_page,
    },
    {
        title: 'Компании',
        url: BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.company,
    },
    {
        title: 'Поиск',
        url: MainRoute.objects_search,
    },
    {
        title: 'Карта сайта',
        url: BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.manager_list,
    }
];