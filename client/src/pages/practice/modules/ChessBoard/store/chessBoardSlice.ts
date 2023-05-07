import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ChessBoard } from './types/ChessBoard'
import {
    checkForEnPassant,
    checkForCasling,
    handleEnPassant,
    handlePieceMove,
    handleCasling,
    checkForKingDanger
} from './helpers'

import initialGameField from './gameField'

const initialState: ChessBoard = {
    gameField: initialGameField,
    globalNextMoves: [],
    selected: null,
    turn: 'w',
    coverMoves: [],
    lastMoves: [],
    checkStatus: null,
    castling: 'KQkq',
    enpassing: null
}

const chessBoardSlice = createSlice({
    name: 'practice/chessboard',
    initialState,
    reducers: {
        selectPiece: (state, action: PayloadAction<SelectPiecePayload>) => {
            const { x, y, nextMoves } = action.payload
            state.selected = { x, y }
            state.globalNextMoves = nextMoves
        },
        handleMove: (state, action: PayloadAction<HandleMovePayload>) => {
            const { x: x2, y: y2 } = action.payload

            if (state.selected) {
                const { x: x1, y: y1 } = state.selected
                const [color, piece] = state.gameField[y1][x1]

                const castling = piece === 'K' && Math.abs(x2 - x1) > 1
                const enPassant = piece === 'P' && x1 !== x2 && state.gameField[y2][x2] === '0'

                if (castling) {
                    handleCasling(state, x2, y2)
                } else if (enPassant) {
                    handleEnPassant(state, x2, y2)
                } else {
                    checkForEnPassant(state, x2, y2)
                    checkForCasling(state, [x1, y1], color + piece)
                    handlePieceMove(state, x2, y2)
                }
                checkForKingDanger(state)
                state.turn = state.turn === 'w' ? 'b' : 'w'
            }
            state.selected = null
            state.globalNextMoves = []
        },
        clearField: (state) => {
            state.selected = null
            state.globalNextMoves = []
        }
    }
})

export const { selectPiece, clearField, handleMove } = chessBoardSlice.actions
export default chessBoardSlice.reducer
