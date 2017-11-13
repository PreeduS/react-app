

const answerReducer = (state = {
        answers: [], 
        searchedValue:'',
        showAddAnswer: true

    }, action) =>{

        switch(action.type){
            case 'SET_SEARCHED_ANSWER':
                state = {
                    ...state,
                    searchedValue: action.payload
                };
                break;

            case 'ADD_ANSWER':
                state = {
                    ...state,
                    answers: action.payload
                };
                break;      
                           
            case 'REMOVE_ANSWER':
                state = {
                    ...state,
                    answers: action.payload
                };
                break;

            case 'FETCH_INITIAL_STATE_ANSWER':
                break;

            case 'FETCH_INITIAL_STATE_ANSWER_FULFILLED':                                       
                state = {
                    ...state,
                    answers: action.payload.answers
                }
                break;     

            case 'SET_ADD_ANSWER':                                        
                state = {
                    ...state,
                    showAddAnswer: action.payload
                }
                break;     

             
        }


        return state;
};

export default answerReducer;