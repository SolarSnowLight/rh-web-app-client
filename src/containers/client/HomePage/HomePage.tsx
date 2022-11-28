import css from './HomePage.module.scss';
import React from "react";

import CompanyInfoSlide from "./components/CompanyInfoSlide";
import ObjectsSlide from "./components/ObjectsSlide";
import MapSlide from "./components/MapSlide";
import DevelopersSlide from "./components/DevelopersSlide";
import TitleSlide from "./components/TitleSlide";









const HomePage = () => {



    return <div className={css.page}>

        <TitleSlide />

        <CompanyInfoSlide />

        <ObjectsSlide />

        <MapSlide />

        <DevelopersSlide />

    </div>
}
export default React.memo(HomePage) as unknown as typeof HomePage








