import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import CategoryCircle from '../CategoryCircle/CategoryCircle';
import './Todo.css'
import { Typography, Checkbox, Space, Tooltip, Button, Col, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    selectTodoById,
    changeStateTodo,
    removeTodo
} from '../TodoList/todosSlice'

const { Text } = Typography;

const Todo = ({ id, handlerEdit }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const todo = useSelector((state) => selectTodoById(state, id))
    const { text, date, taskState, taskCategory } = todo
    const isCompleted = taskState.id === 2
    const name = text.length > 30 ? `${text.substring(0, 30)}...` : text;
    const dispatch = useDispatch()

    const handlerChangeStatus = () => {
        dispatch(changeStateTodo(todo.id))
    }
    
    const onDelete = () => {
        const promise = dispatch(removeTodo(todo.id));
            promise.then( 
                x=> success(),
                x=> error())
    }

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Success',
        });
      };
    
      const error = () => {
        messageApi.open({
          type: 'error',
          content: 'An error has occurred, please try again',
        });
      };


    return (
        <>
                {contextHolder}
                <Col span={6} style={{textAlign:'left'}}>
                    <Checkbox checked={isCompleted} onChange={() => handlerChangeStatus()}>
                        <Text type={isCompleted ? 'success' : ''}>{name}</Text>
                    </Checkbox>
                </Col>
                <Col span={11} style={{textAlign:'center'}}>
                    <Text type='secondary'>{date.toLocaleString()}</Text>
                </Col>
                <Col span={1}>
                    <CategoryCircle title={taskCategory.name} bgColor={taskCategory.color} />
                </Col>
                <Col span={6} style={{textAlign:'right'}}>
                    <Space wrap>
                        <Tooltip title="Edit">
                            <Button onClick={() => handlerEdit({ id, text, date, taskCategory })} shape="circle" icon={<EditOutlined />} />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button danger onClick={() => onDelete()} shape="circle" icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Space>
                </Col>
        </>
    )
}

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    handlerEdit: PropTypes.func.isRequired
}

export default Todo