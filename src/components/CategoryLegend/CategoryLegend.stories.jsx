import React from 'react'
import CategoryLegend from './CategoryLegend'

export default {
    title: "CategoryLegend",
    component: CategoryLegend
}

export const TodoExample = () => {

    const categories = [
        {
            id:1, 
            name:"Health", 
            color:"#1C89BF"
        },
        {
            id:1, 
            name:"Work", 
            color:"#52c41a"
        }
    ]

    return (
        <>
            <CategoryLegend categories={categories}/>
        </>
        );
    }