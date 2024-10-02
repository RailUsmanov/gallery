import React from 'react';
import {Painting} from '../utils/type';
import styles from '../styles/PaintingCard.module.scss';
import {useSelector} from "react-redux";
import {RootStateType} from "../store/store";

interface PaintingCardProps {
    painting: Painting;
}

const PaintingCard: React.FC<PaintingCardProps> = ({painting}) => {
    const themeDark = useSelector((state: RootStateType) => state.theme.themeDark)
    return (
        <div className={styles.paintingCard}>
            <img src={"https://test-front.framework.team" + painting.imageUrl} alt={painting.name}/>
            <div
                className={`${styles.paintingInfo} ${themeDark ? styles.darkTheme : styles.lightTheme}`}
            >
                <div>
                    <h3 className={styles.paintingName}>{painting.name}</h3>
                    <p className={styles.paintingDate}>{painting.created}</p>
                    <div className={styles.paintingCard__}></div>
                </div>
            </div>
        </div>
    );
};

export default PaintingCard;
