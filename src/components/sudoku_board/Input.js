import React from 'react';

class Input extends React.Component{
    constructor(){
        super()
        this.state={
            disabled:true
        }
    }
    handleInput=(e)=>{
        if(!e.target.value){
            this.props.handleInput(0,this.props.colIndex)
        }else{
            this.props.handleInput(e.target.value,this.props.colIndex)
        }
        
    }
    componentWillMount(){
        if(this.props.colValue===0){
            this.setState({disabled:false})
        }
    }

    render(){
        return(
            <td>
                <input type="number" maxLength={1} onChange={this.handleInput} disabled={this.state.disabled} value={this.props.colValue!==0?this.props.colValue:''}
                className={((this.props.checkSolved && !this.state.disabled)?(this.props.colValue===0?'warning-cell':(this.props.solution!==this.props.colValue?'wrong-cell':'right-cell')):' ')}
                
                />
            </td>
        )
    }
}

export default Input