import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AddNewCategory, DeleteVideo, EnrollCourseRequest, GetCourseById, GetCourseEnrollmentStatus, getMainVideoByCourseId, getOnlineTrainingVideosByCourseId, GetVideoById, UploadNewVideo } from "../Services/userApiService";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import { Formik, Field, Form, useFormik } from "formik";
import * as Yup from "yup";

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [mainVideos, setMainVideos] = useState([]);
    const [traningVideos, setTraningVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addLoading, setAddLoading] = useState(false); 
    const { user } = useAuth();
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [otp, setOtp] = useState(null);
    const [playbackInfo, setplaybackInfo] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getCoursesDetails();
        getCourseEnrollmentStatus();
    }, [isEnrolled]);

    const getCoursesDetails = async () => {
        try {
            const mainVideosResponse = await getMainVideoByCourseId(id);
            const traningVideosResponse = await getOnlineTrainingVideosByCourseId(id);
            const courseResponse = await GetCourseById(id);

            if (mainVideosResponse?.data?.isPass) {
                setMainVideos(mainVideosResponse?.data?.data);
            }
            if (traningVideosResponse?.data?.isPass) {
                setTraningVideos(traningVideosResponse?.data?.data);
            }

            if (courseResponse?.data?.isPass) {
                setCourse(courseResponse?.data?.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getCourseEnrollmentStatus = async () => {
        try {
            const res = await GetCourseEnrollmentStatus(user?.id, id);
            if (res?.data?.isPass) {
                setIsEnrolled(true);
            }
        } catch (err) {
            toast.error(err);
            console.error(err);
        }
    };

    const EnrollmentRequest = async () => {
        try {
            const res = await EnrollCourseRequest({
                userId: user.id,
                courseId: id,
            });
            res?.data?.isPass
                ? toast.success(res.data.message)
                : toast.info(res.data.message);
        } catch (err) {
            console.error(err);
            toast.error("حدث خطأ. يرجى المحاولة مرة أخرى.");
        }
    };

    const videoPlay = async (id) => {
        try {
            const res = await GetVideoById(id);
            console.log("Response:", res);
            if (res?.data?.isPass) {
                setIsVideoPlaying(true);
                setOtp(res?.data?.data?.otp);
                setplaybackInfo(res?.data?.data?.playbackInfo);
                console.log("OTP:", res?.data?.data?.otp, "PlaybackInfo:", res?.data?.data?.playbackInfo);
            } else {
                toast.error(res?.data?.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("خطأ في تحميل الفيديو");
        }
    };

    const deleteVideo = async (id) => {
        try {
            const res = await DeleteVideo(id);
            console.log("Response:", id);
            if (res?.data?.isPass) {
                toast.success(res?.data?.message);
                getCoursesDetails();
                console.log(id);
            } else {
                toast.error(res?.data?.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("خطأ في تحميل الفيديو");
        }
    };

    const validationSchema = Yup.object().shape({
        Title: Yup.string().required('اسم الفيديو مطلوب'),
        VideoType: Yup.number().required('نوع الفيديو مطلوب'),
        VideoFile: Yup.mixed().required(' الفيديو مطلوب'),
    });

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        formik.setFieldValue(name, files[0]);
    };

    const handleAddVideo = async (values) => {
    setAddLoading(true);  
    try {
        const res = await UploadNewVideo(values, id);
        if (res?.data?.isPass) {
            toast.success(res?.data?.message);
            setShowModal(false);
            setAddLoading(false);
            getCoursesDetails();
        } else {
            toast.info(res?.data?.message);
            setAddLoading(false);
        }
        
    } catch (err) {
        toast.error(err.message || "حدث خطأ");
        console.error(err);
    } finally {
        setLoading(false);  // إيقاف حالة التحميل بعد الانتهاء
    }
};

    const formik = useFormik({
        initialValues: {
            Title: '',
            VideoFile: null,
            VideoType: 0
        },
        validationSchema: validationSchema,
        onSubmit: handleAddVideo,
    });
    const handleSelectChange = (fieldName) => (event) => {
        let value = event.target.value;
        if (!isNaN(value)) value = Number(value);

        formik.setFieldValue(fieldName, value);
    };
    return (
        <div className="container my-5">
            {!loading && course ? (
                <div className="row" style={{ marginTop: "150px" }}>
                    <div className="col-lg-8 video-section">
                        <div className="video-placeholder position-relative rounded-4 border border-1 overflow-hidden border-primary-subtle">
                            {isVideoPlaying ? (
                                <div style={{ paddingTop: "52.73%", position: "relative" }}>
                                    <iframe
                                        src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`}
                                        style={{
                                            border: "0",
                                            maxWidth: "100%",
                                            position: "absolute",
                                            top: "0",
                                            left: "0",
                                            height: "100%",
                                            width: "100%",
                                        }}
                                        allowFullScreen
                                        allow="encrypted-media"
                                    />
                                </div>
                            ) : (
                                <img
                                    src={course?.imageUrl}
                                    alt="cover image course"
                                    width="100%"
                                    onError={(e) => (e.target.src = "/Untitled design.png")}
                                />
                            )}
                            <div className="p-3">
                                <h2>{course?.name}</h2>
                                <p className="text-muted">{course?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 contents-section mb-4">
                        {isEnrolled ? (
                            <>
                                <div className="d-flex justify-content-between align-content-center mb-3 mt-2">
                                    <h5>محتوي الكورس</h5>
                                    {user.role === "Admin" &&
                                        <button className="btn btn-outline-primary" onClick={() => setShowModal(true)}>
                                            إضافة فيديو
                                        </button>
                                    }

                                </div>
                                <div
                                    className="border border-1 border-primary-subtle rounded-4 overflow-auto"
                                    style={{ maxHeight: "300px" }}
                                >
                                    <div className="accordion accordion-flush" id="accordionFlushExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="flush-headingOne">
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#flush-collapseOne"
                                                    aria-expanded="false"
                                                    aria-controls="flush-collapseOne"
                                                >
                                                    الدروس الاساسية
                                                </button>
                                            </h2>
                                            <div
                                                id="flush-collapseOne"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="flush-headingOne"
                                                data-bs-parent="#accordionFlushExample"
                                            >
                                                {mainVideos.length > 0 ? (
                                                    mainVideos.map((video, index) => (
                                                        <div className="d-flex w-100 align-items-center justify-content-between accordion-body border border-bottom border-1" key={index}>
                                                            <div
                                                                onClick={() => videoPlay(video.id)}
                                                                style={{ cursor: "pointer" }}
                                                                className="text-decoration-underline text-primary"
                                                            >
                                                                {video.title}
                                                            </div>
                                                            {user.role === "Admin" && (
                                                                <div className="btn btn-outline-danger" onClick={() => deleteVideo(video.id)}>
                                                                    حذف
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="p-3">لا يوجد فيديوهات اساسية الي الان</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="flush-headingTwo">
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#flush-collapseTwo"
                                                    aria-expanded="false"
                                                    aria-controls="flush-collapseTwo"
                                                >
                                                    تدريبات اونلاين
                                                </button>
                                            </h2>
                                            <div
                                                id="flush-collapseTwo"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="flush-headingTwo"
                                                data-bs-parent="#accordionFlushExample"
                                            >
                                                {traningVideos.length > 0 ? (
                                                    traningVideos.map((video, index) => (
                                                        <div className="d-flex w-100 align-items-center justify-content-between accordion-body border border-bottom border-1" key={index}>
                                                            <div
                                                                onClick={() => videoPlay(video.id)}
                                                                style={{ cursor: "pointer" }}
                                                                className="text-decoration-underline text-primary"
                                                            >
                                                                {video.title}
                                                            </div>
                                                            {user.role === "Admin" && (
                                                                <div className="btn btn-outline-danger" onClick={() => deleteVideo(video.id)}>
                                                                    حذف
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="p-3">لا يوجد تدريبات اونلاين الي الان</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <CourseEnrollment course={course} EnrollmentRequest={EnrollmentRequest} />
                        )}
                    </div>
                </div>
            ) : (
                <ClipLoader color="#00BFFF" loading={loading} size={50} />
            )}
            {/* <AddVideoPopup show={showAddVideoPopup} onClose={() => setShowAddVideoPopup(false)} onAddVideo={addVideo} /> */}
            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">إضافة فيديو جديد </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="Title" className="form-label">اسم الفيديو</label>
                                        <input
                                            type="text"
                                            name="Title"
                                            className="form-control"
                                            onChange={formik.handleChange}
                                            value={formik.values.Title}
                                        />
                                        {formik.errors.Title && formik.touched.Title && (
                                            <div className="text-danger">{formik.errors.Title}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="VideoType" className="form-label">نوع الفيديو</label>
                                        <select
                                            name="VideoType"
                                            className="form-control"
                                            onChange={handleSelectChange("VideoType")}
                                            value={formik.values.VideoType}
                                        >
                                            <option value="">اختر نوع الفيديو</option>
                                            <option value="0">فيديوهات اساسية</option>
                                            <option value="1">فيديوهات تدريبات اونلاين</option>
                                        </select>
                                        {formik.errors.VideoType && formik.touched.VideoType && (
                                            <div className="text-danger">{formik.errors.VideoType}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="VideoFile" className="form-label">الفيديو</label>
                                        <input
                                            type="file"
                                            name="VideoFile"
                                            className="form-control"
                                            onChange={handleFileChange} // هنا
                                        />
                                        {formik.errors.VideoFile && formik.touched.VideoFile && (
                                            <div className="text-danger">{formik.errors.VideoFile}</div>
                                        )}
                                    </div>

                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        إلغاء
                                    </button>
                                    <button 
    type="submit" 
    className="btn btn-primary" 
    disabled={addLoading}  
>
    {addLoading ? (
        <>
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span className="visually-hidden" role="status">Loading...</span>
            جاري تحميل الفيديو...
        </>
    ) : "إضافة"}
</button>

                                </div>
                            </form>



                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetails;


function CourseEnrollment({ course, EnrollmentRequest }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    return (
        <div className="course-enrollment mt-4">
            <p className="text-center">يمكنك رؤية محتوى الكورس فقط بعد دفع الاشتراك</p>

            <div className="terms-and-conditions mt-3">
                <h5>الشروط والأحكام:</h5>
                <ul>
                    <li>شرط 1</li>
                    <li>شرط 2</li>
                    <li>شرط 3</li>
                </ul>
                <div className="form-check mt-2">
                    <input
                        type="checkbox"
                        id="terms"
                        className="form-check-input"
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms" className="form-check-label">
                        موافق
                    </label>
                </div>
            </div>

            <div className="payment-method mt-4">
                <p>
                    اختر طريقة <Link to="/payment-methods">الدفع</Link> ثم اشترك
                </p>
            </div>

            <button
                className="btn btn-primary w-100 mt-3"
                onClick={EnrollmentRequest}
                disabled={!isChecked || !course?.price}
            >
                {course?.price} جنيه للاشتراك
            </button>
        </div>
    );
}

const AddVideoPopup = ({ show, onClose, onAddVideo }) => {
    return (
        show && (
            <div className="popup-overlay">
                <div className="popup-content">
                    <button className="btn-close" onClick={onClose}>
                        ×
                    </button>
                    <h4>إضافة فيديو</h4>
                    <Formik
                        initialValues={{
                            title: "",
                            videoUrl: "",
                            videoType: "main", // default to main video
                        }}
                        validationSchema={Yup.object({
                            title: Yup.string().required("الرجاء إدخال عنوان الفيديو"),
                            videoUrl: Yup.string().required("الرجاء إدخال رابط الفيديو"),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            onAddVideo(values);
                            setSubmitting(false);
                            onClose(); // Close popup after submitting
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        العنوان
                                    </label>
                                    <Field
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="videoUrl" className="form-label">
                                        رابط الفيديو
                                    </label>
                                    <Field
                                        type="text"
                                        id="videoUrl"
                                        name="videoUrl"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="videoType" className="form-label">
                                        نوع الفيديو
                                    </label>
                                    <Field as="select" id="videoType" name="videoType" className="form-select">
                                        <option value="main">دروس أساسية</option>
                                        <option value="training">تدريبات أونلاين</option>
                                    </Field>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "إضافة..." : "إضافة الفيديو"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        )
    );
};
