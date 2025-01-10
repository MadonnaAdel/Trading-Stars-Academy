import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EnrollCourseRequest, GetCourseById } from "../Services/userApiService";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(true);
    const { user, isLoggedIn } = useAuth()
    useEffect(() => {
        getCoursesDetails()
    }, [])
    const getCoursesDetails = async () => {
        try {
            const res = await GetCourseById(id);
            setCourse(res.data.data)
        } catch (err) { console.error(err) } finally {
            setLoading(false);
        }
    }
    const EnrollmentRequest = async () => {
        try {
            const res = await EnrollCourseRequest({
                "userId": user.id,
                "courseId": id
            });
            res?.data?.ispass ? toast.success(res.data.message) : toast.info(res.data.message);
        } catch (err) {
            console.error(err)
            toast.error("حدث خطأ. يرجى المحاولة مرة أخرى.");
        }
    }
    return (
        <div className="container my-5">
            {!loading && course ? (

                <div className="row " style={{ marginTop: "150px" }}>
                    <div className="col-lg-8 video-section">
                        <div className="video-placeholder position-relative rounded-4 border border-1 overflow-hidden border-primary-subtle ">
                            <div className="w-100 h-100 ">
                                <img src={course?.imageUrl} alt="cover image course" width="100%" onError={(e) => e.target.src = '/Untitled design.png'} />
                            </div>
                            <div className="p-3">
                                <h2>{course?.name}</h2>

                                <p className=" text-muted">
                                    {course?.description}
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-4 contents-section mb-4  ">
                        <h5 className="mb-4 mt-2">محتوي الكورس</h5>

                        <div className="border border-1 border-primary-subtle rounded-4 overflow-auto" style={{ maxHeight: '300px' }}>
                            <div class="accordion accordion-flush " id="accordionFlushExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            المحاضرة الاولي
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne border-bottom border-1" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                                    </div>
                                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                                    </div>
                                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            المحاضرة التانية
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                            المحاضرة التالتة
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary w-100 mt-3" onClick={EnrollmentRequest}>ادفع الآن {course?.price} جنيه للاشتراك</button>
                    </div>
                </div>
            ) : (<ClipLoader color="#00BFFF" loading={loading} size={50} />)}
        </div>
    );
};

export default CourseDetails;