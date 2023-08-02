import { addHouse } from "@/services/redux/slice/retreatcenter"
import { RootState } from "@/services/redux/store"
import { IDGenerator } from "@/utils/functions"
import { useDispatch, useSelector } from "react-redux"
import styles from "./HousingSetup.module.css"
import BuildingCard from "./BuildingCard"
const HousingSetup = () => {
    const dispatch = useDispatch()
    const BUILDINGS = useSelector((state: RootState) => state.RetreatCenter.retreatCenter.housing.buildings)
    return (
        <div className={styles.setUpContainer}>
            {
                BUILDINGS && BUILDINGS.map((building, i) => {
                    return (
                        <BuildingCard key={i} building={building} />
                    )
                })
            }
            <button
                className={styles.addHousingButton}
                onClick={() => {
                    dispatch(addHouse({
                        id: IDGenerator(),
                        name: ``,
                        type: "Housing",
                        rooms: []
                    }))
                }}
            >
                +
            </button>
        </div>
    )
}

export default HousingSetup