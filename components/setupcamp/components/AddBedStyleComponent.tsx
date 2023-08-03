import Colors from "@/common/colors"
import Divider from "@/components/Divider"
import TextInput from "@/components/TextInput"
import { setBedPrice, addBedStyle, setBedStyles, setBedStyle } from "@/services/redux/slice/retreatcenter"
import { RootState } from "@/services/redux/store"
import { BedType, SetStateType, SpotType } from "@/types"
import { IDGenerator } from "@/utils/functions"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./AddBedStyleComponent.module.css"
type Props = {
    BedStyle?: BedType | SpotType
    setIsVisible?: SetStateType<boolean>
}
const AddBedStyleComponent = ({ BedStyle, setIsVisible }: Props) => {
    const dispatch = useDispatch()
    const BEDSTYLES = useSelector((state: RootState) => state.RetreatCenter.retreatCenter.bedStyles)
    const [bedstyle, setBedstyle] = useState<BedType>(BedStyle ?? {
        id: IDGenerator(),
        name: "",
        capacity: 1,
        amount: 1,
        pricing: {
            nights: "*",
            price: 100
        }

    })


    const updateBed = () => {
        const newBedStyles = BEDSTYLES?.map((bs) => bs.id === bedstyle.id ? bedstyle : bs)
        dispatch(setBedStyles(newBedStyles))
    }
    return (
        <form style={{ justifyContent: "center", minHeight: "200px", }} className='col-center'>
            <div className="row-center">
                <TextInput
                    value={bedstyle.name}
                    placeholder='Bed style name...'
                    setValue={e => setBedstyle(prev => ({ ...prev, name: e.target.value }))}
                    containerStyle={{ width: "300px", marginTop: "20.5px" }}
                />
                <TextInput
                    type='number'
                    label='Sleeps'
                    bottomLabel='Each'
                    inputStyle={capacityInputStyle}
                    containerStyle={capacityContainerStyle}
                    labelStyle={{ fontSize: "10px" }}
                    value={bedstyle.capacity}
                    setValue={e => setBedstyle(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                />
            </div>
            <Divider style={{ width: "100%", margin: "10px" }} />
            <h4 style={{ marginBottom: "10px" }}>Pricing</h4>
            <div
                style={Array.isArray(bedstyle.pricing) ? pricingContainerStyle : {}}
            >
                {
                    Array.isArray(bedstyle.pricing) ? bedstyle.pricing.map((price, i) => {
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
                                        if (!Array.isArray(bedstyle.pricing)) return;
                                        let newPricing: BedType["pricing"] = [...bedstyle.pricing]
                                        newPricing.splice(i, 1);
                                        if (newPricing.length > 1) newPricing = newPricing.map((p, ix) => ({ ...p, nights: ix + 1 }))
                                        else newPricing = {
                                            nights: "*",
                                            price: newPricing[0]["price"]
                                        }
                                        setBedstyle(prev => ({
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
                                        if (!Array.isArray(bedstyle.pricing)) return;
                                        const newPrice = bedstyle.pricing.map(pr => pr.nights === price.nights ? { ...price, price: value } : pr)
                                        setBedstyle(prev => ({
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
                                value={bedstyle.pricing.price}
                                setValue={(e) => {
                                    const value = Number(e.target.value);
                                    if (isNaN(value)) return alert("Price is not a number")
                                    setBedstyle(prev => ({
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
                                    setBedstyle(prev => ({
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
                {Array.isArray(bedstyle.pricing) ?
                    <button
                        type='button'
                        className={styles.buttonHover}
                        style={addButtonStyle}
                        onClick={() => {
                            setBedstyle(prev => ({
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
                    BedStyle ?
                        <button
                            type="button"
                            style={deleteBedStyleStyle}
                            onClick={() => {
                                if (!BEDSTYLES) return;
                                const confirmed = confirm("Are you sure you want to delete this bed?");
                                if (confirmed) dispatch(setBedStyle([...BEDSTYLES].filter(bs => bs.id !== BedStyle?.id)))
                                if (setIsVisible) setIsVisible(false)
                            }}>
                            Delete Bed Style
                        </button>
                        : null
                }

                <button
                    type="button"
                    style={saveBedStyleStyle}
                    onClick={() => {
                        if (BedStyle) updateBed()
                        else dispatch(addBedStyle(bedstyle))
                        if (setIsVisible) setIsVisible(false)
                    }}>
                    Save Bed Style
                </button>
            </div>
        </form>
    )
}

export default AddBedStyleComponent;

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
const saveBedStyleStyle: React.CSSProperties = {
    background: Colors.blue500,
    borderRadius: 5,
    padding: "5px 10px",
    color: Colors.white,
    fontSize: 12,
    alignSelf: "center",
    justifySelf: "center",
    margin: "auto",
}
const deleteBedStyleStyle: React.CSSProperties = {
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