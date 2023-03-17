import React from 'react'
import Todo from './Todo'

export default {
    title: "Todo",
    component: Todo
}

export const TodoExample = (id) => {

    const todoData = {
        id: 1,
        text: 'Ant Design Title 1',
        date: new Date(),
        taskCategory: {
            name: 'Health',
            color: '#1C89BF'
        },
        taskState: {
            name: 'Active'
        },
    }

    const handlerEdit = (e) => {
        console.log(`OpenEdit = ${id}`);
    };

    const handlerChangeStatus = (id) => {
        console.log(`changeStatus = ${id}`);
    };

    return (
        <>
            <Todo
                handlerChangeStatus={handlerChangeStatus}
                handlerEdit={handlerEdit}
                {...todoData}/>
        </>
        );
    }