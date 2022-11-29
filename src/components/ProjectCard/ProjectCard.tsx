import React from 'react'
import css from './ProjectCard.module.scss'
import buildingDefault from 'src/resources/images/building-default.png'
import { empty } from 'src/utils/utils'

export type ProjectInCard = {
    developerCompanyLogo?: string|undefined // ссылка на лого застройщика
    images?: string[] | empty // массив ссылок на изображения
    projectName: string
    year: string|number
    developer: string
    address: string
    square: string|number
    price: string|number
}

export type ProjectCardProps = {
    project: ProjectInCard
}

const ProjectCard = (props: ProjectCardProps) => {
    const b = props.project
    b.images ??= [buildingDefault]

    return <div className={css.frame}>
            <div className={css.imageFrame}>
                <div className={css.container}>
                    <div className={css.list}>
                        {b.images.map(it=>
                            <img key={it} className={css.image} src={it} alt={'Building'}/>
                        )}
                    </div>
                    { b.developerCompanyLogo && <img className={css.logo} src={b.developerCompanyLogo} alt='Developer Logo'/> }

                </div></div>
            <div className={css.info}>
                <div className={css.name}>{b.projectName}</div>
                <div className={css.dev}>{b.developer}</div>
                <div className={css.addr}>{b.address}</div>
                <div className={css.year}>Сдача {b.year}</div>
                <div className={css.measures}>{b.square}m2<big>  {b.price} млн</big> </div>
            </div>
    </div>
}

export default React.memo(ProjectCard) as unknown as typeof ProjectCard