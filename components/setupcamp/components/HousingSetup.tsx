import { addBuilding, setBuildings } from "@/services/redux/slice/retreatcenters"
import { RootState } from "@/services/redux/store"
import { IDGenerator } from "@/utils/functions"
import { useDispatch, useSelector } from "react-redux"
import styles from "./HousingSetup.module.css"
import BuildingCard from "./BuildingCard"
import { BuildingType } from "@/types"
const HousingSetup = () => {
    const dispatch = useDispatch()
    const BUILDINGS = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.housing.buildings)

    return (
        <div className={styles.setUpContainer}>
            {
                BUILDINGS && BUILDINGS.map((building, i) => {
                    const deleteBuilding = (e: any) => {
                        e.stopPropagation();
                        const newBuildings: Array<BuildingType> = [...BUILDINGS ?? []]
                        newBuildings.splice(i, 1)
                        dispatch(setBuildings(newBuildings))
                    }
                    return (
                        <BuildingCard key={i} building={building} deleteBuilding={deleteBuilding} />
                    )
                })
            }
            <button
                type="button"
                className={styles.addHousingButton}
                onClick={() => {
                    dispatch(addBuilding({
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