import React from 'react';
import {connect} from 'react-redux';
import answerReducer from '../../reducers/answerReducer';

import "./SearchComponent.scss"

class SearchComponent extends React.Component{
    constructor(){
        super();
        this.state = {searchedValue : ''}
    }

    searchAnswer(){
        var searchValue = this.state.searchedValue;
        this.props.searchedAnswer(searchValue);
  
    }
    updateSearchedValue(e){
        this.setState({searchedValue: e.target.value})
    }

    render(){
        
        return(
            <div id = "searchbar-wrapper">
                <div className = "header-label">
                    <span className = "line"></span>
                    <span className = "label">Answers</span>
                    <span className = "line"></span>
                </div>
                <div className="search-input-container">
                    <input  
                        placeholder = "Search Answers" 
                        onChange = {this.updateSearchedValue.bind(this)} 
                    />
                </div>

                <div className = "search-button-container"
                     onClick = {this.searchAnswer.bind(this)}
                 > 
                        <span>SEARCH</span> 
                </div>
            </div>
        );

    }
}




const mapStateToProps = (state)=>( {
    answerReducer: state.answerReducer
});

const mapDispatchToProps = (dispatch)=>( {
    searchedAnswer : (value)=>{
        dispatch({
            type:'SET_SEARCHED_ANSWER',
            payload: value
        })
    }


});

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
