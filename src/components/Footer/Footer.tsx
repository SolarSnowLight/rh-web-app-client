import css from './Footer.module.scss';
import Space from "src/components/Space/Space";

const Footer = () => {
    return <footer className={css.page}>

        <Space h='4em'/>

        <div className={css.line}/>

        <Space h={40}/>

        <div className={css.footerContainer}>

            <div className={css.cYearBox}>
                <div className={css.year}>© 2022</div>
                <Space h={8}/>
                <div className={css.text}>Текст</div>
            </div>

            <div className={css.navAndContactBox}>
                <div className={css.title}>НАВИГАЦИЯ</div>
                <Space h={32}/>
                <div className={css.navMenuItem}>Главная</div>
                <Space h={16}/>
                <div className={css.navMenuItem}>Объекты</div>
                <Space h={16}/>
                <div className={css.navMenuItem}>Главная</div>
                <Space h={16}/>
                <div className={css.navMenuItem}>Застройщики</div>
            </div>

            <div className={css.navAndContactBox}>
                <div className={css.title}>КОНТАКТЫ</div>
                <Space h={32}/>
                <div className={css.contactMenuItem}>+7895688877</div>
                <Space h={16}/>
                <div className={css.contactMenuItem}>gmail.ua@gmail.com</div>
            </div>

            <div className={css.confidentialityBox}>
                <div className={css.text}>Политика конфиденциальности</div>
            </div>

        </div>

        <Space h={96}/>


    </footer>
}

export default Footer;