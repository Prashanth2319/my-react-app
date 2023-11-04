import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {   decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    selectCount, } from './counterSlice'

 const Counter = () => {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');
  
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default Counter;