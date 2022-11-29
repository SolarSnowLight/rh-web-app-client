

import logoDefault from 'src/resources/images/logo-default.png'

import companyLogo from 'src/resources/images/company-logo-default.png';


import buildingExample1 from 'src/resources/images/examples/building-example-1.webp';
import buildingExample2 from 'src/resources/images/examples/building-example-2.webp';
import buildingExample3 from 'src/resources/images/examples/building-example-3.jpg';
import homePage from 'src/resources/images/home_page.jpg';
import imagePlaceholder from 'src/resources/images/image-placeholder.png'
import mainPageBgc from 'src/resources/images/main-page-bgc.jpg'
import neonSunrise from 'src/resources/images/examples/neon-sunrise-web.jpg'
import retrowave1 from 'src/resources/images/examples/retrowave-1.png';
import hotlineMiami2 from 'src/resources/images/examples/wallpaper-Hotline-Miami-2---Wrong-Number2560x1440.jpg';
import needMoreAcidMarkII from 'src/resources/images/examples/need_more_acid_mark_ii.jpg';
import retrowave2 from 'src/resources/images/examples/Retrowave_(2).jpg';



const companyInfo = {
    logo: companyLogo,
    title: 'Company Name',
    email: 'mail@mail.ru',
    link: 'website.www.com',
    phone: '+7129856192857',
    description:
        `Группа Аквилон - одна из ведущих девелоперских компаний, предоставляющих полный спектр услуг на рынке недвижимости, создана в Архангельске 13 октября 2003 года, более 18 лет на рынке.
        Входит в ТОП-20 крупнейших застройщиков страны, в 10-ку крупнейших застройщиков Санкт-Петербурга.
        Группа Аквилон признана системообразующим предприятием России.
        География присутствия: Москва, Санкт-Петербург, Ленинградская область, Архангельск, Северодвинск.`,
}



const objects = [...Array(6).keys()].map(i=>({
    id: i+'',
    builderLogo: logoDefault,
    images: [buildingExample1,buildingExample2,buildingExample3],
    name: 'Название объекта',
    year: 2025,
    objectsCnt: i+1,
}))
objects[0].images = [
    buildingExample1, buildingExample2, buildingExample3, homePage,
    imagePlaceholder, mainPageBgc, neonSunrise, retrowave1,
    hotlineMiami2, needMoreAcidMarkII, retrowave2
]
objects[1].images = [buildingExample2]





export const mockData = {
    companyInfo,
    objects,
}
