import css from './CompanyInfo.module.scss';

import React from "react";
import { toast } from "react-toastify";
import Space from 'src/components/Space';
import ButtonWhite2 from "src/components/UI-Styled/Button/ButtonWhite2/ButtonWhite2";
import styled from "styled-components";


type CompanyInfoProps = {
    companyInfo: {
        logo: string // image url / data-url
        title: string
        email: string
        link: string
        phone: string
        description: string
    },
    viewMode?: 'view'|'edit',
}


const CompanyInfo = ({ companyInfo, viewMode = 'view' }: CompanyInfoProps) => {

    const onChat = () => {
        toast.info('Чат онлайн')
    }
    const onEdit = () => {
        toast.info('Редактировать информацию')
    }

    return <div className={css.mainFrame}>
        <div className={css.infoFrame}>
            <div className={css.titleContainer}>
                <img className={css.logo} src={companyInfo.logo} />
                <div className={css.title}>{companyInfo.title}</div>
            </div>

            <div className={css.infoItemsContainer}>
                <div className={css.infoItem}>{companyInfo.email}</div>
                <div className={css.infoItem}>{companyInfo.link}</div>
                <div className={css.infoItem}>{companyInfo.phone}</div>
            </div>

            <div className={css.buttonWrapper}>
                { viewMode==='view' && <ButtonWhite2 onClick={onChat}>
                    Чат онлайн
                </ButtonWhite2> }
                { viewMode==='edit' && <ButtonWhite2FullWidth onClick={onEdit}>
                    Редактировать информацию
                </ButtonWhite2FullWidth> }
            </div>
        </div>
        <div className={css.descriptionFrame}>{companyInfo.description}</div>
    </div>
}
export default React.memo(CompanyInfo) as unknown as typeof CompanyInfo




let ButtonWhite2FullWidth = styled(ButtonWhite2)`
  &.MuiButtonBase-root {
    width: 100%;
  }
`
ButtonWhite2FullWidth = React.memo(ButtonWhite2FullWidth) as unknown as typeof ButtonWhite2FullWidth
