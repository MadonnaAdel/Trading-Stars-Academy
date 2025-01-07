import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const CourseDetails = () => {
    return (
        <div className="container my-5">
            <div className="row " style={{ marginTop: "150px" }}>
            <div className="col-lg-8 video-section">
                    <div className="video-placeholder position-relative rounded-4 border border-1 overflow-hidden border-primary-subtle ">
                        <div className="w-100 h-100 ">
                            <img src="../../public/Untitled design.png" alt="cover image course" width="100%" />
                        </div>

                        <div className="play-btn">
                            <i className="bi bi-play-fill"></i>
                        </div>
                        <p className="text-center text-muted">
                            Sign in before you view the course to earn a certificate of
                            completion and access exercise files
                        </p>
                    </div>
                </div>
                <div className="col-lg-4 contents-section mb-4  ">
                    <h5 className="mb-4">محتوي الكورس</h5>

                    <div className="border border-1 border-primary-subtle rounded-4 overflow-auto" style={{maxHeight: '300px'}}>
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
                        <button className="btn btn-primary w-100 mt-3">ادفع الآن 300 جنيه للاشتراك</button>

                </div>
            </div>
        </div>
    );
};

export default CourseDetails;