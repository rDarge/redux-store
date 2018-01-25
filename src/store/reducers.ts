import { ADD_TODO } from "./actions";
import { REMOVE_TODO } from "./index";

export const initialState = {
    loaded: false,
    loading: false,
    data: [{
        label: "eat pizza",
        complete: false
      }]
};

export function reducer(
    state = initialState, 
    action: {type:string, payload: any}
) {
    switch(action.type) {
        case ADD_TODO: {
            const todo = action.payload;
            const data = [...state.data, todo];
            return {
                ...state,
                data
             }
        }

        case REMOVE_TODO: {
            const todo = action.payload;
            const data = state.data.filter(data => data.label !== todo.label)
            return {
                ...state,
                data
            }
        }
    }
    return state;
}