import React from 'react'
import { List, Typography } from 'antd';
import CategoryCircle from '../CategoryCircle/CategoryCircle';
import { useSelector } from 'react-redux'
import { selectCategories } from '../Category/categoriesSlice'

const { Text } = Typography;

const CategoryListItem = React.memo(function CategoryListItem({ id, categoryName, categoryColor }) {
    return (
        <List.Item>
            <Text type='secondary'>{categoryName}</Text>
            <CategoryCircle title={categoryName} bgColor={categoryColor} />
        </List.Item>
    )
})

const renderCategory = () => (category) => {
    const { id, name, color } = category
    return <CategoryListItem key={id}
        categoryName={name}
        categoryColor={color} />
}


const CategoryLegend = () => {

    const categories = useSelector(selectCategories)
    const loadingStatus = useSelector((state) => state.todos.status)

    if (loadingStatus === 'loading') {
        return (
            <div className="todo-list">
                <div className="loader" />
            </div>
        )
    }

    return (
        <>
            <List
                style={{ marginTop: '1%' }}
                size="small"
                bordered={false}
                dataSource={categories}
                renderItem={(item) => renderCategory()(item)}
            />
        </>
    )
}

CategoryLegend.propTypes = {
}


export default CategoryLegend