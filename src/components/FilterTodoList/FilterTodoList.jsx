import React from 'react'
import PropTypes from 'prop-types'
import { Button, Space } from 'antd';

const FilterTodoList = ({ option, onClick }) => {
    const ALL = 'all';
    const ACTIVE = 'active';
    const COMPLETED = 'completed';
    const primary = 'primary';

    return (
        <Space wrap style={{ marginTop: '1%' }}>
            <Button onClick={() => onClick(ALL)} type={option === ALL ? primary : ''}>All</Button>
            <Button onClick={() => onClick(ACTIVE)} type={option === ACTIVE ? primary : ''}>Active</Button>
            <Button onClick={() => onClick(COMPLETED)} type={option === COMPLETED ? primary : ''}>Completed</Button>
        </Space>
    );
}

FilterTodoList.propTypes = {
    option: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default FilterTodoList