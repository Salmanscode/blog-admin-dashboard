import React, { createContext, useContext, useState, useEffect } from 'react';
import { migrateData, getCurrentSchemaVersion, getStoredSchemaVersion, setSchemaVersion } from '../utils/migrations';

const BlogContext = createContext();

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlog must be used within a BlogProvider');
    }
    return context;
};

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load blogs from localStorage with migration
    useEffect(() => {
        const loadBlogs = () => {
            try {
                const storedBlogs = localStorage.getItem('blogs');
                const storedVersion = getStoredSchemaVersion();
                const currentVersion = getCurrentSchemaVersion();

                let blogsData = storedBlogs ? JSON.parse(storedBlogs) : [];

                // Run migration if needed
                if (storedVersion < currentVersion) {
                    console.log(`🔄 Migrating data from version ${storedVersion} to ${currentVersion}`);
                    blogsData = migrateData(blogsData, storedVersion);
                    setSchemaVersion(currentVersion);

                    // Save migrated data
                    localStorage.setItem('blogs', JSON.stringify(blogsData));
                }

                setBlogs(blogsData);
            } catch (error) {
                console.error('Error loading blogs:', error);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, []);

    // Save blogs to localStorage whenever they change
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('blogs', JSON.stringify(blogs));
        }
    }, [blogs, loading]);

    const addBlog = (blog) => {
        const newBlog = {
            ...blog,
            id: Date.now().toString(),
            publishDate: blog.publishDate || new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setBlogs(prev => [newBlog, ...prev]);
        return newBlog;
    };

    const updateBlog = (id, updatedData) => {
        setBlogs(prev =>
            prev.map(blog =>
                blog.id === id
                    ? { ...blog, ...updatedData, updatedAt: new Date().toISOString() }
                    : blog
            )
        );
    };

    const deleteBlog = (id) => {
        setBlogs(prev => prev.filter(blog => blog.id !== id));
    };

    const getBlogById = (id) => {
        return blogs.find(blog => blog.id === id);
    };

    const value = {
        blogs,
        loading,
        addBlog,
        updateBlog,
        deleteBlog,
        getBlogById
    };

    return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
