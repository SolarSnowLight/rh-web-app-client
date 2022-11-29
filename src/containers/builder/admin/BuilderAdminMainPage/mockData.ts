import companyLogo from 'src/resources/images/company-logo-default.png';
import {DataElement} from "src/components/TileSelect1/TileSelect1";
import {FullData} from "./components/PieDiagram/PieDiagram";
import avaDefault from 'src/resources/images/ava-default.jpg'




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





let projectsTileSelect0 = Array(10).fill(undefined)
    .map((_,i)=>({ id: `project${i}`, name: `Проект ${i}` }))
let projectsTileSelect: DataElement[] = projectsTileSelect0.map(data=>({
    data:{
        id: { id: data.id, type: 'single' },
        value: data.name
    },
    state: { isSelected: false }
}))
projectsTileSelect = [
    { data: { id: { id: 'all', type: 'special' }, value: 'Всё' }, state: { isSelected: true } },
    { data: { id: { id: 'nothing', type: 'special' }, value: 'Ничего' }, state: { isSelected: false } },
    ...projectsTileSelect
]







const diagramData = [
    {
        id: "initiated deals",
        label: "Начатые сделки",
        value: 250,
        color: "#8B8B8B",
        arcLabelColor: '#A6E2EF',
        borderColor: '#8B8B8B',
    },
    {
        id: "completed deals",
        label: "Завершённые сделки",
        value: 300,
        color: "#A6E2EF",
        arcLabelColor: '#FCFCFC',
        borderColor: 'black',
    },
    {
        id: "interested",
        label: "Заинтересованные",
        value: 450,
        color: "#DCDCDC",
        arcLabelColor: '#8B8B8B',
        borderColor: '#DCDCDC',
    },
]
const diagramFullData: FullData = {
    totals: {
        value: diagramData.reduce((sum,curr)=>sum+curr.value, 0),
    },
    data: diagramData
}

const diagramData2 = [
    {
        id: "initiated deals",
        label: "Начатые сделки",
        value: 350,
        color: "#8B8B8B",
        arcLabelColor: '#A6E2EF',
        borderColor: '#8B8B8B',
    },
    {
        id: "completed deals",
        label: "Завершённые сделки",
        value: 350,
        color: "#A6E2EF",
        arcLabelColor: '#FCFCFC',
        borderColor: 'black',
    },
    {
        id: "interested",
        label: "Заинтересованные",
        value: 500,
        color: "#DCDCDC",
        arcLabelColor: '#8B8B8B',
        borderColor: '#DCDCDC',
    },
]
const diagramFullData2: FullData = {
    totals: {
        value: diagramData2.reduce((sum,curr)=>sum+curr.value, 0),
    },
    data: diagramData2
}





const developers = Array(10).fill(undefined).map((_,i)=>({
    id: i,
    ava: avaDefault,
    fio: 'Иванов Иван Иванович',
    projectsCnt: 2,
    objectCnt: 12,
}))



const allProjects = Array(10).fill(undefined)
    .map((_,i)=>({ id: `project${i}`, name: `Проект ${i}` }))




export const mockData = {
    companyInfo,
    projectsTileSelect,
    diagramFullData,
    diagramFullData2,
    developers,
    allProjects,
}