import TextInput from "@/components/TextInput";
import { addItemStyle, setItemStyles } from "@/services/redux/slice/retreatcenters";
import { RootState } from "@/services/redux/store";
import { ItemType, RetreatCenterType } from "@/types";
import { ItemGenerator, IDGenerator } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ItemsSetupComponent.module.css"
const ItemsSetup = () => {
    const dispatch = useDispatch();
    const ITEMSTYLES = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.itemStyles)
    const changeAmount = (value: string, itemId: ItemType["id"]) => {
        if (isNaN(Number(value))) return
        if (!ITEMSTYLES) return;
        const newItems: Array<ItemType> = [...ITEMSTYLES].map((item) => {
            if (item.id === itemId) return { ...item, amount: Number(value) }
            return item
        })
        dispatch(setItemStyles(newItems))
    }
    const changeName = (value: string, itemId: ItemType["id"]) => {
        if (!ITEMSTYLES) return;
        const newItems: Array<ItemType> = [...ITEMSTYLES].map((item) => {
            if (item.id === itemId) return { ...item, name: (value) }
            return item
        })
        dispatch(setItemStyles(newItems))
    }
    return (
        <div className={styles.setUpContainer}>
            <div className={styles.itemCardContainer}>
                {
                    ITEMSTYLES && ITEMSTYLES.map((item, i) => {
                        return (
                            <div key={i} className={styles.itemCard}>
                                <button
                                    type="button"
                                    className={styles.itemDeleteButtom}
                                    onClick={() => {
                                        if (!Array.isArray(ITEMSTYLES)) return;
                                        let newPricing: RetreatCenterType["itemStyles"] = [...ITEMSTYLES]
                                        newPricing.splice(i, 1);
                                        dispatch(setItemStyles(newPricing))
                                    }}>X</button>
                                <TextInput
                                    containerClassName={styles.meetingRoomCardNameInputContainer}
                                    inputClassName={styles.meetingRoomCardNameInput}
                                    placeholder={ItemGenerator()}
                                    value={item.name}
                                    setValue={e => changeName(e.target.value, item.id)}
                                />
                                <TextInput
                                    containerClassName={styles.meetingRoomCardCapacityInputContainer}
                                    inputClassName={styles.meetingRoomCardCapacityInput}
                                    labelClassName={styles.capacityLabelClassName}
                                    label="Amount"
                                    value={item.amount}
                                    setValue={(e) => changeAmount(e.target.value, item.id)}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <button
                className={styles.addItemsButton}
                onClick={
                    () => dispatch(addItemStyle({
                        id: IDGenerator(),
                        name: ItemGenerator(),
                        amount: 10
                    }))
                }
            >
                +
            </button>
        </div>
    )
}

export default ItemsSetup;