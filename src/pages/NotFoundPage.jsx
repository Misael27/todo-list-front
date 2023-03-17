import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button } from 'antd';

const { Text } = Typography;

const NotFoundPage = () => {
    return (
        <>
            <Text>{'404 | La página no existe'}</Text>                             
            <Button
                component={Link}
                to="/main">
                Volver al inicio
            </Button>
        </>
    )
}

export default NotFoundPage