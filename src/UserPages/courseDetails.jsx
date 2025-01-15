import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EnrollCourseRequest, GetCourseById, GetCourseEnrollmentStatus, getMainVideoByCourseId, getOnlineTrainingVideosByCourseId, GetVideoById } from "../Services/userApiService";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";


const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [mainVideos, setMainVideos] = useState([]);
    const [traningVideos, setTraningVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [otp, setOtp] = useState(null);
    const [playbackInfo, setplaybackInfo] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);

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
            if(res?.data?.isPass){
                setIsEnrolled(true);
            }
        } catch (err) {
            toast.error(err)
            console.error(err)
        }
    }

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
                        {
                            isEnrolled ? (
                                <>  <h5 className="mb-4 mt-2">محتوي الكورس</h5>
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
                                                            <div
                                                                onClick={() => videoPlay(video.id)}
                                                                key={index}
                                                                style={{ cursor: 'pointer' }}
                                                                className="accordion-body border border-bottom border-1 text-decoration-underline text-primary"
                                                            >
                                                                {video.title}
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
                                                            <div
                                                                onClick={() => videoPlay(video.id)}
                                                                key={index}
                                                                style={{ cursor: 'pointer' }}
                                                                className="accordion-body border border-bottom border-1 text-decoration-underline text-primary"
                                                            >
                                                                {video.title}
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
                              )
                        }


                    </div>
                </div>
            ) : (
                <ClipLoader color="#00BFFF" loading={loading} size={50} />
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

