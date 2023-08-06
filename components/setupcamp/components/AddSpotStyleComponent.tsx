import Colors from "@/common/colors"
import Divider from "@/components/Divider"
import TextInput from "@/components/TextInput"
import { addSpotStyle, setSpotStyles } from "@/services/redux/slice/retreatcenters"
import { RootState } from "@/services/redux/store"
import { SpotType, SetStateType, } from "@/types"
import { IDGenerator } from "@/utils/functions"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./AddSpotStyleComponent.module.css"
type Props = {
    SpotStyle?: SpotType
    setIsVisible?: SetStateType<boolean>
}
const AddSpotStyleComponent = ({ SpotStyle, setIsVisible }: Props) => {
    const dispatch = useDispatch()
    const BEDSTYLES = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.spotStyles)
    const [spotstyle, setSpotstyle] = useState<SpotType>(SpotStyle ?? {
        id: IDGenerator(),
        name: "",
        capacity: 1,
        amount: 1,
        pricing: {
            nights: "*",
            price: 100
        }

    })


    const updateSpot = () => {
        const newSpotStyles = BEDSTYLES?.map((bs) => bs.id === spotstyle.id ? spotstyle : bs)
        dispatch(setSpotStyles(newSpotStyles))
    }
    return (
        <form style={{ justifyContent: "center", minHeight: "200px", }} className='col-center'>
            <div className="row-center">
                <TextInput
                    value={spotstyle.name}
                    placeholder='Spot style name...'
                    setValue={e => setSpotstyle(prev => ({ ...prev, name: e.target.value }))}
                    containerStyle={{ width: "300px", marginTop: "20.5px" }}
                />
                <TextInput
                    type='number'
                    label='Sleeps'
                    bottomLabel='Each'
                    inputStyle={capacityInputStyle}
                    containerStyle={capacityContainerStyle}
                    labelStyle={{ fontSize: "10px" }}
                    value={spotstyle.capacity}
                    setValue={e => setSpotstyle(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                />
            </div>
            <Divider style={{ width: "100%", margin: "10px" }} />
            <h4 style={{ marginBottom: "10px" }}>Pricing</h4>
            <div
                style={Array.isArray(spotstyle.pricing) ? pricingContainerStyle : {}}
            >
                {
                    Array.isArray(spotstyle.pricing) ? spotstyle.pricing.map((price, i) => {
                        return (
                            <div
                                key={i}
                                className='row'
                                style={{ margin: "10px" }}
                            >
                                <button
                                    type="button"
                                    style={deleteButtonStyle}
                                    onClick={() => {
                                        if (!Array.isArray(spotstyle.pricing)) return;
                                        let newPricing: SpotType["pricing"] = [...spotstyle.pricing]
                                        newPricing.splice(i, 1);
                                        if (newPricing.length > 1) newPricing = newPricing.map((p, ix) => ({ ...p, nights: ix + 1 }))
                                        else newPricing = {
                                            nights: "*",
                                            price: newPricing[0]["price"]
                                        }
                                        setSpotstyle(prev => ({
                                            ...prev,
                                            pricing: newPricing
                                        }))
                                    }}>X</button>
                                <TextInput
                                    containerClassName="row-reverse no-wrap"
                                    label={`$  per ${i + 1} night`}
                                    inputStyle={capacityInputStyle}
                                    containerStyle={priceContainerStyle}
                                    labelStyle={priceLabelStyle}
                                    value={price.price}
                                    setValue={(e) => {
                                        const value = Number(e.target.value);
                                        if (isNaN(value)) return alert("Price is not a number")
                                        if (!Array.isArray(spotstyle.pricing)) return;
                                        const newPrice = spotstyle.pricing.map(pr => pr.nights === price.nights ? { ...price, price: value } : pr)
                                        setSpotstyle(prev => ({
                                            ...prev,
                                            pricing: newPrice
                                        }))
                                    }}
                                />
                            </div>
                        )
                    }) : (
                        <div
                            className='row-between'
                            style={{ margin: "10px", width: "100%" }}
                        >
                            <TextInput
                                inputStyle={capacityInputStyle}
                                containerStyle={priceContainerStyle}
                                labelStyle={priceLabelStyle}
                                containerClassName="row-reverse no-wrap"
                                label={`$ per night`}
                                value={spotstyle.pricing.price}
                                setValue={(e) => {
                                    const value = Number(e.target.value);
                                    if (isNaN(value)) return alert("Price is not a number")
                                    setSpotstyle(prev => ({
                                        ...prev,
                                        pricing: {
                                            nights: "*",
                                            price: value
                                        }
                                    }))
                                }}
                            />
                            <button
                                type='button'
                                className={styles.buttonHover}
                                style={addButtonStyle}
                                onClick={() => {
                                    setSpotstyle(prev => ({
                                        ...prev,
                                        pricing: Array.isArray(prev.pricing) ?
                                            [...prev.pricing, { nights: prev.pricing.length + 1, price: 100 }]
                                            : [{ ...prev.pricing, nights: 1 }, { nights: 2, price: 100 }]
                                    }))
                                }}>
                                +
                            </button>
                        </div>
                    )

                }
                {Array.isArray(spotstyle.pricing) ?
                    <button
                        type='button'
                        className={styles.buttonHover}
                        style={addButtonStyle}
                        onClick={() => {
                            setSpotstyle(prev => ({
                                ...prev,
                                pricing: Array.isArray(prev.pricing) ?
                                    [...prev.pricing, { nights: prev.pricing.length + 1, price: 100 }]
                                    : [{ ...prev.pricing, nights: 1 }, { nights: 2, price: 100 }]
                            }))
                        }}>
                        +
                    </button> : null}
            </div>

            <div className="row-between" style={{ width: "300px", marginTop: "20px" }}>
                {
                    SpotStyle ?
                        <button
                            type="button"
                            style={deleteSpotStyleStyle}
                            onClick={() => {
                                if (!BEDSTYLES) return;
                                const confirmed = confirm("Are you sure you want to delete this spot?");
                                if (confirmed) dispatch(setSpotStyles([...BEDSTYLES].filter(bs => bs.id !== SpotStyle?.id)))
                                if (setIsVisible) setIsVisible(false)
                            }}>
                            Delete Spot Style
                        </button>
                        : null
                }

                <button
                    type="button"
                    style={saveSpotStyleStyle}
                    onClick={() => {
                        if (SpotStyle) updateSpot()
                        else dispatch(addSpotStyle(spotstyle))
                        if (setIsVisible) setIsVisible(false)
                    }}>
                    Save Spot Style
                </button>
            </div>
        </form>
    )
}

export default AddSpotStyleComponent;

const capacityInputStyle: React.CSSProperties = {
    border: "1px solid #E0E7EB",
    textAlign: "center",
    marginBottom: "5px",
}
const capacityContainerStyle: React.CSSProperties = {
    textAlign: "center",
    width: "50px",
}
const priceContainerStyle: React.CSSProperties = {
    textAlign: "center",
    width: "150px",
}
const deleteButtonStyle: React.CSSProperties = {
    color: "red",
    fontSize: "10px",
    fontWeight: "900 !important",
    width: "20px",
}
const priceLabelStyle: React.CSSProperties = {
    fontSize: "10px",
    marginTop: "7px",
    marginLeft: "7px"
}
const addButtonStyle: React.CSSProperties = {
    borderColor: Colors.cascade200,
    borderWidth: "1px",
    borderStyle: "solid",
    width: "90px",
    height: "24px",
    color: Colors.cascade500,
    fontSize: 12,
    fontWeight: 900,
    textAlign: "center",
    alignSelf: "center",
    justifySelf: "center",
    margin: "auto",
}
const saveSpotStyleStyle: React.CSSProperties = {
    background: Colors.blue500,
    borderRadius: 5,
    padding: "5px 10px",
    color: Colors.white,
    fontSize: 12,
    alignSelf: "center",
    justifySelf: "center",
    margin: "auto",
}
const deleteSpotStyleStyle: React.CSSProperties = {
    background: Colors.transparent,
    borderRadius: 5,
    borderColor: Colors.red500,
    borderWidth: "1px",
    borderStyle: "solid",
    padding: "5px 10px",
    color: Colors.red500,
    fontSize: 12,
    alignSelf: "center",
    justifySelf: "center",
    margin: "auto",

}
const pricingContainerStyle: React.CSSProperties = {
    maxWidth: "400px",
    display: "flex",
    flexDirection: "row",
    flexFlow: "wrap",
    justifyContent: "space-between",
}