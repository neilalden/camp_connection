import { addCampArea, setCampAreas } from "@/services/redux/slice/retreatcenter"
import { RootState } from "@/services/redux/store"
import { IDGenerator } from "@/utils/functions"
import { useDispatch, useSelector } from "react-redux"
import styles from "./HousingSetup.module.css"
import { CampAreaType } from "@/types"
import CampAreaCard from "./CampAreaCard"

const RVAndTentSetup = () => {
    const dispatch = useDispatch()
    const CAMPAREAS = useSelector((state: RootState) => state.RetreatCenter.retreatCenter.housing.campAreas)
    return (
        <div className={styles.setUpContainer}>
            {
                CAMPAREAS && CAMPAREAS.map((campArea, i) => {
                    const deleteCampArea = (e: any) => {
                        e.stopPropagation();
                        const newCampAreas: Array<CampAreaType> = [...CAMPAREAS ?? []]
                        newCampAreas.splice(i, 1)
                        dispatch(setCampAreas(newCampAreas))
                    }
                    return (
                        <CampAreaCard key={i} campArea={campArea} deleteCampArea={deleteCampArea} />
                    )
                })
            }
            <button
                type="button"
                className={styles.addHousingButton}
                onClick={() => {
                    dispatch(addCampArea({
                        id: IDGenerator(),
                        name: ``,
                        type: "Housing",
                        spaces: []
                    }))
                }}
            >
                +
            </button>
        </div>
    )
}

export default RVAndTentSetup