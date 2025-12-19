import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { CreateBlog } from './pages/CreateBlog';
import { EditBlog } from './pages/EditBlog';

function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="create" element={<CreateBlog />} />
            <Route path="edit/:id" element={<EditBlog />} />
          </Route>
        </Routes>
      </BlogProvider>
    </BrowserRouter>
  );
}

export default App;
