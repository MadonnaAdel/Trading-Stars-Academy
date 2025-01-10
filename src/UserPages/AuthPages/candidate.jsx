import * as Yup from "yup";
import { useFormik } from "formik";
import styles from "./style.module.css";
import { NavLink } from "react-router-dom";
import { RegisterAsCandidate } from "../../Services/userApiService";
import { toast } from "react-toastify";

export default function Candidate() {
    async function candidate(values) {
        try {
            const response = await RegisterAsCandidate(values);
            response?.data?.isPass ?
                toast.success(response?.data?.message) :
                toast.error(response?.data?.message);
        } catch (err) {
            console.error("Error:", err);
            toast.error("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
        }
    }

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required("هذا الحقل مطلوب")
            .min(2, "الرجاء إدخال أكثر من حرفين")
            .max(15, "الرجاء إدخال أقل من 15 حرف"),
        age: Yup.number()
            .required("هذا الحقل مطلوب")
        ,
        mobileNumber: Yup.string()
            .required("هذا الحقل مطلوب")
            .matches(/^01[0125][0-9]{8}$/, "الرجاء إدخال رقم هاتف صحيح"),
        whatsAppNumber: Yup.string()
            .required("هذا الحقل مطلوب")
            .matches(/^01[0125][0-9]{8}$/, "الرجاء إدخال رقم هاتف صحيح"),
        governomate: Yup.string().required("هذا الحقل مطلوب"),
        studyStatus: Yup.boolean().required("هذا الحقل مطلوب"),
        isHearedAboutTradingBefore: Yup.boolean().required("هذا الحقل مطلوب"),
        isHearedAboutAcademyBefore: Yup.boolean().required("هذا الحقل مطلوب"),
        numOfHoursCanWork: Yup.number().required("هذا الحقل مطلوب"),
        thingsWillDoAfterSuccess: Yup.string().required("هذا الحقل مطلوب"),
    });

    const formik = useFormik({
        initialValues: {
            fullName: "",
            age: "",
            mobileNumber: "",
            whatsAppNumber: "",
            governomate: "",
            studyStatus: "",
            isHearedAboutTradingBefore: "",
            isHearedAboutAcademyBefore: "",
            numOfHoursCanWork: "",
            thingsWillDoAfterSuccess: "",
        },
        validationSchema: validationSchema,
        onSubmit: candidate,
        validateOnChange: true,
    });

    const handleSelectChange = (fieldName) => (event) => {
        let value = event.target.value;
        if (value === "true") value = true;
        else if (value === "false") value = false;
        else if (!isNaN(value)) value = Number(value);

        formik.setFieldValue(fieldName, value);
    };
    return (
        <section className={`${styles.register}`} >
            <div className={`container ${styles.loginContain}`} style={{margin:'200px 0px'}}>
                <div
                    className={`${styles.registerForm}`}
                    style={{
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(0, 123, 255, 0.5)",
                        borderRadius: "8px",
                        boxShadow: "0 0px 40px 0 rgba(0, 123, 255, 0.4)",
                    }}
                >
                    <div className={`${styles.sectionLeft} p-4`}>
                        <div className="leftTitle text-center mb-5">
                            <h2>تسجيل كمترشح</h2>
                            <p>
                                استكشف جميع فرص التعلم في عالم التداول. احصل على تقديرات مخصصة
                                لأرباحك المحتملة بناءً على خبرتك وأهدافك. اطلع على أكثر من 600 كورس
                                في مجال التداول واستفد من علمهم لتحقيق النجاح في الأسواق المالية.
                            </p>
                        </div>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group position-relative input-component">
                                <label htmlFor="fullName">الاسم بالكامل</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    className="form-control bg-transparent"
                                    onChange={formik.handleChange}
                                    value={formik.values.fullName}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.fullName && formik.touched.fullName && (
                                    <p className="text-danger">{formik.errors.fullName}</p>
                                )}
                            </div>

                            <div className="form-group position-relative input-component mt-4">
                                <label htmlFor="age">العمر</label>
                                <input
                                    type="number"
                                    name="age"
                                    id="age"
                                    onChange={handleSelectChange("age")}
                                    className="form-control bg-transparent"
                                    value={formik.values.age}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.age && formik.touched.age && (
                                    <p className="text-danger">{formik.errors.age}</p>
                                )}
                            </div>

                            <div className="form-group position-relative input-component mt-4">
                                <label htmlFor="mobileNumber">رقم الهاتف</label>
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    id="mobileNumber"
                                    className="form-control bg-transparent"
                                    onChange={formik.handleChange}
                                    value={formik.values.mobileNumber}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.mobileNumber && formik.touched.mobileNumber && (
                                    <p className="text-danger">{formik.errors.mobileNumber}</p>
                                )}
                            </div>

                            <div className="form-group position-relative input-component mt-4">
                                <label htmlFor="whatsAppNumber">رقم الواتساب</label>
                                <input
                                    type="text"
                                    name="whatsAppNumber"
                                    id="whatsAppNumber"
                                    className="form-control bg-transparent"
                                    onChange={formik.handleChange}
                                    value={formik.values.whatsAppNumber}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.whatsAppNumber && formik.touched.whatsAppNumber && (
                                    <p className="text-danger">{formik.errors.whatsAppNumber}</p>
                                )}
                            </div>

                            <div className="form-group position-relative input-component mt-4">
                                <label htmlFor="governomate">المحافظة</label>
                                <input
                                    type="text"
                                    name="governomate"
                                    id="governomate"
                                    className="form-control bg-transparent"
                                    onChange={formik.handleChange}
                                    value={formik.values.governomate}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.governomate && formik.touched.governomate && (
                                    <p className="text-danger">{formik.errors.governomate}</p>
                                )}
                            </div>
                            <div className="form-group position-relative input-component mt-4">
                                <label htmlFor="studyStatus">حالة الدراسة</label>
                                <select
                                    name="studyStatus"
                                    id="studyStatus"
                                    className="form-control bg-transparent"
                                    onChange={handleSelectChange("studyStatus")}
                                    value={formik.values.studyStatus}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">اختر حالة الدراسة</option>
                                    <option value="0">طالب</option>
                                    <option value="1">متخرج</option>
                                </select>
                                {formik.errors.studyStatus && formik.touched.studyStatus && (
                                    <p className="text-danger">{formik.errors.studyStatus}</p>
                                )}
                            </div>

                            <div className="form-group position-relative input-component mt-4">
                                <label htmlFor="isHearedAboutTradingBefore">هل سمعت عن التداول من قبل؟</label>
                                <select
                                    name="isHearedAboutTradingBefore"
                                    id="isHearedAboutTradingBefore"
                                    className="form-control bg-transparent"
                                    onChange={handleSelectChange("isHearedAboutTradingBefore")}
                                    value={formik.values.isHearedAboutTradingBefore}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">اختر</option>
                                    <option value="true">نعم</option>
                                    <option value="false">لا</option>
                                </select>
                                {formik.errors.isHearedAboutTradingBefore && formik.touched.isHearedAboutTradingBefore && (
                                    <p className="text-danger">{formik.errors.isHearedAboutTradingBefore}</p>
                                )}
                            </div>

                            <div className="form-group position-relative input-component mt-4">
                                <label htmlFor="isHearedAboutAcademyBefore">هل سمعت عن الأكاديمية من قبل؟</label>
                                <select
                                    name="isHearedAboutAcademyBefore"
                                    id="isHearedAboutAcademyBefore"
                                    className="form-control bg-transparent"
                                    onChange={handleSelectChange("isHearedAboutAcademyBefore")}
                                    value={formik.values.isHearedAboutAcademyBefore}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">اختر</option>
                                    <option value="true">نعم</option>
                                    <option value="false">لا</option>
                                </select>
                                {formik.errors.isHearedAboutAcademyBefore && formik.touched.isHearedAboutAcademyBefore && (
                                    <p className="text-danger">{formik.errors.isHearedAboutAcademyBefore}</p>
                                )}
                            </div>

                            <div className="form-group position-relative input-component mt-4">
                                <label htmlFor="numOfHoursCanWork">عدد الساعات التي يمكن العمل بها</label>
                                <input
                                    type="number"
                                    name="numOfHoursCanWork"
                                    id="numOfHoursCanWork"
                                    className="form-control bg-transparent"
                                    onChange={handleSelectChange("numOfHoursCanWork")}
                                    value={formik.values.numOfHoursCanWork}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.numOfHoursCanWork && formik.touched.numOfHoursCanWork && (
                                    <p className="text-danger">{formik.errors.numOfHoursCanWork}</p>
                                )}
                            </div>

                            <div className="form-group position-relative input-component mt-4">
                                <label htmlFor="thingsWillDoAfterSuccess">ما الذي ستفعله بعد النجاح؟</label>
                                <textarea
                                    name="thingsWillDoAfterSuccess"
                                    id="thingsWillDoAfterSuccess"
                                    className="form-control bg-transparent"
                                    rows="5"
                                    onChange={formik.handleChange}
                                    value={formik.values.thingsWillDoAfterSuccess}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                                {formik.errors.thingsWillDoAfterSuccess && formik.touched.thingsWillDoAfterSuccess && (
                                    <p className="text-danger">{formik.errors.thingsWillDoAfterSuccess}</p>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary w-100 mt-4">
                                تسجيل كمترشح
                            </button>
                        </form>
                        <p className="text-center mt-3">
                            هل لديك حساب بالفعل؟{" "}
                            <NavLink to="/signin" className="text-primary">
                                تسجيل دخول
                            </NavLink>
                            <span className="mx-2">او</span>

                            <NavLink to="/signup" className="text-primary">
                                تسجيل حساب جديد
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
