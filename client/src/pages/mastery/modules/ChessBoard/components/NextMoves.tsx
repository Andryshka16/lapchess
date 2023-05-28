import { useAppSelector } from 'redux/store'
import { left, top } from 'config'
import { cellColor1, cellColor2, indicatorColor } from 'config'

const NextMoves = () => {
    const { globalNextMoves, gameField } = useAppSelector((store) => store.mastery.chessBoard)

    const style = (x: number, y: number) =>
        `absolute ${left(x)} ${top(y)} w-[12.5%] h-[12.5%] pointer-events-none`

    return (
        <>
            {globalNextMoves.map(([x, y]) =>
                gameField[y][x] === '0' ? (
                    <div
                        className={`${style(x, y)} rounded-full scale-[0.25] ${indicatorColor}`}
                        key={`nextmove${x}${y}`}
                    />
                ) : (
                    <div className={`${style(x, y)} ${indicatorColor}`} key={`nextmove${x}${y}`}>
                        <div
                            className={`h-full w-full rounded-[40%] ${
                                (x + y) % 2 ? cellColor1 : cellColor2
                            }`}
                        ></div>
                    </div>
                )
            )}
        </>
    )
}

export default NextMoves