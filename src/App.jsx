import React from 'react'
import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import { ConfigProvider } from 'antd';
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { Provider } from 'react-redux';
import store from './redux/store'
import { fetchTodos } from './components/TodoList/todosSlice'
import { fetchcategories } from './components/Category/categoriesSlice'

store.dispatch(fetchTodos());
store.dispatch(fetchcategories());

const App = () => {
    return (
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#00b96b',
                    }
                }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Router>
            </ConfigProvider>
        </Provider>
    )
}

export default App