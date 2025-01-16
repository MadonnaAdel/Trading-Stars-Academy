
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GetAllCategories } from '../Services/userApiService';
import { Link } from 'react-router-dom';
import { AddNewCategory, DeleteCategory, UpdateCategory } from '../Services/adminApiService';

export default function ManageCategories() {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);

    const getAllCategories = async () => {
        try {
            const res = await GetAllCategories(currentPage, itemsPerPage);
            if (res?.data?.isPass) {
                setCategories(res.data.data.paginatedData);
                setTotalPages(res.data.data.numberOfPages);

            } else {
                toast.info(res?.data?.message);
            }
        } catch (err) {
            toast.error(err.message);
            console.error(err);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) {
            toast.error('يرجى إدخال اسم الفئة');
            return;
        }
        try {
            const res = await AddNewCategory(newCategoryName);
            if (res?.data?.isPass) {
                toast.success('تم إضافة الفئة بنجاح');
                setShowModal(false);
                setNewCategoryName('');
                getAllCategories();
            } else {
                toast.error(res?.data?.message);
            }
        } catch (err) {
            toast.error('حدث خطأ أثناء إضافة الفئة');
            console.error(err);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const res = await DeleteCategory(id);
            if (res?.data?.isPass) {
                toast.success('تم حذف الفئة بنجاح');
                getAllCategories();
            } else {
                toast.error(res?.data?.message);
            }
        } catch (err) {
            toast.error('حدث خطأ أثناء حذف الفئة');
            console.error(err);
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setNewCategoryName(category.name);
        setShowEditModal(true);
    };

    const handleUpdateCategory = async () => {
        if (!newCategoryName.trim()) {
            toast.error('يرجى إدخال اسم الفئة');
            return;
        }
        try {
            const res = await UpdateCategory({ id: editingCategory.id, name: newCategoryName });
            if (res?.data?.isPass) {
                toast.success('تم تعديل الفئة بنجاح');
                setShowEditModal(false);
                setEditingCategory(null);
                setNewCategoryName('');
                getAllCategories();
            } else {
                toast.error(res?.data?.message);
            }
        } catch (err) {
            toast.error('حدث خطأ أثناء تعديل الفئة');
            console.error(err);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, [currentPage]);

    return (
        <section className="my-4" style={{ width: '80%' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>إدارة الفئات</h3>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    + إضافة فئة
                </button>
            </div>
            <div className="row">
                {categories.map((category) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-4" key={category.id}>
                        <div className="card">
                            <div className="card-header">فئة</div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title fs-5">{category.name}</h5>
                                </div>
                                <div className="d-flex justify-content-evenly mt-3">
                                    <button
                                        className="btn btn-outline-danger d-flex align-items-center"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >

                                        مسح
                                    </button>
                                    <button
                                        className="btn btn-outline-light d-flex align-items-center"
                                        onClick={() => handleEditCategory(category)}
                                    >

                                        تعديل
                                    </button>
                                    <Link to={`courses/${category.id}`} className="btn btn-outline-primary">
                                        الدورات
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
                <nav aria-label="Page navigation example" className="mt-4">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            >
                                &laquo;
                            </button>
                        </li>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <li
                                key={index}
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            >
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            )}


            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">إضافة فئة جديدة</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="اسم الفئة"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        إغلاق
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleAddCategory}
                                    >
                                        إضافة
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}


            {showEditModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">تعديل الفئة</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowEditModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="اسم الفئة"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowEditModal(false)}
                                    >
                                        إغلاق
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleUpdateCategory}
                                    >
                                        حفظ التعديلات
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
