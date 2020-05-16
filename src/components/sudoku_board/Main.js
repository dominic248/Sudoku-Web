import React from 'react';
import Row from './Row'
import './Main.css'
import Sudoku from './Generator'



class App extends React.Component {
    constructor() {
        super()
        this.state = {
            board: [],
            solved:[],
            checkSolved:false
        }
    }

    async componentWillMount(){
        var N = 9;
        var K = 40;
        var sudoku = new Sudoku(N, K);
        sudoku.fillValues();
        let board = sudoku.printSudoku();
        let solved= JSON.parse(JSON.stringify(board))
        setTimeout(async ()=> {
            await this.setState({board:board})
            await this.setState({solved:solved},this.solve)
        }, 500);
    }

    handleInput=(e,row,col)=>{
        console.log(e,row,col)
        var board=this.state.board
        board[row][col]=parseInt(e)
        this.setState({board:board})
        
    }

    find_empty=(bo)=>{
        for (var i = 0; i < bo.length; i++) {
            for (var j = 0; j < bo[0].length; j++) {
                if (bo[i][j] === 0) {
                    return { i: i, j: j };
                }
            }
        }
        return null
    }
    
    solve=()=> {
        var bo=this.state.solved
        var find = this.find_empty(bo)
        var row, col
        if (find === null) {
            this.setState({solved:bo})
            return true
        } else {
            row = find.i
            col = find.j
        }
        for (var i = 1; i < 10; i++) {
            if (this.valid(bo, i, row, col)) {
                bo[row][col] = i
                if (this.solve(bo)) {
                    return true
                }
                bo[row][col] = 0
            }
        }
        return false
    }
    
    valid=(bo, num, row, col)=> {
        var i
        for (i = 0; i < bo[0].length; i++) {
            if (bo[row][i] === num && col !== i) {
                return false
            }
        }
        for (i = 0; i < bo.length; i++) {
            if (bo[i][col] === num && row !== i) {
                return false
            }
        }
        var box_x = Math.floor(col / 3)
        var box_y = Math.floor(row / 3)
        for (i = box_y * 3; i < box_y * 3 + 3; i++) {
            for (var j = box_x * 3; j < box_x * 3 + 3; j++) {
                if (bo[i][j] === num && (i !== row && j !== col)) {
                    return false
                }
            }
        }
        return true
    }

    showSolved=()=>{
        this.setState({board:this.state.solved})
    }

    enableCheckSolved=()=>{
        this.setState({checkSolved:true})
    }
    disableCheckSolved=()=>{
        this.setState({checkSolved:false})
    }

    render() {
        if(this.state.board.length>0){
            return (
                <>
                <div className="card game">
                    <table id="puzzle-grid">
                        <tbody>
                            {this.state.board.map((val, index) => (
                                <Row key={index} rowIndex={index} rowValues={val} empty={this.state.empty} solution={this.state.solved[index]} 
                                checkSolved={this.state.checkSolved} handleInput={this.handleInput} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={this.showSolved}>Solve</button>
                <button onClick={this.enableCheckSolved}>Enable Check</button>
                <button onClick={this.disableCheckSolved}>Disable Check</button>
                </>
            );
        }else{
            return (
                <>
                <div>Loading...</div>
                </>
            );
        }
    }
}


export default App;
