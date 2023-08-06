import TextInput from "@/components/TextInput";
import { addItemStyle, setItemStyles } from "@/services/redux/slice/retreatcenters";
import { RootState } from "@/services/redux/store";
import { RetreatCenterType } from "@/types";
import { ItemGenerator, IDGenerator } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ItemsSetupComponent.module.css"
const ItemsSetup = () => {
    const dispatch = useDispatch();
    const ITEMSTYLES = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.itemStyles)
    const changeValue = (value: string, meetingRoomId: string) => {
        if (isNaN(Number(value))) return
        if (!ITEMSTYLES) return;
        const newItems = [...ITEMSTYLES].map((item) => {
            if (item.id === meetingRoomId) return { ...item, capacity: Number(value) }
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
                                    setValue={e => {
                                    }}
                                />
                                <TextInput
                                    containerClassName={styles.meetingRoomCardCapacityInputContainer}
                                    inputClassName={styles.meetingRoomCardCapacityInput}
                                    labelClassName={styles.capacityLabelClassName}
                                    label="Amount"
                                    value={item.amount}
                                    setValue={(e) => changeValue(e.target.value, item.id)}
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