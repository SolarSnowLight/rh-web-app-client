/* Библиотеки */
import React, { useRef } from "react";
import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

/* Компоненты */
import GalleryHorizontalScrollbar from "src/components/GalleryHorizontalScrollbar/GalleryHorizontalScrollbar";
import Arrow1DownIc from "src/components/icons/Arrow1DownIc";

/* Хуки */
import { useGalleryScrollbar } from "src/hooks/useScrollbar/useGalleryScrollbar";

/* Ресурсы */
import buildingDefault from "src/resources/images/building-default.png";

/* Утилиты */
import { wordUtils } from "src/utils/wordUtils";

/* Стили */
import css from "./ObjcectCard.module.scss";
import { commonStyled } from "src/styles/commonStyled";

/* Типы */
import { empty } from "src/types/empty";

/* Модели */
import { IObjectModel } from "src/models/Object/IObjectModel";
import { getDateLocale } from "src/utils/date";
import { IDataURLModel } from "src/models/Image/IImageModel";

export type IObjectCardProps = {
  object: IObjectModel;
  count_objects?: number;
  logo?: IDataURLModel | empty;
  select: boolean;
  clickHandler: () => {};
  deleteHandler: () => {};
  editHandler: () => {};
};

const ObjectCard = (props: IObjectCardProps) => {
  const object = { ...props.object };
  object.images ??= [{ data_url: buildingDefault}];

  const elementCount = object.images.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [
    scrollProps,
    onContainerScroll,
    setContainerScroll,
    scrollToElementByIndex,
  ] = useGalleryScrollbar(containerRef, contentRef, elementCount);

  return (
		<div
    		className={css.frame}
    		style={{
    			border: props.select ? "blue 2px solid" : "2px solid #424041",
    		}}
    		onClick={(e) => {
    			props.clickHandler();
    		}}
		>
			
			<div className={css.ui}>
				<Tooltip describeChild title="Edit">
        			<Button
						onClick={props.editHandler}
					>
						Изменить
					</Button>
      			</Tooltip>
				<Tooltip title="Delete">
        			<IconButton>
          				<DeleteIcon
							onClick={props.deleteHandler}
						/>
        			</IconButton>
      			</Tooltip>
			</div>
    		<div
    			className={css.imagesFrame}
    			ref={containerRef}
    			onScroll={onContainerScroll}
    		>
				<div 
					className={css.contentContainer} ref={contentRef}>
    				{object.images.map((it) => (
    					<div key={Math.random()} className={css.imageContainer}>
        					<img className={css.imageBgc} src={it.data_url} alt={"Building"} />
        					<div className={css.blur} />
        					<img className={css.image} src={it.data_url} alt={"Building"} />
    					</div>
    				))}
				</div>
      </div>

      <div className={css.controlElementsContainer}>
    		{elementCount >= 2 && (
    			<GalleryHorizontalScrollbar
        			className={css.scroll}
            		scrollProps={scrollProps}
            		setContainerScroll={setContainerScroll}
            		scrollToElementByIndex={scrollToElementByIndex}
          		/>
    		)}
      </div>

    	{props.logo && (
    		<img className={css.logo} src={props.logo.data_url} alt="Builder Logo" />
    	)}

    	<div className={css.name}>{object.title}11</div>
      		{object.date_delivery && (
        		<div className={css.year}>
          			Сдача {getDateLocale(object.date_delivery as string)}
        		</div>
      		)}
      		{props.count_objects && (
        		<div className={css.count}>
          			{props.count_objects} {wordUtils.objectsPlural(props.count_objects)}
        		</div>
      		)}
    	</div>
	);
};

export default React.memo(ObjectCard) as unknown as typeof ObjectCard;
