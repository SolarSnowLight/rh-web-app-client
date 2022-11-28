/* Библиотеки */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TextField } from '@mui/material';

/* Стили */
import styles from './TemplateTable.module.scss';


/**
 * Функциональный компонент шаблона таблицы, с помощью которого
 * происходит парсинг данных из excel-таблицы
 * @returns {JSX.Element} Функциональный компонент таблицы
 */
const TemplateTable = ({
    token,
    setToken
}) => {

    let visible = false;

    const onChangeHandler = (value, index, subIndex) => {
        const copy = JSON.parse(JSON.stringify(token));
        copy[index][subIndex].value = value;

        setToken(copy);
    };

    return (
        <table style={{
            borderSpacing: "0px",
            borderCollapse: "collapse"
        }}>
            <tbody>
                <tr>
                    <th
                        style={{
                            borderBottom: "1px solid #000000",
                            borderLeft: "1px solid #000000",
                            borderTop: "1px solid #000000"
                        }}
                        rowSpan={token.length + 1}
                        scope="rowgroup">
                        <div className={styles["block-th__text"]}>
                            <span className='span__text__black'>Номер этажа</span>
                        </div>
                    </th>
                </tr>
                {
                    token.map((item, itemIndex) => {
                        if (itemIndex > 0) {
                            visible = true;
                        }

                        return (
                            <tr key={Math.random()}>
                                {
                                    item.map((subItem, subItemIndex) => {
                                        return (
                                            <td
                                                style={{ border: "1px solid #000000" }}
                                                key={Math.random()}
                                            >
                                                {
                                                    (subItem.type_component == "text") &&
                                                    <div className={styles["block-td__text"]}>
                                                        <span key={Math.random()} className='span__text__black'>{subItem.value}</span>
                                                    </div>
                                                }
                                                {
                                                    (subItem.type_component == "input") &&
                                                    <div className={styles["block-td__text"]}>
                                                        <TextField
                                                            autoComplete="off"
                                                            key={Math.random()}
                                                            required
                                                            id="outlined-required"
                                                            defaultValue={subItem.value}
                                                            onBlur={(e) => {
                                                                onChangeHandler(e.currentTarget.value, itemIndex, subItemIndex);
                                                            }}
                                                            sx={{
                                                                borderRadius: '0px !important',
                                                                border: 'none',
                                                                width: '100%',
                                                                '&:hover fieldset': {
                                                                    border: 'none',
                                                                    borderRadius: '0px',
                                                                },
                                                                'fieldset': {
                                                                    border: 'none',
                                                                    borderRadius: '0px'
                                                                },
                                                            }}
                                                            InputProps={{
                                                                inputProps: {
                                                                    style: { textAlign: "center" },
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                }
                                            </td>
                                        )
                                    })
                                }

                                {
                                    !visible &&
                                    <td
                                        rowSpan={token.length}
                                        style={{
                                            width: '16px !important'
                                        }}>
                                        <div
                                            className={styles["block-td__text-column"]}
                                        >
                                            <span
                                                className='span__text__gray'
                                                onClick={() => {
                                                    const currentData = JSON.parse(JSON.stringify(token));

                                                    for (let i = 0; i < currentData.length; i++) {
                                                        const templObj = {
                                                            value: "",
                                                            type_component: "input",
                                                            position: `${i};${currentData[i].length}`
                                                        };

                                                        currentData[i].push(templObj);
                                                    }

                                                    setToken(currentData);
                                                }}
                                            >Добавить столбец</span>
                                        </div>
                                    </td>
                                }
                            </tr>
                        )
                    })
                }
                <tr>
                    <th
                        colSpan={token.length + 1}
                        scope="rowgroup">
                        <div
                            className={styles["block-th__text"]}
                            style={{ marginTop: "16px" }}
                        >
                            <span
                                className='span__text__gray'
                                onClick={() => {
                                    const templArray = [];

                                    for (let i = 0; i < token[0].length; i++) {
                                        const templObj = {
                                            value: "",
                                            type_component: "input",
                                            position: `${token.length};${i}`
                                        };

                                        templArray.push(templObj);
                                    }

                                    const currentData = JSON.parse(JSON.stringify(token));
                                    currentData.push(templArray);

                                    setToken(currentData);
                                }}
                            >Добавить строку</span>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
    )
}

export default React.memo(TemplateTable);