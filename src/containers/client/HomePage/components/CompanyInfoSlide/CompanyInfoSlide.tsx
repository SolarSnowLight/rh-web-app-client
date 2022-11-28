import React from "react";
import css from './CompanyInfoSlide.module.scss'


const CompanyInfoSlide = () => {
    return <div className={css.companyInfoSlide}>

        <div className={css.item}>
            <div className={css.title}>18 компаний</div>
            <div className={css.text}>
                Каталог застройщиков включает строительные организаций, которые возводят новостройки в Сочи.
            </div>
        </div>

        <div className={css.item}>
            <div className={css.title}>165 квартир</div>
            <div className={css.text}>
                Каталог застройщиков включает строительные организаций, которые возводят новостройки в Сочи.
                Каталог застройщиков включает строительные организаций, которые возводят новостройки в Сочи.
            </div>
        </div>

        <div className={css.item}>
            <div className={css.title}>58 частных домов</div>
            <div className={css.text}>
                Каталог застройщиков включает строительные организаций, которые возводят новостройки в Сочи.
            </div>
        </div>

    </div>
}
export default React.memo(CompanyInfoSlide) as unknown as typeof CompanyInfoSlide

