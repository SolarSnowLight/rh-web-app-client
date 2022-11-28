import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import {utils} from "src/utils/utils";
import {commonStyled} from "src/styles/commonStyled";
import Cross2Ic from "src/components/icons/Cross2Ic";



export type ImagePickerRoundProps = JSX.IntrinsicElements['div'] & {
    image?: File|string|null|undefined
    setImage?: ((image:File|null|undefined)=>void) | undefined
}

const ImagePickerRound = React.forwardRef<HTMLDivElement, ImagePickerRoundProps>((
    { image, setImage = ()=>{}, ...props },
    forwardedRef
) => {

    const fileInputRef = useRef<HTMLInputElement>(null)

    const onClick = () => fileInputRef.current?.click()

    const onDelete = () => {
        setImage(undefined)
    }

    const [imageUrl, setImageUrl] = useState(undefined as string|null|undefined)
    useEffect(()=>{
        if (image instanceof File){
            (async()=>{
                const url = await utils.readAsUrl(image)
                setImageUrl(url)
            })()
        } else {
            setImageUrl(image)
        }
    },[image])

    const onFileInput = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        const file = (ev.currentTarget.files??[])[0]
        if (file){
            setImage(file)
        }
    }



    return <Frame ref={forwardedRef as any} {...props}>

        <FileInput ref={fileInputRef} type='file' accept='image/*' onInput={onFileInput}/>

        { image && <Image src={imageUrl??undefined} alt='Profile photo' onClick={onClick}/> }
        { image && <DelBtn onClick={onDelete}/> }

        { !image && <Border/> }
        { !image && <AddBtnBox onClick={onClick}>
            <Label>Добавить фото</Label>
        </AddBtnBox> }

    </Frame>
})
export default React.memo(ImagePickerRound) as unknown as typeof ImagePickerRound



let Frame = styled.div`
  width: 200px; height: 200px;
  display: grid;
  place-items: center;
  grid: 'center';
`
Frame = React.memo(Frame) as unknown as typeof Frame

let FileInput = styled.input`
  display: none;
`
FileInput = React.memo(FileInput) as unknown as typeof FileInput

let Image = styled.img`
  width: 100%; height: 100%;
  grid-area: center;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  cursor: pointer;
`
Image = React.memo(Image) as unknown as typeof Image

let AddBtnBox = styled.div`
  width: 100%; height: 100%;
  grid-area: center;
  ${commonStyled.center};
  cursor: pointer;
`
AddBtnBox = React.memo(AddBtnBox) as unknown as typeof AddBtnBox

let Label = styled.div`
  font: 500 18px var(--font-family-text);
  color: #424041;
`
Label = React.memo(Label) as unknown as typeof Label

let DelBtn = styled(Cross2Ic).attrs({
    mainColor: '#424041',
    size: 20,
})`
  grid-area: center;
  place-self: start end;
  cursor: pointer;
`
DelBtn = React.memo(DelBtn) as unknown as typeof DelBtn

let Border = styled.div`
  width: 100%; height: 100%;
  grid-area: center;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  pointer-events: none;
  
  &::after{
    content: '';
    ${commonStyled.abs};
    margin: -5px;
    border: 6px dashed black;
    border-radius: 50%;
  }
`
Border = React.memo(Border) as unknown as typeof Border


