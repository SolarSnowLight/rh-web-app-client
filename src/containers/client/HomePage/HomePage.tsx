import css from './HomePage.module.scss';
import React from "react";

import CompanyInfoSlide from "./components/CompanyInfoSlide";
import ObjectsSlide from "./components/ObjectsSlide";
import MapSlide from "./components/MapSlide";
import DevelopersSlide from "./components/DevelopersSlide";
import TitleSlide from "./components/TitleSlide";
import Space from "src/components/Space";









const HomePage = () => {



    return <div className={css.page}>

        <TitleSlide />

        <CompanyInfoSlide />

        <ObjectsSlide />

        <MapSlide />

        <DevelopersSlide />

        <Space h='4em'/>

    </div>
}
export default React.memo(HomePage) as unknown as typeof HomePage








