import React from 'react'
import ModalEdit from './ModalCreateEdit'
import { useState } from 'react';

export default {
    title: "ModalEdit",
    component: ModalEdit
}

export const ModalEditExample = () => {

    const [open, setOpen] = useState(true);

    const handleSave = (values) => {
        if (values) {
            setTimeout(() => {
                setOpen(false);
            }, 2000);
        }
        else {
            setOpen(false);
        }
    };

    const todoData = {
        id: 1,
        text: 'Ant Design Title 1',
        date: new Date(),
        taskCategory: {
            id: 1,
            name: 'Health',
            color: '#1C89BF'
        },
        taskState: {
            name: 'Active'
        },
    }

    return (
        <>
            <ModalEdit
                openModal={open}
                handleSave={handleSave}
                todo={todoData}
            />
        </>
    );
}