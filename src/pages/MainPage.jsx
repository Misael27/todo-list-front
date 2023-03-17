import React from 'react'
import { Layout, Typography, Col, Row, Divider, Button, message } from 'antd';

import FilterTodoList from '../components/FilterTodoList/FilterTodoList'
import TodoList from '../components/TodoList/TodoList';
import CategoryLegend from '../components/CategoryLegend/CategoryLegend';
import ModalTodoCreateEdit from '../components/ModalEdit/ModalCreateEdit';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import {
    saveNewTodo,
    updateTodo
} from '../components/TodoList/todosSlice';

import {
    statusFilterChanged
} from '../components/Filters/filterSlice';

const { Content } = Layout;
const { Title } = Typography;

const contentStyle = {
    textAlign: 'center',
    backgroundColor: 'white'
};

const MainPage = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const [todoEdit, setTodoEdit] = useState();
    const [open, setOpen] = useState(false);
    const { status } = useSelector((state) => state.filters)

    const handlerCreate = () => {
        setTodoEdit();
        setOpen(true);
    };

    const handlerEdit = (todo) => { 
        setTodoEdit(todo);
        setOpen(true);
    };

    const handleSave = (values) => {
        if (values && values.id) {
            const promise = dispatch(updateTodo(values));
            promise.then( 
                x=> success(),
                x=> error())
        }
        else if (values) {
            const promise = dispatch(saveNewTodo(values));
            promise.then( 
                x=> success(),
                x=> error())
        }
        setOpen(false);
    };

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

    const onStatusChange = (status) => dispatch(statusFilterChanged(status))

    return (
        <Layout>
            <Content style={contentStyle}>
                <Title level={1}>To Do List</Title>
                <Divider /> 
                {contextHolder}
                <Button type="primary" onClick={handlerCreate} ghost icon={<PlusOutlined />}>
                    Add New Task
                </Button>
                <Row>
                    <Col span={16} offset={4}>
                        <TodoList onClickEditTodo={handlerEdit} />
                    </Col>
                </Row>
                <FilterTodoList option={status} onClick={onStatusChange} />
                <Divider /> 
                <Row>
                    <Col span={4} offset={10}>
                        <CategoryLegend />
                    </Col>
                </Row>
            </Content>
            <ModalTodoCreateEdit
                openModal={open}
                handleSave={handleSave}
                todoEdit={todoEdit}
            />
        </Layout>
    )
}

export default MainPage