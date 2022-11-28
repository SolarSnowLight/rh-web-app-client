import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import {utils} from "src/utils/utils";
import ButtonGreen2 from "src/components/UI-Styled/Button/ButtonGreen2/ButtonGreen2";



export type ImagePickerProps = JSX.IntrinsicElements['div'] & {
    image?: File|string|undefined
    setImage?: ((image:File|undefined)=>void) | undefined
}

const ImagePicker = React.forwardRef<HTMLDivElement, ImagePickerProps>((
    { image, setImage = ()=>{}, ...props },
    forwardedRef
) => {

    const fileInputRef = useRef<HTMLInputElement>(null)

    const onClick = () => fileInputRef.current?.click()

    const onDelete = (ev: React.MouseEvent) => {
        ev.stopPropagation()
        setImage(undefined)
    }

    const [imageUrl, setImageUrl] = useState(undefined as undefined|string)
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

    return <Frame ref={forwardedRef as any} {...props} onClick={onClick}>
        {/*<Border borderRadius={4} borderColor={'#1F8DCD'} borderWidth={2} strokeDasharray='8,8' cornerSize={8}/>*/}
        <Border />
        { !image
            ? <Label>Добавить фото</Label>
            : <>
                <Image imageUrl={imageUrl}/>
                <ButtonBox>
                    <Button1 onClick={onDelete}>Удалить</Button1>
                </ButtonBox>
              </>
        }
        <FileInput ref={fileInputRef} type='file' accept='image/*' onInput={onFileInput}/>
    </Frame>
})
export default React.memo(ImagePicker) as typeof ImagePicker



let Frame = styled.div`
  width: 400px; height: 295px;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  display: grid;
  place-items: center;
`
Frame = React.memo(Frame) as unknown as typeof Frame

let Border = styled.div`
  position: absolute; top: 0; right: 0; bottom: 0; left: 0;
  pointer-events: none;
  border: 2px dashed black;
  border-radius: 0px;
`
Border = React.memo(Border) as unknown as typeof Border

let Label = styled.div`
  font: 500 18px var(--font-family-text);
  color: #424041;
`
Label = React.memo(Label) as unknown as typeof Label

let FileInput = styled.input`
  display: none;
`
FileInput = React.memo(FileInput) as unknown as typeof FileInput



let Image = styled.div<{ imageUrl?: string|undefined }>`
  place-self: stretch;
  margin: 10px 16px;
  background-image: url("${p=>p.imageUrl+''}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`
Image = React.memo(Image) as unknown as typeof Image


let ButtonBox = styled.div`
  position: absolute; top: 0; right: 0; bottom: 0; left: 0;
  padding: 18px 22px;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  justify-content: flex-end;
`
ButtonBox = React.memo(ButtonBox) as unknown as typeof ButtonBox


let Button1 = styled(ButtonGreen2)`
  &.MuiButtonBase-root {
    width: 100px; height: 30px;
  }
`
Button1 = React.memo(Button1) as unknown as typeof Button1

