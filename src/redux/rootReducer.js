import { combineReducers } from 'redux'
import hiresList from './hiresReducer'
// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
 groups:hiresList
})

export default rootReducer;