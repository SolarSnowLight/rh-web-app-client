import {DataElement} from "src/components/TileSelect1/TileSelect1";
import {FullData} from "./components/PieDiagram/PieDiagram";
import avaDefault from 'src/resources/images/ava-default.jpg'





const developersToSelect = [...Array(10).keys()].map(i=>({
    id: `${i}`, name: `Застройщик ${i+1}`
}))




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
        label: "В процессе",
        value: 250,
        color: "#8B8B8B",
        arcLabelColor: '#A6E2EF',
        borderColor: '#8B8B8B',
    },
    {
        id: "completed deals",
        label: "Завершённые",
        value: 300,
        color: "#A6E2EF",
        arcLabelColor: '#FCFCFC',
        borderColor: 'black',
    },
    {
        id: "interested",
        label: "Просмотренные",
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
    { ...diagramData[0], value: 350},
    { ...diagramData[1], value: 350},
    { ...diagramData[2], value: 500},
]
const diagramFullData2: FullData = {
    totals: {
        value: diagramData2.reduce((sum,curr)=>sum+curr.value, 0),
    },
    data: diagramData2
}



const apartmentTypes = [...Array(3).keys()].map(i=>({
    id: i+'', name: `Тип квартиры`, value: 'кол-во сделок'
}))

const lastDeals = [...Array(3).keys()].map(i=>({
    id: i+'', name: `Менеджер, клиент, тип сделки`, value: 'название проекта'
}))

const managerStatistics = [...Array(3).keys()].map(i=>({
    id: i+'', name: `Менеджер ФИО`, value: 'кол-во сделок'
}))






const developers = Array(67).fill(undefined).map((_,i)=>({
    id: i,
    ava: avaDefault,
    fio: `Иванов Иван Иванович ${i+1}`,
    projectsCnt: i+2,
    objectCnt: i+12,
}))





export const mockData = {
    developersToSelect,
    projectsTileSelect,
    diagramFullData,
    diagramFullData2,
    apartmentTypes,
    lastDeals,
    managerStatistics,
    developers,
}