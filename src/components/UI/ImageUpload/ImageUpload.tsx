/* Библиотеки */
import ImageUploading from "react-images-uploading";
import React, {FC} from 'react';

/* Изображения */
import cross from 'src/resources/images/cross.svg';
import update from 'src/resources/images/update.svg';

/* Стили */
import styles from './ImageUpload.module.scss';
import { IDataURLModel } from "src/models/Image/IImageModel";

import { ImageListType } from "react-images-uploading";

/* Локальные интерфейсы */
interface IImageUploadProps {
    title: string;
    subtitle: string;
    value: ImageListType;
    onChange: (value: ImageListType, addUpdatedIndex?: number[] | undefined) => void;
    multiple: boolean
}

/* Component for uploading images (in one quantity or in many) */
const ImageUpload: FC<IImageUploadProps> = ({
    title = "Изображение *", 
    subtitle = "Загрузить изображение",
    value = [], 
    onChange = (value: ImageListType, addUpdatedIndex?: number[] | undefined) => {},
    multiple = false
}) => {
    return (
        <div>
            <span className='span__text__gray'>{title}</span>
            <div>
                <ImageUploading
                    multiple={multiple}
                    value={value}
                    onChange={onChange}
                    dataURLKey="data_url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        <div className={styles["div-upload_image_wrapper"]}>
                            <button
                                type='button'
                                style={{
                                    display:
                                        (multiple && imageList.length > 0) ? "block"
                                            : ((!multiple) && (imageList.length > 0)) ? "none"
                                                : "block"
                                }}
                                className={styles["upload_image_wrapper"]}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                <span className='span__text__gray'>{subtitle}</span>
                            </button>
                            {imageList.map((image, index) => {
                                return (
                                    <div key={index} className={styles["image-wrapper"]}>
                                        <img
                                            src={image.data_url}
                                            alt=""
                                            className={styles["upload_image"]}
                                        />
                                        <div
                                            style={{
                                                display: 'grid',
                                                gridAutoFlow: 'row',
                                                gap: '0',
                                                height: 'min-content',
                                                marginTop: '0.4em'
                                            }}
                                        >
                                            <img
                                                src={cross}
                                                onClick={() => {
                                                    onImageRemove(index);
                                                }}
                                                width='22em'
                                                height='22em'
                                            />
                                            <img
                                                style={{
                                                    marginTop: '0.4em'
                                                }}
                                                src={update}
                                                onClick={() => {
                                                    onImageUpdate(index);
                                                }}
                                                width='25em'
                                                height='25em'
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </ImageUploading>
            </div>
        </div>
    )
}

export default React.memo(ImageUpload);