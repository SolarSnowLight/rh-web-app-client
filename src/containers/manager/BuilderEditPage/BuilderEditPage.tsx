import React, {FormEvent, useState} from 'react'
import css from './BuilderEditPage.module.scss'
import Space from "src/components/Space/Space";
import {TextField} from "@mui/material";
import styled from "styled-components";
import {toast} from "react-toastify";
import ImagePicker from "src/components/ImagePicker";
import ButtonGreen2 from "src/components/UI-Styled/Button/ButtonGreen2/ButtonGreen2";
import ButtonWhite2 from "src/components/UI-Styled/Button/ButtonWhite2/ButtonWhite2";
import Input2 from "src/components/UI-Styled/Input/Input2/Input2";



const BuilderEditPage = () => {


    const onSave = (ev: FormEvent<unknown>) => {
        ev.preventDefault()
        toast.info('Эта функция ещё не реализована')
    }
    const onCancel = () => {
        toast.info('Эта функция ещё не реализована')
    }


    const [logo, setLogo] = useState(undefined as undefined|string|File)


    /*const [logo, setLogo] = useState([]);
    const onChangeImage = (imageList, addUpdateIndex) => {
        setLogo(imageList);
    };*/


    return <div className={css.page}>

        <Space h={33}/>

        <div className={css.mainTitle}>Редактирование застройщика</div>

        <Space h={56}/>

        <form onSubmit={onSave}>
            <div className={css.fieldsContainer2}>

                <div className={css.widgetBox}>
                    <div className={css.title}>Логотип  *</div>
                    <Space h={8}/>
                    <ImagePicker image={logo} setImage={setLogo} />
                </div>

                <div className={css.widgetBox}>
                    <div className={css.title}>Описание</div>
                    <Space h={8}/>
                    <Multiline1 placeholder='Описание' />
                </div>

            </div>

            <Space h={24}/>

            <div className={css.fieldsContainer}>

                <div className={css.widgetBox}>
                    <div className={css.title2}>Название  *</div>
                    <Space h={12}/>
                    <Input2 placeholder='Название застройщика' />
                </div>

                <div className={css.widgetBox}>
                    <div className={css.title2}>Email  *</div>
                    <Space h={12}/>
                    <Input2 placeholder='Вставьте почту' />
                </div>

                <div className={css.widgetBox}>
                    <div className={css.title2}>Телефон  *</div>
                    <Space h={12}/>
                    <Input2 placeholder='Вставьте телефон' />
                </div>

                <div className={css.widgetBox}>
                    <div className={css.title2}>Ссылка на сайт  *</div>
                    <Space h={12}/>
                    <Input2 placeholder='Вставьте ссылку' />
                </div>

            </div>

            <Space h={24}/>

            <div className={css.fieldsContainer}>

                <div className={css.widgetBox} onClick={onCancel}>
                    <ButtonWhite2>Отмена</ButtonWhite2>
                </div>

                <div className={css.widgetBox}>
                    <ButtonGreen2 type='submit'>
                        Сохранить изменения
                    </ButtonGreen2>
                </div>

            </div>
        </form>

        <Space h='4em'/>

    </div>
}
export default React.memo(BuilderEditPage) as unknown as typeof BuilderEditPage




let Multiline1 = styled(TextField).attrs({
    variant: 'outlined',
    type: 'text',
    multiline: true,
    rows: 11, // todo fit height
})`
  width: 400px; height: 295px;
  padding: 16px;

  fieldset { // рамка
    border: 1px solid #8B8B8B;
    border-radius: 0;
  }
  .MuiInputBase-input.MuiOutlinedInput-input  { // textarea
    font: 500 18px var(--font-family-text);
    color: black;
    letter-spacing: 0.05em;
    &textarea::placeholder {
      color: #8B8B8B;
    }
  }
`
Multiline1 = React.memo(Multiline1) as unknown as typeof Multiline1



