/* Библиотеки */
import React, { useState, useEffect, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useFormState, useForm } from 'react-hook-form';
import { useMediaQuery } from '@mui/material';

/* Контекст */
import projectAction from 'src/store/actions/ProjectAction';
import companyAction from 'src/store/actions/CompanyAction';
import { authSlice } from 'src/store/reducers/AuthSlice';
import messageQueueAction from 'src/store/actions/MessageQueueAction';

/* Компоненты */
import MapComponent from 'src/components/Map/MapComponent';
import ButtonGreenComponent from 'src/components/UI/Button/ButtonGreenComponent';
import ButtonWhiteComponent from 'src/components/UI/Button/ButtonWhiteComponent';
import ImageUpload from 'src/components/UI/ImageUpload';
import TextFieldControl from 'src/components/UI/TextField/TextFieldControl';
import ObjectCard from 'src/components/Project/ObjectCard';
import AutocompleteControl from 'src/components/UI/Autocomplete/AutocompleteControl';
import HorizontalScrollbar from 'src/components/HorizontalScrollbar/HorizontalScrollbar';
import Space from 'src/components/Space';
import MapObject from 'src/components/Map/MapObject';

/* Хуки */
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import useHttp from 'src/hooks/http.hook';
import { useScrollbar } from 'src/components/HorizontalScrollbar/useScrollbar';

/* Утилиты */
import { dataURLToBlob, isDataURL } from 'src/utils/file';

/* Константы */
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';
import CompanyApi from 'src/constants/addresses/apis/company.api';
import AdminApi from 'src/constants/addresses/apis/admin.api';

/* Стили */
import styles from './CreateProjectPage.module.scss';

/* Ресурсы */
import avaDefault from 'src/resources/images/ava-default.jpg'
import logoDefault from 'src/resources/images/company-logo-default.png'
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


const projectInfo = {
    logo: logoDefault,
    name: 'Название проекта',
    builder: {
        name: 'Имя застройщика'
    },
    description: 'Группа Аквилон - одна из ведущих девелоперских компаний, предоставляющих полный спектр услуг на рынке недвижимости, создана в Архангельске 13 октября 2003 года, более 18 лет на рынке.\n' +
        'Входит в ТОП-20 крупнейших застройщиков страны, в 10-ку крупнейших застройщиков Санкт-Петербурга.\n' +
        'Группа Аквилон признана системообразующим предприятием России. \n' +
        'География присутствия: Москва, Санкт-Петербург, Ленинградская область, Архангельск, Северодвинск.'
}

const managers = [...Array(7).keys()].map(i => ({
    id: i + '',
    ava: avaDefault,
    fio: 'Иванов Иван Иванович',
    projectsCnt: 2,
    objectCnt: 12,
}))

const objects = [...Array(6).keys()].map(i => ({
    id: i + '',
    builderLogo: logoDefault,
    images: [buildingExample1, buildingExample2, buildingExample3],
    objectName: 'Название объекта',
    year: 2025,
    objectCnt: i + 1,
}))
objects[0].images = [buildingExample1, buildingExample2, buildingExample3, homePage, imagePlaceholder, mainPageBgc, neonSunrise, retrowave1, hotlineMiami2, needMoreAcidMarkII, retrowave2]


/**
 * Страница создания нового проекта
 * @returns { JSX.Element }
 */
