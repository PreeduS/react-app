import React from 'react';
import {connect} from 'react-redux';

import axios from 'axios';

//components
import AnswerComponent from "./AnswerComponent/AnswerComponent";
import SearchComponent from "./SearchComponent/SearchComponent";
import QuestionComponent from "./QuestionComponent/QuestionComponent";

import answerReducer from '../reducers/answerReducer';
import questionReducer from '../reducers/questionReducer';

import "./app.scss"

class App extends React.Component{
    constructor(){
        super();

     
    }
    componentDidMount(){
 
        //answers
        var localStorageAnswers = localStorage.getItem('answers');
        if( localStorageAnswers !== null){
            var answersList = JSON.parse( localStorageAnswers)
            this.props.addAnswer(answersList);
            
        }else{
            this.props.fetchtInitialState();
        } 

        //question
        var localStorageQuestion = localStorage.getItem('question');
        if( localStorageQuestion !== null){
            var questionList = JSON.parse( localStorageQuestion)
            this.props.addQuestion(questionList);
            
        }else{
            this.props.fetchtInitialState_question();
        }         
        
    }


    render(){
        var localStorageAnswers = localStorage.getItem('answers');
        var localStorageQuestion = localStorage.getItem('question');
       var loading =  (
           this.props.answerReducer.answers.length === 0 && localStorageAnswers === null ||
           this.props.questionReducer.text === '' && localStorageQuestion === null
        
        );

        if(loading){
            return(
                <div className = "initial-loading"><span>Loading...</span></div>
            );
        }

        return(
            <div>   
                <div className = "main-logo">
                    <span className = "answer-img">
                        <span ></span>
                    </span>                      
                </div>

                <div id = "question-component">    
                    <QuestionComponent />
                </div>

                <div id = "search-component">    
                    <SearchComponent />
                </div>

                <div id = "answer-component">
                    <AnswerComponent/>
                </div>


                
            </div>
        );
    }

};



//---------- temp --------------------------------
   var temp ={  
        "question":{
            "text":"Please let us know what is your dream vacation, so we'll fit your destination",
            "imageURL":"https://s3-us-west-2.amazonaws.com/toluna-frontend-developer-test/images/question.jpg"
        },    
        
        "answers":[
            {
                "text":"Franceee",
                "imageURL":"https://s3-us-west-2.amazonaws.com/toluna-frontend-developer-test/images/france.jpg"
            },
            {
                "text":"Italy",
                "imageURL":"https://s3-us-west-2.amazonaws.com/toluna-frontend-developer-test/images/italy.jpg"
            },
            {
                "text":"United States",
                "imageURL":"https://s3-us-west-2.amazonaws.com/toluna-frontend-developer-test/images/us.jpg"
            }
        ],
   }
//------------------------------------------


const mapStateToProps = (state)=>( {
     answerReducer: state.answerReducer,
     questionReducer: state.questionReducer
});

const mapDispatchToProps = (dispatch)=>( {
    addAnswer : (value)=>{
        dispatch({
            type:'ADD_ANSWER',
            payload: value
        })
    },
    addQuestion : (value)=>{
        dispatch({
            type:'ADD_QUESTION',
            payload: value
        })
    },

    fetchtInitialState : () =>{ 
         dispatch({
            type:'FETCH_INITIAL_STATE_ANSWER',
            payload: new Promise( (resolve, reject) =>{
                
                setTimeout(()=>{
                  
                    resolve(temp);
            
                    localStorage.setItem('answers', JSON.stringify( 
                        temp.answers
                    ));
       
                                            
                },3000);
                     /*
                    axios.get('https://s3-us-west-2.amazonaws.com/toluna-frontend-developer-test/data.json')
                    .then(function (response) {
                       resolve(response);
                       console.log('axios response = ',response)
                    })  
                      */    

            })
        })           
    },


    fetchtInitialState_question : () =>{ 
         dispatch({
            type:'FETCH_INITIAL_STATE_QUESTION',
            payload: new Promise( (resolve, reject) =>{
                setTimeout(()=>{
                    //resolve(temp.answers);
                    resolve(temp.question);
            
                    localStorage.setItem('question', JSON.stringify( 
                        temp.question
                    ));
            
                            

                },3000);
            })
        })           
    }    


});

export default connect(mapStateToProps, mapDispatchToProps)(App);
