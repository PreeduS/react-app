import React from 'react';
import {connect} from 'react-redux';
import answerReducer from '../../reducers/answerReducer';
//import initialStateReducer from '../../reducers/initialStateReducer';

import './AnswerComponent.scss';

class AnswerComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            showAddAnswer:false,
            inputLabelUpload: 'No file chosen'
        }

    }


    updateLocalStore(answersList){
        localStorage.setItem('answers', JSON.stringify( answersList) );
    }

    toggleAddAnswer(){  
        this.setState({
            showAddAnswer: !this.state.showAddAnswer           
        });        
        this.props.setShowAddAnswer( this.state.showAddAnswer );
    }

    addAnswer(){
        var addValue = this.refs.answerValue.value;
        if(addValue === ''){return 0;}

        var list = [...this.props.answerReducer.answers];
        list.push(            {
                "text": addValue ,
                "imageURL":"https://s3-us-west-2.amazonaws.com/toluna-frontend-developer-test/images/us.jpg"
        })
       
        this.props.addAnswer(list);  
        this.updateLocalStore(list);

        this.setState({
            showAddAnswer: false           
        });   
        this.props.setShowAddAnswer( this.state.showAddAnswer );

    }

    removeAnswer(indexToRemove){
        var list = [...this.props.answerReducer.answers];
        list.splice(indexToRemove,1);

        this.props.removeAnswer( list );
         this.updateLocalStore(list)
    }

    getSearchedList(){
        var answerList = this.props.answerReducer.answers;
        var searchedValue = this.props.answerReducer.searchedValue;

        var searchedList = searchedValue === '' ? answerList :  answerList.filter(  
            answer => answer.text.toLowerCase().indexOf( searchedValue.toLowerCase() ) !== -1       
        );
     
        return searchedList;
    }

    getBackgroundImage(src){
       return { backgroundImage:'url('+src+')' }; 
    }

    fileInputLabelUpdate(){
    
        this.setState( {
            inputLabelUpload:this.refs.fileInput.files[0].name
        });
    }


  
    render(){
         
      
        var addItem = (
            <div className = "footer">
                
                {   this.state.showAddAnswer &&
                    (
                        <div className = "upload-container">
                            <div className = "file-input">
                                <div className = "input-button-container">
                                    <input type="file" id="file-input" ref = "fileInput" 
                                    onChange = {this.fileInputLabelUpdate.bind(this)}/>
                                    <label htmlFor="file-input">
                                        Choose File                                
                                    </label>
                                    <span> {this.state.inputLabelUpload}  </span>
                                </div>
                            </div>
                            <div className = "text-input">
                                <input type="text" placeholder = "Answer text..." ref = "answerValue"/>
                            </div>
                            <div className = "save-button" onClick = {this.addAnswer.bind(this)}>
                               SAVE
                            </div>                    
                        </div>
                    )
                }

                { !this.state.showAddAnswer &&
                    (
                        <div className = "add-answer" >
                            <div className = "btn-yellow-active" onClick = {this.toggleAddAnswer.bind(this)} > 
                                <span></span> <span className = "plus"></span> 
                            </div>                   
                        </div>
                    )
                }
            </div>
        );       

        if( this.props.answerReducer.answers.length === 0 ){
            return(
                <div id="answer-list-wrapper">
                    <div className = "no-items"><span>No items added</span></div>
                    <div>{addItem}</div>
                </div>
            );
        }


        return (
            <div id = "answer-list-wrapper"> 

                {this.getSearchedList().map( (answer, index) =>(

                   <div className = "answer-list-container"  key = {index} > 
                       <div className = "answer-list-left">
                            <div className = "answer-item"> 
                                <span className = "answer-img">
                                    <span style = { this.getBackgroundImage(answer.imageURL) } ></span>
                                </span>
                                <span className = "answer-text">{answer.text} </span>
                            </div> 
                       </div>

                        <div className = "answer-list-right">
                            <div className = "btn-yellow" onClick = {this.removeAnswer.bind(this,index)}> 
                                <span></span> <span></span> 
                            </div>
                        </div>
                    </div>

                ))}
                
                {addItem}
            </div>

        );

    }

}




const mapStateToProps = (state)=>( {
    answerReducer: state.answerReducer
});

const mapDispatchToProps = (dispatch)=>( {
    addAnswer : (value)=>{
        dispatch({
            type:'ADD_ANSWER',
            payload: value
        })
    },
    removeAnswer : (value)=>{
        dispatch({
            type:'REMOVE_ANSWER',
            payload: value
        })
    },
    setShowAddAnswer : (value)=>{
        dispatch({
            type:'SET_ADD_ANSWER',
            payload: value
        })
    } 
    
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerComponent);
