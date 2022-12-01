import { Drawer } from "@mui/material";
import { FC } from "react";
import { WrapperMenu, MenuButton } from "./DrawerButton.styled";
import styles from "./DrawerButton.module.css";

interface IDrawerButtonProps {
    children: JSX.Element
    clickHandler: (status: boolean) => {}
    state: boolean
}

/**
 * Функциональный компонент отображения меню
 * @param {IDrawerButtonProps} props Параметры функционального компоненты 
 * @returns {JSX.Element} Функциональный компонент
 */
const DrawerButton: FC<IDrawerButtonProps> = ({ clickHandler, state, children }) => {
  return (
    <WrapperMenu>
      <MenuButton onClick={clickHandler(true)}>Меню</MenuButton>
      <Drawer
        anchor="right"
        open={state}
        onClose={clickHandler(false) as unknown as (event: {}, reason: "backdropClick" | "escapeKeyDown") => void}
      >
        { children }
      </Drawer>
    </WrapperMenu>
  );
};

export default DrawerButton;
