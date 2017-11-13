

const questionReducer = (state = {      
        text: '',
        imageURL:''
    
    }, action) =>{

        switch(action.type){
            case 'ADD_QUESTION':
               console.log('ADD_QUESTION' , action.payload)    
                state = {
                    ...state,
                     text:action.payload.text,
                     imageURL:action.payload.imageURL

                };
                break;    

            case 'FETCH_INITIAL_STATE_QUESTION_FULFILLED':      
                                console.log('FETCH_INITIAL_STATE_QUESTION_FULFILLED' , action.payload)    
                state = {
                        ...state,
                        text:action.payload.text,                      
                        imageURL:action.payload.imageURL                                    
                }
                break;                       
             
        }


        return state;
};

export default questionReducer;