const CreateProjectPage = () => {
    // Основные состояния компонента
    const authSelector = useAppSelector((state) => state.authReducer);
    const userSelector = useAppSelector((state) => state.userReducer);
    const projectSelector = useAppSelector((state) => state.projectReducer);
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();
    const { loading, request, error, clearError } = useHttp();
    const message = useMessageToastify();
    const objectsContainerRef = useRef(null);
    const objectsContentRef = useRef(null);
    const { scrollProps, onContainerScroll, setContainerScroll, canScroll } = useScrollbar(objectsContainerRef, objectsContentRef);

    // The data section presented on the page
    const [btnDisabled, setBtnDisabled] = useState(true);

    // Data section of functional operation of components
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loadingAutocomplete = open && options?.length === 0;

    const { handleSubmit, control } = useForm();

    const { errors } = useFormState({
        control
    });

    useEffect(() => {
        dispatch(messageQueueAction.addMessage(null, "error", error));
        clearError();
    }, [error, message, clearError]);

    // Event Handlers Section
    const onChangeImage = (imageList, addUpdateIndex) => {
        if (imageList.length > 0) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }

        const file = imageList.map((item) => {
            return {
                data_url: item.data_url
            }
        });


        dispatch(projectAction.setItemProjectInfo("logo", file));
    };

    const changeHandler = (key, value) => {
        dispatch(projectAction.setItemProjectInfo(key, value));
    };

    const onSubmit = () => {
        if (projectSelector.logo.length <= 0) {
            dispatch(messageQueueAction.addMessage(null, "error", "Необходимо добавить логотип проекта!"));
            return;
        }

        let file = projectSelector.logo[0];

        if ((file)
            && (Object.keys(file).length >= 1)
            && (Object.getPrototypeOf(file) === Object.prototype)
            && (!isDataURL(file.data_url))) {
            file = dataURLToBlob(projectSelector.logo[0].data_url);
        } else {
            file = null;
        }

        dispatch(companyAction.createProject(
            {
                title: projectSelector.title,
                description: projectSelector.description,
                managers: projectSelector.managers,
                uuid: userSelector.company?.uuid
            },
            file
        ));
    };

    useEffect(() => {
        let active = true;

        if (!loadingAutocomplete) {
            return undefined;
        }

        (async () => {
            const response = await request(AdminApi.get_all_users, 'POST');

            if (active && response.users) {
                setOptions(response.users);
            }
        })();

        return () => {
            active = false;
        };
    }, [loadingAutocomplete]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    // Navigation functions section
    const navigate = useNavigate();
    const toCreateObject = () => {
        window.scrollTo(0, 0);
        navigate(
            (BuilderAdminRoute.builder_admin + "/" + BuilderAdminRoute.project_add_object),
            {
                state: {
                    title: projectSelector.title,
                    description: projectSelector.description,
                    logo: projectSelector.logo
                }
            }
        );
    };

    // Индекс выбранного проекта в данный момент времени
    const [selectIndex, setSelectIndex] = useState(-1);
    const setIndex = (index) => {
        if (selectIndex === index) {
            setSelectIndex(-1);
        } else {
            setSelectIndex(index);
            setContainerScroll(index * (projectSelector.objects.length + 400));
        }
    };

    return (
        <>
            <form className={styles["wrapper-section"]} onSubmit={handleSubmit(onSubmit)}>

                { /* Обёртка элементов создания проекта */}
                <div className={styles["wrapper-section__item"]}>

                    { /* Заголовок создание проекта */}
                    <div className={styles["wrapper-section__item-element__column"]}>
                        <span className='span__text__black-h3'>Создание проекта</span>
                    </div>

                    { /* Секция основных элементов ввода */}
                    <div className={styles["wrapper-section__item-element__column"]}>
                        <div className={styles["item-element__column"]}>
                            <ImageUpload
                                value={projectSelector.logo}
                                onChange={onChangeImage}
                            />
                            <TextFieldControl
                                title={"Название *"}
                                required={true}
                                control={control}
                                errors={errors}
                                name={"title"}
                                defaultValue={projectSelector.title}
                                placeholder={"Введите название компании"}
                                changeHandler={changeHandler}
                            />
                            <AutocompleteControl
                                multiple={true}
                                title={"Менеджеры компании"}
                                control={control}
                                errors={errors}
                                name={"managers"}
                                optionName={"email"}
                                defaultValue={projectSelector?.managers}
                                changeHandler={changeHandler}
                                getOptionLabel={(option) => option.email}
                                isOptionEqualToValue={(option, value) => option.email === value.email}
                                options={options}
                                loading={loadingAutocomplete}
                                open={open}
                                onOpen={() => {
                                    setOpen(true);
                                }}
                                onClose={() => {
                                    setOpen(false);
                                }}
                            />
                        </div>
                        <div className={styles["item-element__column"]}>
                            <TextFieldControl
                                title={"Описание"}
                                control={control}
                                errors={errors}
                                name={"description"}
                                defaultValue={projectSelector.description}
                                multiline={true}
                                rows={9}
                                placeholder={"Описание"}
                                changeHandler={changeHandler}
                                styleContainer={{
                                    height: '18em'
                                }}
                            />
                        </div>
                    </div>
                </div>

                { /* Секция компонента карты */}
                <div className={styles["wrapper-section__item__map"]}>

                    { /* Элементы управления */}
                    <div className={styles["wrapper-section__item__map-element"]}>
                        <div className={styles["grid-item__left"]}>
                            <span className='span__text__black-h4'>Объекты проекта на карте</span>
                        </div>
                        <div className={styles["grid-item__right"]}>
                            <ButtonWhiteComponent clickHandler={toCreateObject} title="Добавить объект" />
                        </div>
                    </div>

                    { /* Компонент карты */}
                    <div className={styles["wrapper-section__item-element__map"]}>
                        <MapObject
                            objects={projectSelector.objects}
                            selectObject={selectIndex}
                            setIndex={setIndex}
                        />
                    </div>
                </div>

                { /* Секция карточек объектов проекта */}
                <div className={styles["wrapper-section__item__map"]}>
                    { /* Объекты */}
                    <div ref={objectsContainerRef} className={styles.objectsListSlide} onScroll={onContainerScroll}>
                        <div ref={objectsContentRef} className={styles.contentContainer}>
                            {projectSelector.objects.map((it, index) => {
                                return (
                                    <ObjectCard
                                        key={it.id}
                                        object={it}
                                        logo={projectSelector.logo[0]}
                                        select={(index == selectIndex) ? true : false}
                                        clickHandler={() => {
                                            setIndex(index);
                                        }}
                                        deleteHandler={() => {
                                            dispatch(projectAction.deleteObjectInfo(it));
                                        }}
                                        editHandler={() => {
                                            window.scrollTo(0, 0);
                                            navigate(
                                                (BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.project_edit_object),
                                                {
                                                    state: {
                                                        object: {
                                                            ...it
                                                        },
                                                        project: {
                                                            title: projectSelector.title,
                                                            description: projectSelector.description,
                                                            logo: projectSelector.logo
                                                        }
                                                    }
                                                }
                                            );
                                        }}
                                    />
                                )
                            })}
                        </div>
                    </div>

                    <Space h={8} />

                    { /* Горизонтальный скроллбар */}
                    <div className={styles.scrollbarContainer}>
                        <HorizontalScrollbar className={styles.scroll} scrollProps={scrollProps} setContainerScroll={setContainerScroll} />
                    </div>
                </div>

                <div className={styles["wrapper-section__item__map"]}>
                    <div className={styles["wrapper-section__item__map-element"]}>
                        <div className={styles["grid-item__left"]}></div>
                        <div className={styles["grid-item__right"]}>
                            <ButtonGreenComponent
                                type="submit"
                                title="Создать проект"
                            />
                        </div>
                    </div>
                </div>
            </form>
            <Space h='4em' />
        </>
    )
}

export default React.memo(CreateProjectPage);