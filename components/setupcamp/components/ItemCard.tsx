import styles from "./ItemCard.module.css"

import React, { useState } from 'react'
import { ArgFunction, ItemType } from "@/types"
import TextInput from "@/components/TextInput"
import { useSelector } from "react-redux"
import { RootState } from "@/services/redux/store"
type Props = {
    item: ItemType
    index: number
    deleteItem: ArgFunction
    changeItemAmount: ArgFunction
    changeDiagramStyleItem: ArgFunction
}
const ItemCard = (props: Props) => {
    const {
        item,
        index,
        deleteItem,
        changeItemAmount,
        changeDiagramStyleItem,
    } = props
    const ITEMSTYLES = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.itemStyles)
    const [editMode, setEditMode] = useState(false)
    if (!item) return null;
    return (
        <div className={styles.itemCard}>
            <button
                type="button"
                className={styles.itemDeleteButtom}
                onClick={() => deleteItem(item.id)}>X</button>
            {
                editMode ? (
                    <React.Fragment>
                        <div className={styles.darkBackground} onClick={() => setEditMode(false)} />
                        <div
                            className={styles.itemStyleOptionsContainer}
                            onClick={() => setEditMode(false)}

                        >
                            {
                                ITEMSTYLES?.map((itemStyle, idx) => {
                                    const currentItem = itemStyle.id === item.id
                                    return (
                                        <button
                                            key={idx}
                                            className={styles.itemStyleOption}
                                            style={{ width: "90%", color: currentItem ? "#000" : "#999" }}
                                            onClick={() => {
                                                changeDiagramStyleItem(itemStyle, index);
                                                setEditMode(false)
                                            }}
                                            type="button"
                                        >
                                            {itemStyle.name} {currentItem ? "▴" : ""}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </React.Fragment>
                ) : (
                    <button
                        type="button" className={styles.selectItemButton} onClick={(e) => { e.stopPropagation(); setEditMode(true) }}>
                        {item?.name} ▾
                    </button>
                )
            }
            <div className="row" style={{ margin: 7 }}>
                <div >
                    <TextInput
                        containerClassName={styles.itemCapacityInputContainer}
                        inputClassName={styles.itemCapacityInput}
                        value={item.amount}
                        setValue={(e) => { e.stopPropagation(); changeItemAmount(Number(e.target.value), item) }}
                    />
                </div>
                <button
                    type="button"
                    disabled={item.amount <= 1}
                    onClick={() => changeItemAmount(item.amount - 1, item)}
                    className={[item.amount <= 1 && "disabled", styles.capacityPlus].join(" ")}>-</button>
                <button
                    type="button"
                    onClick={() => changeItemAmount(item.amount + 1, item)}
                    className={styles.capacityPlus}>+</button>
            </div>
        </div>
    )
}

export default ItemCard