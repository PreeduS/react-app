import React from 'react';
import {connect} from 'react-redux';
import questionReducer from '../../reducers/questionReducer';
import answerReducer from '../../reducers/answerReducer';

import "./QuestionComponent.scss"

class QuestionComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            inputValue :''
        }
    }

    updateLocalStore(){    
        var questionData = {...this.props.questionReducer};
        questionData.text = this.refs.questionInput.value;

        localStorage.setItem('question', JSON.stringify( 
           questionData

        ) );
    }

    updateInputValue(){
        var questionData ={...this.props.questionReducer};
        questionData.text =  this.refs.questionInput.value;
        console.log('questionData = ',questionData)
        this.props.updateInputValue(  questionData )

    }

    render(){
        var qText = this.props.questionReducer.text;
        var disabledState = this.props.answerReducer.showAddAnswer;

      
        return(
            <div id = "question-wrapper">
                <div className = "main-header">
                    <span className = "answer-img">
                        <span style = { {backgroundImage:'url("'+this.props.questionReducer.imageURL+'")'} } ></span>
                    </span>                   
                </div>

                <div className = "question-bar-wrapper">
                    <div className = "header-label">
                        <span className = "line"></span>
                        <span className = "label">Question</span>
                        <span className = "line"></span>
                    </div>                      
                    <div className="question-input-container">                  
                        <input  
                            ref = "questionInput"
                            value = {qText}
                            onChange = {this.updateInputValue.bind(this)}
                            disabled = {disabledState}
                        />
                    </div>
                
                    <div className = "question-button-container"
                        onClick = {!disabledState && this.updateLocalStore.bind(this)}
                        style = { {cursor: disabledState? 'default':'pointer'  } }
                    > 
                            <span>EDIT</span> 
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state)=>( {
    questionReducer: state.questionReducer,
    answerReducer: state.answerReducer
});

const mapDispatchToProps = (dispatch)=>( {
    updateInputValue : (value)=>{
        dispatch({
            type:'ADD_QUESTION',
            payload: value
        })
    }   

});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionComponent);
