import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react';
import { Form, Input, Select, Modal, DatePicker } from 'antd';
import moment from "moment";
import { useSelector } from 'react-redux'
import { selectCategories } from '../Category/categoriesSlice'

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

const renderCategory = (category) => <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>

const ModalTodoCreateEdit = ({ openModal, handleSave, todoEdit }) => {
    const categories = useSelector(selectCategories)
    const loadingStatus = useSelector((state) => state.todos.status)

    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const onFinish = (values) => {
        setConfirmLoading(true);
        values.id = todoEdit && todoEdit.id; 
        handleSave(values);
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        setConfirmLoading(false);
        handleSave();
    };

    if (!todoEdit) {
        form.resetFields();
    }
    todoEdit && form.setFieldsValue({ text: todoEdit.text, date: moment(todoEdit.date), taskCategoryId: todoEdit.taskCategory.id });

    if (loadingStatus === 'loading') {
        return (
          <div className="todo-list">
            <div className="loader" />
          </div>
        )
      }

    return (
      <>
        <Modal
          title={!todoEdit ? 'Create Task' : 'Edit Task' }
          open={openModal}
          onOk={form.submit}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}>
                <Form.Item name="text" label="Task Text" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="date" label="DatePicker" rules={[{required: true}]}>
                    <DatePicker showTime={true} />
                </Form.Item>
                <Form.Item name="taskCategoryId" label="Category" rules={[{required: true}]}>
                    <Select placeholder="Select a category" allowClear>
                        {categories.map(category => renderCategory(category))}                        
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
      </>
    );
}

ModalTodoCreateEdit.propTypes = {
    openModal: PropTypes.bool.isRequired,
    handleSave: PropTypes.func.isRequired
}


export default ModalTodoCreateEdit