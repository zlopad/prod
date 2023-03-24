import mainStyles from './main.module.css'


export const Main = () => {
    console.log({mainStyles})

    return (
        <main className={mainStyles.wr}>ГЛАВНАЯ ЧАСТЬ – КАТАЛОГ</main>
    )
}
