import style from './NumbersSection.module.css';


const NumbersSection = () => {
    return (
        <div className={style.numbers_container}>
            <div className={style.numbers_card}>
                <div className={style.number}>9.000</div>
                <div className={style.number_text}>Total number of products</div>
            </div>
            <div className={style.numbers_card}>
                <div className={style.number}>1M</div>
                <div className={style.number_text}>Annual visitors</div>
            </div>
            <div className={style.numbers_card}>
                <div className={style.number}>4.000</div>
                <div className={style.number_text}>Active members</div>
            </div>
        </div>
    )
}

export default NumbersSection