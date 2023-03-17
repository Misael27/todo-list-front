import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd';


const CategoryCircle = ({ title, bgColor }) => {
    const circleStyle = {
        backgroundColor: bgColor,
        borderRadius: "50%",
        width:17,
        height:17
    };
    return (
        <Tooltip placement="top" title={title}>
            <div style={circleStyle}></div>
        </Tooltip>
    )
}

CategoryCircle.propTypes = {
    title: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired
}

export default CategoryCircle