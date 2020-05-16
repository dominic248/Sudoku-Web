import React from 'react';
import Input from './Input'

class Row extends React.Component{
    handleInput=(e,col)=>{
        this.props.handleInput(e,this.props.rowIndex,col)
    }


    render(){
        return(
            <tr>
                {this.props.rowValues.map((val, index) => (
                    <Input key={index} colIndex={index} colValue={val} solution={this.props.solution?this.props.solution[index]:''} 
                    checkSolved={this.props.checkSolved} handleInput={this.handleInput} />
                ))}
            </tr>
        )
        
    }
}

export default Row