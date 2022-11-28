import React, {MouseEventHandler, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import css from './ModalManagerToProjects.module.scss'
import CrossIc from "src/components/icons/Cross2Ic";
import styled from "styled-components";
import {utils} from "src/utils/utils";
import classNames from "classnames";
import {useDisableHtmlScroll} from "src/hooks/useDisableHtmlScroll/useDisableHtmlScroll";
import ObjectCard2 from "src/components/ObjectCard2/ObjectCard2";
import ButtonGreen2 from "src/components/UI-Styled/Button/ButtonGreen2/ButtonGreen2";
import ButtonGray2 from "src/components/UI-Styled/Button/ButtonGray2/ButtonGray2";
import {toast} from "react-toastify";
import {useSet} from "src/hooks/useSet";




/*export type ManagerToProjectAction = {
    managerId: string
    projectId: string
    type: 'add'|'remove'
}*/
type Project = {
    id: string
    logo?: string|undefined // ссылка на лого застройщика
    images?: string[] | null | undefined // массив ссылок на изображения
    name: string
    year?: string|number
    objectsCnt?: number
    isManagerInProject?: boolean
}
type ProjectApi = {
    Uuid: string
    Data: {
        Logo: string // относительная ссылка на главное изображение проекта (использовать getPublicAddress для получения абсолютной)
        Title: string // навзание проекта
        Description: string // описание проекта
        Managers: string[] // array of manager emails
    }
    CreatedAt: string // время создания проекта, пример: '2022-10-29T09:12:07.011641Z', таймзона UTC+8
}
export const projectApiToProject = (projectApi: ProjectApi): Project => ({
    id: projectApi.Uuid,
    images: [projectApi.Data.Logo],
    name: projectApi.Data.Title,
})


export type ModalManagerToProjectsProps = {
    managerId?: string | null | undefined
    projects?: Project[] | null | undefined
    onClose?: ()=>void
}
const ModalManagerToProjects = ({
    managerId,
    projects,
    onClose = ()=>{},
}: ModalManagerToProjectsProps) => {
    projects ??= []

    // disable scroll of faded page
    useDisableHtmlScroll()



    const _initialSelectedIds = useMemo(
        ()=>({ ids: new Set<string>(
                projects?.filter(it=>it.isManagerInProject).map(it=>it.id)
            )}),[projects]
    )
    const initialSelectedIds = _initialSelectedIds.ids

    const [selectedIds, updateSelectedIds] = useSet(new Set<string>())

    const onSelect = (ev: React.MouseEvent, id: string) => {
        if (!ev.ctrlKey) selectedIds.clear()
        utils.toggleInSet(selectedIds, id)
        updateSelectedIds()
    }


    const onAddManagerToProjects = () => {
        //console.log('initialIds',initialSelectedIds)
        //console.log('selectedIds',selectedIds)
        const addedIds = [] as string[]
        for (const id of selectedIds) if (!initialSelectedIds.has(id)) addedIds.push(id)
        toast.info(`add manager(id='${managerId}') to projects(ids='${JSON.stringify(addedIds)}')`)
    }
    const onRemoveManagerFromProjects = () => {
        const removedIds = [] as string[]
        for (const id of selectedIds) if (initialSelectedIds.has(id)) removedIds.push(id)
        toast.info(`remove manager(id='${managerId}') from projects(ids='${JSON.stringify(removedIds)}')`)
    }
    const onContactTheManager = () => {
        toast.info(`Contact the manager`)
    }


    return <div className={css.fade}>
        <div className={css.frame}>

            <div className={css.closeContainer}>
                <div className={css.closeBox} onClick={onClose}>
                    <CrossIc1/>
                </div>
            </div>

            <div className={css.card}>

                <div className={css.projectsListContainer}>
                    <div className={css.content}>
                        { projects.map(it=><SelectableItem
                            key={it.id}
                            project={it}
                            isSelected={selectedIds.has(it.id)}
                            onSelect={ev=>onSelect(ev,it.id)}
                        />) }
                    </div>
                </div>

                <div className={css.buttons}>
                    <ButtonGreen2 onClick={onAddManagerToProjects}>
                        Добавить в проект
                    </ButtonGreen2>
                    <ButtonGreen2 onClick={onContactTheManager}>Связаться с менеджером</ButtonGreen2>
                    <ButtonGreen2 onClick={onRemoveManagerFromProjects}>
                        Удалить из проекта
                    </ButtonGreen2>
                    {/*<ButtonGray2>Отмена</ButtonGray2>*/}
                </div>

            </div>

        </div>
    </div>
}
export default React.memo(ModalManagerToProjects) as unknown as typeof ModalManagerToProjects



let CrossIc1 = styled(CrossIc).attrs({
    width: 17, height: 17,
    mainColor: '#F8F8F8',
})``
CrossIc1 = React.memo(CrossIc1) as unknown as typeof CrossIc1



type SelectableItemProps = {
    project: Project
    isSelected?: boolean
    onSelect?: MouseEventHandler<HTMLDivElement> | undefined
}
let SelectableItem = ({
    project,
    isSelected = false,
    onSelect = ()=>{},
} : SelectableItemProps) => {
    return <div className={css.selectableItem} onClick={onSelect}>
        <div className={css.active} data-active={project.isManagerInProject}>
            <div className={css.selected} data-selected={isSelected}>
                <ObjectCard2 key={project.id} object={project}/>
            </div>
        </div>
    </div>
}
SelectableItem = React.memo(SelectableItem) as unknown as typeof SelectableItem


