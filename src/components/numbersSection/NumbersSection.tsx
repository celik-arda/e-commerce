import style from './NumbersSection.module.css';


const NumbersSection = () => {
    return (
        <div className={style.numbers_container}>
            <div className={style.numbers_card}>
                <div className={style.number}>9.000</div>
                <div className={style.number_text}>Lorem ipsum dolor sit amet consectetur.</div>
            </div>
            <div className={style.numbers_card}>
                <div className={style.number}>1M</div>
                <div className={style.number_text}>Lorem ipsum dolor sit amet consectetur.</div>
            </div>
            <div className={style.numbers_card}>
                <div className={style.number}>4.000</div>
                <div className={style.number_text}>Lorem ipsum dolor sit amet consectetur.</div>
            </div>
        </div>
    )
}

export default NumbersSection