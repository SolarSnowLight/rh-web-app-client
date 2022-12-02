import { Icon, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { FC } from "react";
import { empty } from "src/types/empty";
import styled from "styled-components";

import DrawerOptionButton from "../DrawerOptionButton";
import DrawerOptionSelect from "../DrawerOptionSelect";

interface IDrawerOptionProps {
    type: "button" | "select";                                  // Тип элемента меню
    title: string;                                              // Текст в элементе
    clickHandler: () => void;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {   // Иконка элемента меню
        muiName: string;
    };
    items?: Array<JSX.Element> | empty | undefined;             // Подэлементы меню
    pl?: number;
}

/**
 * Функциональный компонент элемента меню
 * @param {IDrawerOptionProps} props Параметры функционального компонента
 * @returns {JSX.Element} React-элемент
 */
const DrawerOption: FC<IDrawerOptionProps> = ({ type, title, clickHandler, Icon, items, pl }: IDrawerOptionProps): JSX.Element => {
  return (
    <>
        {
            type === "button" ? 
                <DrawerOptionButton 
                    title={title}
                    clickHandler={clickHandler}
                    Icon={Icon}
                    pl={pl} 
                /> 
                : 
                <DrawerOptionSelect 
                    title={title}
                    clickHandler={clickHandler}
                    Icon={Icon}
                    items={items}
                    pl={pl} 
                />
        }
    </>
  );
};

export default React.memo(DrawerOption);
