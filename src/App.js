import React from 'react';
import './App.css'
import Main from './components/sudoku_board/Main'


class App extends React.Component {
  constructor(){
    super()
    this.state={
      val:1
    }
  }
  render(){
    return (
      <>
      <Main />
      </>
    );
  }
}

export default App;
