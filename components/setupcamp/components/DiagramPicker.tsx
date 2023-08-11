import { RootState } from "@/services/redux/store";
import { DiagramType, ArgFunction } from "@/types";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DiagramPicker.module.css"
import Images from "@/common/images";
import Image from "next/image";

const DiagramPicker = ({
    diagram,
    deleteDiagram,
    changeDiagram,
    changeDiagramAmount,
}: {
    diagram?: DiagramType,
    deleteDiagram: ArgFunction,
    changeDiagram: ArgFunction,
    changeDiagramAmount: ArgFunction,
}) => {
    const dispatch = useDispatch()
    const diagramstyles = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.diagramStyles)
    const [showDiagramStyleOptions, setShowDiagramStyleOptions] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [toEditDiagramStyle, setToEditDiagramStyle] = useState<DiagramType | undefined>()
    if (!diagram) return null;
    return (
        <div className={styles.diagramCard}
            onClick={() => setShowDiagramStyleOptions(prev => prev ? true : false)}
        >
            {/* {showModal ? <Modal setIsVisible={setShowModal} component={<AddDiagramStyleComponent DiagramStyle={toEditDiagramStyle} setIsVisible={setShowModal} />} /> : null} */}
            <div className="row-between" style={{ margin: "10px 5px", position: "relative" }}
                onClick={() => setShowDiagramStyleOptions(false)}
            >
                {
                    showDiagramStyleOptions ? (
                        <React.Fragment>
                            <div className={styles.darkBackground} onClick={() => setShowDiagramStyleOptions(false)} />

                            <div
                                className={styles.diagramStyleOptionsContainer}
                                onClick={() => setShowDiagramStyleOptions(prev => prev ? false : true)}

                            >
                                {
                                    diagramstyles?.map((diagramstyle, i) => {
                                        const currentDiagram = diagramstyle.id === diagram.id
                                        return (
                                            <div
                                                key={i}
                                                className={styles.diagramStyleOption}
                                                style={{ width: "90%" }}
                                                onClick={(e) => {
                                                    setShowDiagramStyleOptions(prev => prev ? false : true)
                                                }}

                                            >
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setToEditDiagramStyle(diagram)
                                                        setShowModal(true)
                                                    }}
                                                    style={{ marginTop: "5px" }}
                                                >
                                                    {/* @ts-ignore */}
                                                    <Image src={diagramstyle.photo ?? Images["ic_logo"]} alt="Diagram photo" width={30} height={30} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className={styles.optionDiagramButton}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowDiagramStyleOptions(false)
                                                    }}
                                                    style={{
                                                        color: currentDiagram ? "#000" : "#999"
                                                    }}
                                                >
                                                    {diagramstyle.name} {currentDiagram ? "▴" : ""}
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                                {/* <button
                                    type="button"
                                    className={styles.addMeetingRoomButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setToEditDiagramStyle(undefined)
                                        setShowModal(true)
                                    }}
                                >+</button> */}
                            </div>
                        </React.Fragment>
                    ) : (
                        <button
                            type="button" className={styles.selectDiagramButton} onClick={(e) => { e.stopPropagation(); setShowDiagramStyleOptions(true) }}>
                            <Image src={diagram.photo ?? Images["ic_logo"]} alt="edit icon" height={100} width={100} />
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default DiagramPicker;