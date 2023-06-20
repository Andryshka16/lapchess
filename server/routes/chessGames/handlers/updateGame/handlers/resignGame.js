import { ChessGames } from '../../../../../models/index.js'

const resignGame = async (req, res) => {
    try {
        const { gameId } = req.params
        const player = req.body

        const document = await ChessGames.findOne({ gameId })
        const lastPosition = document.positionHistory[document.positionHistory.length - 1]
        lastPosition.gameStatus.winner = player === 'w' ? 'b' : 'w'
        document.markModified('positionHistory')
        await document.save()

        res.status(200).send('Succesfully updated a chess game')
    } catch (error) {
        console.log(error.message)
        res.status(400).json('Error while updating chess game')
    }
}

export default resignGame
