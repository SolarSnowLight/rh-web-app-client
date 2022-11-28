import css from './CompanyInfo.module.scss';

import React from "react";
import { toast } from "react-toastify";
import Space from 'src/components/Space';
import ButtonWhite2 from "src/components/UI-Styled/Button/ButtonWhite2/ButtonWhite2";


type CompanyInfoProps = {
    companyInfo: {
        logo: string // image url / data-url
        title: string
        email: string
        link: string
        phone: string
        description: string
    }
}


const CompanyInfo = ({ companyInfo }: CompanyInfoProps) => {

    const onChat = () => {
        toast.info('Чат онлайн')
    }

    return <div className={css.mainFrame}>
        <div className={css.infoFrame}>
            <div className={css.titleContainer}>
                <img className={css.logo} src={companyInfo.logo} />
                <div className={css.title}>{companyInfo.title}</div>
            </div>

            <Space h={16} />
            <div className={css.infoItem}>{companyInfo.email}</div>
            <Space h={16} />
            <div className={css.infoItem}>{companyInfo.link}</div>
            <Space h={16} />
            <div className={css.infoItem}>{companyInfo.phone}</div>
            <Space h={42} />

            <ButtonWhite2 onClick={onChat}>
                Чат онлайн
            </ButtonWhite2>
        </div>
        <div className={css.descriptionFrame}>{companyInfo.description}</div>
    </div>
}
export default React.memo(CompanyInfo) as unknown as typeof CompanyInfo

