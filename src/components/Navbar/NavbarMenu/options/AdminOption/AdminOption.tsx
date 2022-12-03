/* Библиотеки */
import React, { FC } from "react";

/* Компоненты */
import DrawerOption from "../../components/DrawerOption";

/* Ресурсы */
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useNavigate } from "react-router-dom";
import BuilderAdminRoute, {
  BuilderAdminRouteDefault,
} from "src/constants/addresses/routes/builder.admin.route";
import { IMenuOptionModel } from "src/models/Navbar/IMenuOptionModel";

interface IAdminOptionProps {
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminOption: FC<IAdminOptionProps> = ({
  setState,
}: IAdminOptionProps) => {
  const navigate = useNavigate();
  return (
    <DrawerOption
      title="Панель администратора"
      type={"select"}
      Icon={SupervisorAccountIcon}
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
    url: `${BuilderAdminRouteDefault}/${BuilderAdminRoute.company}`,
  },
  {
    type: "button",
    title: "Проекты",
    Icon: HomeWorkIcon,
    url: `${BuilderAdminRouteDefault}/${BuilderAdminRoute.project_list}`,
  },
];

export default React.memo(AdminOption);
