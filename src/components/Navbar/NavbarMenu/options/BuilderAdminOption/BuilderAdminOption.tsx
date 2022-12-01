import React, { FC } from "react";
import DrawerOption from "../../components/DrawerOption";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router-dom";
import BuilderAdminRoute, {
  BuilderAdminRouteDefault,
} from "src/constants/addresses/routes/builder.admin.route";
import { IMenuOptionModel } from "src/models/Navbar/IMenuOptionModel";

interface IBuilderAdminOptionProps {
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Функциональный компонент модуля "застройщик-администратор"
 * @param {IBuilderAdminOptionProps} props Параметры функционального компонента
 * @returns {JSX.Element} React-элемент
 */
const BuilderAdminOption: FC<IBuilderAdminOptionProps> = ({
  setState,
}: IBuilderAdminOptionProps) => {
  const navigate = useNavigate();

  return (
    <DrawerOption
      title="Застройщик-администратор"
      type={"select"}
      Icon={AdminPanelSettingsIcon}
      clickHandler={() => {}}
      items={options.map((value) => (
        <DrawerOption
          title={value.title}
          type={value.type}
          Icon={value.Icon}
          clickHandler={() => {
            if (setState) {
              setState(false);
            }

            navigate(value.url);
          }}
          pl={8}
        />
      ))}
    />
  );
};

/**
 * Данные элементов меню
 */
const options: Array<IMenuOptionModel> = [
  {
    type: "button",
    title: "Информация о компании",
    Icon: ApartmentIcon,
    url: `${BuilderAdminRouteDefault}/${BuilderAdminRoute.main}`,
  },
  {
    type: "button",
    title: "Проекты",
    Icon: HomeWorkIcon,
    url: `${BuilderAdminRouteDefault}/${BuilderAdminRoute.project_list}`,
  },
  {
    type: "button",
    title: "Менеджеры",
    Icon: ManageAccountsIcon,
    url: `${BuilderAdminRouteDefault}/${BuilderAdminRoute.manager_list}`,
  },
];

export default React.memo(BuilderAdminOption);
