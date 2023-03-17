import React from 'react'
import TodoList from './TodoList'

export default {
    title: "TodoList",
    component: TodoList
}

export const TodoListExample = () => {

    const handlerEdit = (id) => {
        console.log(`OpenEdit = ${id}`);
    };

    const handlerChangeStatus = (id) => {
        console.log(`changeStatus = ${id}`);
    };

    const getData = () => {
        const data = [
            {
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
            },
            {
                id: 2,
                text: 'Ant Design Title 1',
                date: new Date(),
                taskCategory: {
                    name: 'Work',
                    color: '#52c41a'
                },
                taskState: {
                    name: 'Completed'
                },

            }
        ];
        return data;
    }

    const todos = getData();

    return (
        <>
            <TodoList
                todos={todos}
                onClickChangeStateTodo={handlerChangeStatus}
                onClickEditTodo={handlerEdit} />
        </>
    );
}