import { Typography } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { CategoryCreate } from './features/categories/category-create';
import { CategoryEdit } from './features/categories/category-edit';
import { CategoryList } from './features/categories/category-list';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Box component="main" sx={{ height: "100vh", backgroundColor: (theme) => theme.palette.grey[900] }}>
        <Header />
        <Layout>
          <Routes>
            <Route path='/' element={<CategoryList />} />
            <Route path='categories' element={<CategoryList />} />
            <Route path='categories/create' element={<CategoryCreate />} />
            <Route path='categories/edit/:id' element={<CategoryEdit />} />

            <Route path='*' element={
              <Box sx={{ color: "white" }}>
                <Typography variant='h1'>404</Typography>
                <Typography variant='h2'>Page not found</Typography>
              </Box>
            } />
          </Routes>
        </Layout>
      </Box>
    </ThemeProvider>
  )
}

export default App;
