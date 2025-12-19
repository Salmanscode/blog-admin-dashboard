import React, { useState, useMemo } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Filter, Calendar, User, Plus, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { useBlog } from '../context/BlogContext';
import { usePagination } from '../hooks/usePagination';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

const CATEGORIES = [
    { value: '', label: 'All Categories' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Business', label: 'Business' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'Health', label: 'Health' },
    { value: 'Travel', label: 'Travel' },
];

const STATUS_OPTIONS = [
    { value: '', label: 'All Statuses' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' },
];

export const Dashboard = () => {
    const navigate = useNavigate();
    const { searchTerm } = useOutletContext();
    const { blogs, deleteBlog } = useBlog();

    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, blogId: null });

    // Filter blogs based on search and filters
    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            const matchesSearch =
                (blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
                (blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
                (blog.author?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

            const matchesCategory = !categoryFilter || blog.category === categoryFilter;
            const matchesStatus = !statusFilter || blog.status === statusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [blogs, searchTerm, categoryFilter, statusFilter]);

    // Pagination
    const {
        currentPage,
        itemsPerPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage,
        changeItemsPerPage,
        startIndex,
        endIndex
    } = usePagination(filteredBlogs.length, 5);

    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

    const handleDelete = (id) => {
        setDeleteModal({ isOpen: true, blogId: id });
    };

    const confirmDelete = () => {
        try {
            console.log('🗑️ Attempting to delete blog:', deleteModal.blogId);
            deleteBlog(deleteModal.blogId);
            setDeleteModal({ isOpen: false, blogId: null });
            console.log('✅ Blog deleted successfully');
        } catch (error) {
            console.error('❌ Error deleting blog:', error);
            setDeleteModal({ isOpen: false, blogId: null });
        }
    };

    const getStatusVariant = (status) => {
        const variants = {
            published: 'published',
            draft: 'draft',
            archived: 'archived'
        };
        return variants[status] || 'default';
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
                    <p className="text-sm text-slate-500 font-medium">Manage and monitor your content</p>
                </div>
                <Button onClick={() => navigate('/create')} size="md" className="w-full sm:w-auto shadow-sm">
                    <Plus size={18} />
                    New Post
                </Button>
            </div>

            {/* Stats Cards - Minimalist Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Posts', value: blogs.length, color: 'text-slate-900' },
                    { label: 'Published', value: blogs.filter(b => b.status === 'published').length, color: 'text-emerald-600' },
                    { label: 'Drafts', value: blogs.filter(b => b.status === 'draft').length, color: 'text-orange-500' },
                    { label: 'Archived', value: blogs.filter(b => b.status === 'archived').length, color: 'text-slate-400' }
                ].map((stat, i) => (
                    <Card key={i} className="p-4 sm:p-6" hover={false}>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">{stat.label}</p>
                        <p className={`text-2xl font-bold tracking-tight ${stat.color}`}>{stat.value}</p>
                    </Card>
                ))}
            </div>

            {/* Filters - Minimalist Bar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Select
                        options={CATEGORIES}
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="text-xs border-none bg-transparent hover:bg-white transition-colors"
                    />
                    <Select
                        options={STATUS_OPTIONS}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="text-xs border-none bg-transparent hover:bg-white transition-colors"
                    />
                    <Select
                        options={[
                            { value: 5, label: '5 per page' },
                            { value: 10, label: '10 per page' },
                            { value: 20, label: '20 per page' },
                        ]}
                        value={itemsPerPage}
                        onChange={(e) => changeItemsPerPage(Number(e.target.value))}
                        className="text-xs border-none bg-transparent hover:bg-white transition-colors"
                    />
                </div>
            </div>

            {/* Blog List */}
            {paginatedBlogs.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="text-slate-300" size={32} />
                    </div>
                    <p className="text-slate-900 font-semibold text-lg">No posts found</p>
                    <p className="text-slate-500 text-sm mb-6">Try adjusting your filters or search term.</p>
                    <Button variant="secondary" onClick={() => navigate('/create')}>
                        Create First Post
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {paginatedBlogs.map((blog) => (
                        <Card key={blog.id} className="group overflow-hidden">
                            <div className="flex flex-col sm:flex-row h-full">
                                {/* Image Overlay/Container */}
                                {blog.image && (
                                    <div className="relative w-full sm:w-48 lg:w-64 h-56 overflow-hidden bg-slate-100 flex-shrink-0">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <Badge variant={getStatusVariant(blog.status)} className="shadow-sm capitalize">
                                                {blog.status}
                                            </Badge>
                                        </div>
                                    </div>
                                )}

                                {/* Content Area */}
                                <div className="flex-1 p-5 sm:p-6 flex flex-col min-w-0">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-600 mb-2">
                                            <span>{blog.category}</span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-slate-500">
                                                {(() => {
                                                    try {
                                                        return blog.publishDate ? format(new Date(blog.publishDate), 'MMM dd, yyyy') : 'No date';
                                                    } catch (e) {
                                                        return 'Invalid date';
                                                    }
                                                })()}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors truncate">
                                            {blog.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
                                            {blog.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                {blog.author?.[0]}
                                            </div>
                                            <span className="text-xs font-medium text-slate-600 truncate max-w-[100px]">{blog.author}</span>
                                        </div>

                                        <div className="flex gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => navigate(`/edit/${blog.id}`)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Pencil size={14} />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(blog.id)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm">
                    <p className="hidden sm:block text-xs font-medium text-slate-500">
                        Showing <span className="text-slate-900">{startIndex + 1}</span>-
                        <span className="text-slate-900">{Math.min(endIndex, filteredBlogs.length)}</span> of
                        <span className="text-slate-900"> {filteredBlogs.length}</span> results
                    </p>

                    <div className="flex gap-1 mx-auto sm:mx-0">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="text-xs"
                        >
                            Prev
                        </Button>

                        <div className="hidden md:flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? 'primary' : 'ghost'}
                                    size="sm"
                                    onClick={() => goToPage(page)}
                                    className="w-8 h-8 p-0 text-xs"
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>

                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="text-xs"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, blogId: null })}
                title="Delete Blog Post"
                size="sm"
            >
                <div className="space-y-4">
                    <p className="text-slate-600">
                        Are you sure you want to delete this blog post? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteModal({ isOpen: false, blogId: null })}
                        >
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
