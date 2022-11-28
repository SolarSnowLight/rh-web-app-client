import React from "react";
import css from './ObjectsSlide.module.scss'
import styled from "styled-components";
import {Button} from "@mui/material";
import { Arrow2ForwardIc } from "src/components/icons";
import Space from "src/components/Space";
import ObjectCard from "src/components/ObjectCard/ObjectCard";
import { root } from "src/styles";

import logoDefault from 'src/resources/images/logo-default.png'
import buildingExample1 from 'src/resources/images/examples/building-example-1.webp'
import buildingExample2 from 'src/resources/images/examples/building-example-2.webp'
import buildingExample3 from 'src/resources/images/examples/building-example-3.jpg'



const buildings = [
    {
        id: 1,
        developerCompanyLogo: logoDefault,
        images: [buildingExample1,buildingExample2,buildingExample3],
        projectName: 'Проект 1',
        year: 2025,
        developer: 'Застройщик 1',
        address: 'ул. Мира 15, 76',
        square: 50,
        price: 10,
    },
    {
        id: 2,
        developerCompanyLogo: logoDefault,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 3,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 4,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 5,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 6,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
]



const ObjectsSlide = () => {





    return <div className={css.objectsSlide}>

        <div className={css.titleBox}>
            <div className={css.title}>Лучшие предложения</div>
            <div className={css.buttons}>
                <ArrowButton>
                    <Arrow2ForwardIc style={{ transform: 'rotate(180deg)' }} />
                </ArrowButton>
                <ArrowButton sx={{ '&.MuiButtonBase-root': { marginLeft: '-1px' } }} >
                    <Arrow2ForwardIc />
                </ArrowButton>
            </div>
        </div>

        <Space h={25}/>

        <div className={css.objectsContainer}>
            <div className={css.objectsBox}>
                { buildings.map(it=><ObjectCard key={it.id} building={it} />) }
            </div>
        </div>

    </div>
}
export default React.memo(ObjectsSlide) as unknown as typeof ObjectsSlide




let ArrowButton = styled(Button)`
  &.MuiButtonBase-root {
    width: 32px; height: 32px;
    min-width: 32px; min-height: 32px;
    padding: 6.5px;

    background-color: #F8F8F8;
    border: 1px solid black;
    border-radius: 0;

    :hover {
      background-color: ${root.colorGreen};
    }
  }
`
ArrowButton = React.memo(ArrowButton) as unknown as typeof ArrowButton
