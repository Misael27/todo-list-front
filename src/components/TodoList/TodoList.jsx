import React from 'react'
import PropTypes from 'prop-types'
import { List, Spin } from 'antd';
import Todo from '../Todo/Todo';
import { useSelector } from 'react-redux'
import { selectFilteredTodoIds } from './todosSlice'

const listStyle = {marginTop:'1%', overflow: 'auto', height: '400px'}

const TodoListItem = React.memo(function TodoListItem(todo) {
    return (
        <List.Item>
            <Todo {...todo} />
        </List.Item>
    )
})

const renderTodo = (onClickEditTodo) => (todoId) => {
    return <TodoListItem 
				handlerEdit={onClickEditTodo} 
				id={todoId}/>
}

const TodoList = ({ onClickEditTodo }) => {
	const todoIds = useSelector(selectFilteredTodoIds)
	const loadingStatus = useSelector((state) => state.todos.status)
	return (
		<Spin tip="Loading..." spinning={loadingStatus === 'loading'}>
			<List
				size="large"
				style={listStyle}
				bordered
				dataSource={todoIds}
				renderItem={(item) => ( renderTodo(onClickEditTodo)(item) )}
			/>
		</Spin>
	)
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
			date: PropTypes.instanceOf(Date),
			taskState: PropTypes.object.isRequired,
			taskCategory: PropTypes.object.isRequired,
        })
    ),
	onClickEditTodo: PropTypes.func.isRequired,
}

export default TodoList