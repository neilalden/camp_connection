import Images from '@/common/images'
import FileUpload from '@/components/FileUpload'
import TextInput from '@/components/TextInput'
import { setDiagramStyleItems, setDiagramStyles } from '@/services/redux/slice/retreatcenters'
import { setUserPhoto } from '@/services/redux/slice/user'
import { RootState } from '@/services/redux/store'
import { DiagramType, ItemType, RetreatCenterType } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./DiagramCard.module.css"
import ItemCard from './ItemCard'
type Props = {
    diagram: DiagramType;
    index: number
}
const DiagramCard = (props: Props) => {
    const {
        diagram,
        index,
    } = props
    const dispatch = useDispatch()
    const DIAGRAMSTYLES = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.diagramStyles)
    const ITEMSTYLES = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.itemStyles)
    const [diagramPhoto, setDiagramPhoto] = useState<string | undefined>(diagram.photo)
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (diagram.photo) setDiagramPhoto(diagram.photo)
    }, [diagram])

    const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0 && DIAGRAMSTYLES) {
            const selectedFile = e.target.files[0];
            const imageUrl = URL.createObjectURL(selectedFile);
            const newDiagramStyles = [...DIAGRAMSTYLES].map((ds) => {
                if (ds.id === diagram.id) {
                    return {
                        ...diagram,
                        photo: imageUrl
                    }
                }
                return ds
            })
            dispatch(setDiagramStyles(newDiagramStyles));
        }
    };

    const changeDiagramName = (name: string, diagramId: string) => {
        if (!DIAGRAMSTYLES) return;
        const newDiagrams = [...DIAGRAMSTYLES].map((dg) => {
            if (dg.id === diagramId) return { ...dg, name }
            return dg
        })
        dispatch(setDiagramStyles(newDiagrams))
    }
    const addDiagramItem = () => {
        if (!DIAGRAMSTYLES || !ITEMSTYLES) return;
        const newDiagramStyles = [...DIAGRAMSTYLES].map((ds) => {
            if (ds.id === diagram.id) {
                return {
                    ...diagram,
                    items: diagram.items ? [...diagram.items, ITEMSTYLES[0]] : [ITEMSTYLES[0]]
                }
            }
            return ds
        })
        dispatch(setDiagramStyles(newDiagramStyles));
    }

    const changeItemAmount = (value: number, item: ItemType) => {
        if (isNaN(value)) return;
        if (value < 1) return;
        const newItems = diagram.items?.map((itm) => {
            if (itm.id === item.id) {
                return {
                    ...itm,
                    amount: value
                }
            }
            return itm
        })
        dispatch(
            setDiagramStyleItems({
                diagramStyleID: diagram.id,
                items: newItems
            }))
    }
    const deleteItem = (itemId: ItemType["id"]) => {
        const newItems = diagram.items?.filter(item => item.id !== itemId)
        dispatch(
            setDiagramStyleItems({
                diagramStyleID: diagram.id,
                items: newItems
            }))
    }
    const changeDiagramStyleItem = (item: ItemType, index: number) => {
        if (!diagram.items) return;
        const newItems = [...diagram.items]
        newItems.splice(index, 1, item)
        dispatch(
            setDiagramStyleItems({
                diagramStyleID: diagram.id,
                items: newItems
            }))
    }
    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={styles.diagramCard}>
            <div className={styles.diagram}>
                <div className="row">
                    <button
                        type="button"
                        className={styles.itemDeleteButtom}
                        onClick={() => {
                            if (!Array.isArray(DIAGRAMSTYLES)) return;
                            let newDiagramStyles: RetreatCenterType["diagramStyles"] = [...DIAGRAMSTYLES]
                            newDiagramStyles.splice(index, 1);
                            dispatch(setDiagramStyles(newDiagramStyles))
                        }}>X</button>
                    <TextInput
                        containerClassName={styles.diagramNameInputContainer}
                        inputClassName={styles.diagramNameInput}
                        placeholder={`Diagram ${index + 1}`}
                        value={diagram.name}
                        setValue={(e) => changeDiagramName(e.target.value, diagram.id)}
                    />
                </div>
                {
                    !diagramPhoto ?
                        <FileUpload
                            label={"Upload Diagram"}
                            accept={"image/*"}
                            onChange={handleChangePhoto}
                        />
                        : null
                }
                {
                    diagramPhoto ? (
                        <div className={styles.logoContainer}>
                            <Image
                                alt="Diagram"
                                src={diagramPhoto}
                                className={styles.diagramPhoto}
                                height={200}
                                width={200}
                                onError={() => setDiagramPhoto(undefined)}
                            />
                            <div className={styles.overlay} onClick={handleEditClick}></div>
                            <p className={styles.editText}>Edit</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleChangePhoto}
                                ref={fileInputRef}
                                style={{ display: "none" }}
                            />
                        </div>
                    ) : null
                }
            </div>
            <div className={styles.diagram}>
                <h3>Items</h3>
                <button
                    className={styles.addButton}
                    onClick={addDiagramItem}
                >
                    +
                </button>

                <div className={styles.itemsContainer}>
                    {
                        diagram?.items && diagram.items?.map((item, i) => {
                            return (
                                <ItemCard
                                    key={i}
                                    item={item}
                                    index={i}
                                    deleteItem={deleteItem}
                                    changeItemAmount={changeItemAmount}
                                    changeDiagramStyleItem={changeDiagramStyleItem}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default DiagramCard