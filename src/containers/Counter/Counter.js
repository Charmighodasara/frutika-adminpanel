import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../Redux/Action/Counter_Action';

function Counter(props) {
    const dispach = useDispatch()
    const count = useSelector(state => state.counter)

    const handleIncrement = () => {
        dispach(increment())
    }
    const handleDecrement = () => {
        dispach(decrement())
    }

    return (
        <div>
            <Button onClick={() => handleIncrement()}>+</Button>
            {count.counter}
            <Button onClick={() => handleDecrement()}>-</Button>
        </div>
    );
}

export default Counter;