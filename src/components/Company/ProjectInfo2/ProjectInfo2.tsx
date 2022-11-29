import css from './ProjectInfo2.module.scss'
import React from "react";
import Space from "src/components/Space";



export type ProjectInfo2 = {
    logo: string
    name: string
    builderName: string
    description: string
}
export type ProjectInfoProps = {
    projectInfo: ProjectInfo2
}


let ProjectInfo = ({ projectInfo }: ProjectInfoProps) => {

    return <div className={css.container}>
        <div className={css.nameLogoContainer}>
            <img className={css.logo} src={projectInfo.logo} alt='Project logo'/>
            <div className={css.name}>{projectInfo.name}</div>
            <div className={css.builderName}>{projectInfo.builderName}</div>
        </div>
        <Space h={32}/>
        <div className={css.projectDescription}>{projectInfo.description}</div>
        {/*<Space h={32}/>
        <ButtonWhite2 style={{ width: '100%' }} onClick={onEditProjectInfo}>
                    Редактировать информацию
                </ButtonWhite2>*/}
    </div>
}
export default React.memo(ProjectInfo) as unknown as typeof ProjectInfo




