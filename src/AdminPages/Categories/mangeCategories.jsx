import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GetAllCategories } from '../../Services/userApiService';
import { Link } from 'react-router-dom';
import { AddNewCategory, DeleteCategory, UpdateCategory } from '../../Services/adminApiService';
import style from './style.module.css';
import { FaEdit, FaEllipsisV, FaTrash } from 'react-icons/fa';
import AddBtn from '../../adminComponents/addBtn/AddBtn';
import Pagination from '../../sharedComponents/Pagination';
import ConfirmModal from '../../sharedComponents/modal/comfirmModal';
import ActionBtn from '../../adminComponents/ActionBtn';


export default function ManageCategories() {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

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

    const handleDeleteCategory = async () => {
        try {
            const res = await DeleteCategory(categoryToDelete);
            if (res?.data?.isPass) {
                toast.success(res?.data?.message);
                setShowDeleteConfirm(false);
                setCategoryToDelete(null);
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
                toast.success(res?.data?.message);
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
        <section className="mt-5" style={{ width: '82%' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className='fs-2 '>إدارة الفئات</h3>
                <AddBtn onClick={() => setShowModal(true)} label='اضافة فئة' />
            </div>
            <div className="row ">
                {categories?.map((category, index) => (
                    <div className="col-12 col-md-6 col-lg-3 my-4 ms-auto" key={category.id}>
                        <div className={style.card}>
                            <div className={style.cardDetails}>
                                <div className="d-flex justify-content-between align-content-center">
                                    <p className={style.textTitle}>{category.name}</p>
                                    <div className="dropdown">
                                        <button
                                            className="btn text-white dropdown-toggle p-1"
                                            type="button"
                                            id={`dropdownMenuButton${index}`}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <FaEllipsisV size="15" />
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby={`dropdownMenuButton${index}`}
                                        >
                                            <li className='w-100 px-4'>
                                                <ActionBtn onClick={() => {
                                                    setCategoryToDelete(category.id);
                                                    setShowDeleteConfirm(true);
                                                }} />
                                            </li>
                                            <li className='w-100 px-4'>
                                                <ActionBtn btnClass='btn-outline-light mt-3' onClick={() => handleEditCategory(category)} title="تعديل"  icon={ <FaEdit />}/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <Link to={`courses/${category.id}`} >
                                <button className={style.cardButton}>الدورات التعليمية</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
            <ConfirmModal
                show={showDeleteConfirm}
                onHide={() => setShowDeleteConfirm(false)}
                onConfirm={handleDeleteCategory}
                title="تأكيد الحذف"
                message="هل أنت متأكد أنك تريد حذف هذه الفئة؟"
            />
            {(showModal || showEditModal) && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {showModal ? "إضافة فئة" : "تعديل فئة"}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => {
                                            showModal ? setShowModal(false) : setShowEditModal(false);
                                        }}
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
                                        onClick={() => {
                                            showModal ? setShowModal(false) : setShowEditModal(false);
                                        }}
                                    >
                                        إغلاق
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={showModal ? handleAddCategory : handleUpdateCategory}
                                    >
                                        {showModal ? "إضافة" : "تعديل"}
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


