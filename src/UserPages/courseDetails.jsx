import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EnrollCourseRequest, GetCourseById, GetCourseEnrollmentStatus, getMainVideoByCourseId, getOnlineTrainingVideosByCourseId, GetVideoById } from "../Services/userApiService";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DeleteVideo, UploadNewVideo } from "../Services/adminApiService";
import AddBtn from "../adminComponents/addBtn/AddBtn";
import ActionBtn from "../adminComponents/ActionBtn";
import ConfirmModal from "../sharedComponents/modal/comfirmModal";
import defaultCover from '/Untitled design.jpg';

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
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [videoDeletedId, setvideoDeletedId] = useState('');


    useEffect(() => {
        getCoursesDetails();
        getCourseEnrollmentStatus();
    }, [isEnrolled]);

    const getCoursesDetails = async () => {
        try {
            const mainVideosResponse = await getMainVideoByCourseId(id);
            const traningVideosResponse = await getOnlineTrainingVideosByCourseId(id);
            const courseResponse = await GetCourseById(id);
            setMainVideos(mainVideosResponse?.data?.data || []);
            setTraningVideos(traningVideosResponse?.data?.data || [])
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

            if (res?.data?.isPass) {
                setIsVideoPlaying(true);
                setOtp(res?.data?.data?.otp);
                setplaybackInfo(res?.data?.data?.playbackInfo);

            } else {
                toast.error(res?.data?.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("خطأ في تحميل الفيديو");
        }
    };
    const deleteVideo = async () => {
        try {
            const res = await DeleteVideo(videoDeletedId);
            if (res?.data?.isPass) {
                setShowDeleteConfirm(false)
                const mainVideosResponse = await getMainVideoByCourseId(id);
                const traningVideosResponse = await getOnlineTrainingVideosByCourseId(id);
                setMainVideos(mainVideosResponse?.data?.data || [])
                setTraningVideos(traningVideosResponse?.data?.data || []);
                toast.success(res?.data?.message);
                getCoursesDetails();
            } else {
                toast.error(res?.data?.message || "Failed to delete video");
            }
        } catch (err) {
            console.error("Error deleting video:", err);
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
            setLoading(false);
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
                                    onError={(e) => (e.target.src = defaultCover)}
                                    height="80%"
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
                                        <AddBtn onClick={() => setShowModal(true)} />
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
                                                {mainVideos?.length > 0 ? (
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
                                                                <div className="w-50">
                                                                    <ActionBtn onClick={() => {
                                                                        setShowDeleteConfirm(true)
                                                                        setvideoDeletedId(video.id)
                                                                    }} />
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
                                            onChange={handleFileChange}
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
            <ConfirmModal
                show={showDeleteConfirm}
                onHide={() => setShowDeleteConfirm(false)}
                onConfirm={deleteVideo}
                title="تأكيد الحذف"
                message="هل أنت متأكد أنك تريد حذف هذا الفيديو؟"
            />
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
            <div class="container mt-5">
        <div class="card shadow p-4">
            <h2 class="text-center text-primary">شروط الاشتراك في ستارز أكاديمي</h2>
            <p class="text-muted">عزيزي المشترك، نرحب بك في ستارز أكاديمي ونتمنى لك رحلة تعليمية مليئة بالنجاح والتطور. قبل بدء رحلتك معنا، يرجى قراءة الشروط التالية بعناية لضمان تجربة سلسة وفعالة:</p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>عدم استرجاع رسوم الاشتراك:</strong> رسوم الاشتراك غير قابلة للاسترجاع تحت أي ظرف، لذا تأكد من قرارك قبل التسجيل.</li>
                <li class="list-group-item"><strong>مدة الدورة والمتابعة:</strong> مدة الدورة 3 شهور شاملة المتابعة، مما يضمن لك الاستفادة القصوى من المحتوى والتدريب.</li>
                <li class="list-group-item"><strong>الالتزام بحضور المحاضرات:</strong> سواء كنت تحضر أونلاين أو أوفلاين، يجب الالتزام بالمواعيد المحددة للمحاضرات لضمان تحقيق أقصى استفادة.</li>
                <li class="list-group-item"><strong>التواصل في حالة عدم المتابعة:</strong> في حال واجهت أي مشكلة تمنعك من المتابعة، يرجى التواصل مع خدمة العملاء لحلها في أسرع وقت.</li>
                <li class="list-group-item"><strong>حق الكوتش في تنظيم الجروب:</strong> في حالة عدم الالتزام بالحضور أو المتابعة، يحق للكوتش إخراجك من الجروب لضمان جدية المجموعة.</li>
                <li class="list-group-item"><strong>الإبلاغ عن الظروف الطارئة:</strong> إذا واجهت أي ظروف تمنعك من الالتزام، برجاء إبلاغ الكوتش الخاص بك مسبقًا.</li>
                <li class="list-group-item"><strong>الاحترام المتبادل:</strong> يجب احترام جميع الكوتشات داخل الأكاديمية. يُمنع تمامًا استخدام أي ألفاظ غير لائقة أو إساءة لأي شخص داخل الأكاديمية.</li>
                <li class="list-group-item"><strong>المسؤولية القانونية:</strong> في حالة التشهير بالأكاديمية أو نشر تعليقات سلبية غير مبررة على مواقع التواصل الاجتماعي، سيتم اتخاذ الإجراءات القانونية اللازمة.</li>
                <li class="list-group-item"><strong>الالتزام بجدية التعلم:</strong> الأكاديمية توفر لك كل الأدوات والفرص للنجاح، ولكن تحقيق النتائج يعتمد على مدى جديتك والتزامك بالتدريب والتطبيق.</li>
                <li class="list-group-item"><strong>عدم مشاركة حسابك مع شخص آخر:</strong> الحساب الذي يتم التسجيل به مخصص لك فقط، ولا يحق لك مشاركته مع أي شخص آخر.</li>
            </ul>
            <p class="text-center fw-bold text-success mt-3">نتمنى لك رحلة مليئة بالنجاح والتطوير داخل ستارز أكاديمي!</p>
        </div>
    </div>
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

