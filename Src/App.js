import React, { useReducer} from 'react';
import { useEffect, useState } from "react";
import './App.css'
import DigitButtons from './DigitButtons';
import OperationButtons from './OperationButtons';
export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR : 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}
function reducer(state, {type, payload}){
    if(payload.digit==="0" && state.currentOperant ==="0"){
        return state;
    }
    if(payload.digit==="." && state.currentOperant.includes(".")){
        return state;
    }
    switch(type){

        case ACTIONS.ADD_DIGIT:
            if(state.overwrite){
                return{
                    ...state,
                    currentOperant: payload.digit,
                    overwrite:false
                }
            }
            return {
                ...state,
                currentOperant: `${currentOperant || ""}${payload.digit}`
            }

        case ACTIONS.CHOOSE_OPERATION:
            if(state.currentOperant === null && state.previousOperant === null){
                return state;
            }
            if(state.currentOperant==null){
                return {
                    ...state,
                    operation: payload.operation,
                    
                }
            }
            if(state.previousOperant === null){
                return{
                    ...state,
                    operation: payload.operation,
                    previousOperant: state.currentOperant,
                    currentOperant: null
                }
                

            }
            return {
                ...state,
                previousOperant: evaluate(state),
                operation: payload.operation,
                currentOperant:null

            }

        case ACTIONS.CLEAR:
            return {}

        case ACTIONS.DELETE_DIGIT:
            if(state.overwrite){
                return {
                    ...state,
                    overwrite: false,
                    currentOperant:null
                }
            }
            if(state.currentOperant == null){
                return state;
            }
            if(state.currentOperant.length == 1){
                return{
                    ...state,
                    currentOperant: null

                }
            }
            return {
                ...state,
                currentOperant: state.currentOperant.slice(0, -1)
            }

        case ACTIONS.EVALUATE:
            if(state.operation == null || state.currentOperant==null ||state
                .previousOperant==null ){
                    return state;
            }
            return{
                ...state,
                overwrite:true,
                previousOperant: null,
                operation:null,
                currentOperant: evaluate(state)

            }

    }
}

function evaluate({currentOperant, previousOperant, operation}){
    const prev = parseFloat(previousOperant)
    const curr = parseFloat(currentOperant)
    if(isNaN(prev) || isNaN(curr)){
        return "";
    }
    let computation = "";
    switch(operation){
        case "+":
            computation = prev + curr;
            break;
        case "-":
            computation = prev - curr;
            break;
        case "*":
            computation = prev*curr;
            break;
        case "/":
            computation = prev/curr;
            break;
    }
    return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {maximumFractionDigits:0});
function formateOperand(operand) {
    if(operand == null) return;
    const [integer, decimal] = operand.split('.')
    if(decimal == null)return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`

}
function App(){
    const [{currentOperant, previousOperant, operation}, dispatch] = useReducer(
        reducer,
         {})
   
    return(
        <div className="calculator-grid">
            <div className="output">
                
                <div className="previous-operand">{ formateOperand(previousOperant) } {operation}</div>
                <div className="current-operand">{ formateOperand(currentOperant) }</div>

            </div>
            <button className="span-two" onClick = {() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
            <button  onClick = {() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
            <OperationButtons operation = "/" dispatch = {dispatch}/>
            <DigitButtons digit = "1" dispatch = {dispatch}/>
            <DigitButtons digit = "2" dispatch = {dispatch}/>
            <DigitButtons digit = "3" dispatch = {dispatch}/>
            <OperationButtons operation = "*" dispatch = {dispatch}/>
            <DigitButtons digit = "4" dispatch = {dispatch}/>
            <DigitButtons digit = "5" dispatch = {dispatch}/>
            <DigitButtons digit = "6" dispatch = {dispatch}/>
            <OperationButtons operation = "+" dispatch = {dispatch}/>
            <DigitButtons digit = "7" dispatch = {dispatch}/>
            <DigitButtons digit = "8" dispatch = {dispatch}/>
            <DigitButtons digit = "9" dispatch = {dispatch}/>
            <OperationButtons operation = "-" dispatch = {dispatch}/>
            <DigitButtons digit = "." dispatch = {dispatch}/>
            <DigitButtons digit = "0" dispatch = {dispatch}/>
            <button className="span-two" onClick = {() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
            
        </div>
    );
}

export default App;