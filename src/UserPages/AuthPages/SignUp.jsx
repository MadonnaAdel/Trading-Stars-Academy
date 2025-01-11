import * as Yup from "yup";
import { useFormik } from "formik";
import styles from "./style.module.css";
import { NavLink } from "react-router-dom";
import { Register } from "../../Services/userApiService";
import { toast } from "react-toastify";

export default function SignUp() {
  async function signUp(values) {
    const { confirmPassword, ...dataToSend } = values;
    try {
      const response = await Register(dataToSend);
      if (response?.data?.isPass) {
        toast.success("تم تسجيل الحساب بنجاح, يرجى انتظار موافقة الادمن.");
      } else {
        const errorMessage = response?.data?.message.includes("Username")
          ? "اسم المستخدم موجود بالفعل"
          : response?.data?.message;
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
    }
  }
  

  const validationSchema = Yup.object({
    Email: Yup.string()
      .required("هذا الحقل مطلوب")
      .email("الرجاء إدخال البريد الإلكتروني بشكل صحيح"),
    Username: Yup.string().required("هذا الحقل مطلوب"),
    Fname: Yup.string()
      .required("هذا الحقل مطلوب")
      .min(2, "الرجاء إدخال أكثر من حرفين")
      .max(15, "الرجاء إدخال أقل من 15 حرف"),
    Lname: Yup.string()
      .required("هذا الحقل مطلوب")
      .min(2, "الرجاء إدخال أكثر من حرفين")
      .max(15, "الرجاء إدخال أقل من 15 حرف"),
    IdentityImageFrontUrl: Yup.mixed().required("هذا الحقل مطلوب"),
    IdentityImageBackUrl: Yup.mixed().required("هذا الحقل مطلوب"),
    PersonalImageUrl: Yup.mixed().required("هذا الحقل مطلوب"),
    Password: Yup.string()
      .required("هذا الحقل مطلوب")
      .min(8, "كلمة المرور يجب أن تكون أكثر من 8 أحرف")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم ورمز"
      ),
    confirmPassword: Yup.string().oneOf([Yup.ref("Password"), null], "كلمة المرور غير متطابقة"),
    PhoneNumber: Yup.string()
      .required("هذا الحقل مطلوب")
      .matches(/^01[0125][0-9]{8}$/, "الرجاء إدخال رقم هاتف صحيح"),
  });

  const formik = useFormik({
    initialValues: {
      Email: "",
      Username: "",
      Fname: "",
      Lname: "",
      IdentityImageFrontUrl: null,
      IdentityImageBackUrl: null,
      PersonalImageUrl: null,
      Password: "",
      confirmPassword: "",
      PhoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: signUp,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    formik.setFieldValue(name, files[0]);
  };

  return (
    <section className={styles.register}>
      <div className={`container ${styles.loginContain} `} style={{margin:"200px 0"}}>
        <div className={`${styles.registerForm}`} 
          style={{
            
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 123, 255, 0.5)",
              borderRadius: "8px",
              boxShadow: "0 0px 40px 0 rgba(0, 123, 255, 0.4)",
            }}>
          <div
            className={`${styles.sectionLeft} p-4`}
          
          >
            <div className="leftTitle text-center mb-5">
              <h2>انشاء حساب</h2>
              <p>
                استكشف جميع فرص التعلم في عالم التداول. احصل على تقديرات مخصصة لأرباحك المحتملة بناءً على خبرتك وأهدافك. اطلع على أكثر من 600 كورس في مجال التداول واستفد من علمهم لتحقيق النجاح في الأسواق المالية.
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group position-relative input-component">
                <label htmlFor="Email">البريد الالكتروني</label>
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  className="form-control bg-transparent"
                  onChange={formik.handleChange}
                  value={formik.values.Email}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.Email && formik.touched.Email && (
                  <p className="text-danger">{formik.errors.Email}</p>
                )}
              </div>

              <div className="form-group position-relative input-component mt-4">
                <label htmlFor="Username">اسم المستخدم</label>
                <input
                  type="text"
                  name="Username"
                  id="Username"
                  className="form-control bg-transparent"
                  onChange={formik.handleChange}
                  value={formik.values.Username}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.Username && formik.touched.Username && (
                  <p className="text-danger">{formik.errors.Username}</p>
                )}
              </div>

              <div className="form-group position-relative input-component mt-4">
                <label htmlFor="Fname">الاسم الأول</label>
                <input
                  type="text"
                  name="Fname"
                  id="Fname"
                  className="form-control bg-transparent"
                  onChange={formik.handleChange}
                  value={formik.values.Fname}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.Fname && formik.touched.Fname && (
                  <p className="text-danger">{formik.errors.Fname}</p>
                )}
              </div>

              <div className="form-group position-relative input-component mt-4">
                <label htmlFor="Lname">اسم العائلة</label>
                <input
                  type="text"
                  name="Lname"
                  id="Lname"
                  className="form-control bg-transparent"
                  onChange={formik.handleChange}
                  value={formik.values.Lname}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.Lname && formik.touched.Lname && (
                  <p className="text-danger">{formik.errors.Lname}</p>
                )}
              </div>

              <div className="form-group position-relative input-component mt-4">
                <label htmlFor="IdentityImageFrontUrl">صورة الهوية الأمامية</label>
                <input
                  type="file"
                  name="IdentityImageFrontUrl"
                  id="IdentityImageFrontUrl"
                  className="form-control bg-transparent"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.IdentityImageFrontUrl && formik.touched.IdentityImageFrontUrl && (
                  <p className="text-danger">{formik.errors.IdentityImageFrontUrl}</p>
                )}
              </div>

              <div className="form-group position-relative input-component mt-4">
                <label htmlFor="IdentityImageBackUrl">صورة الهوية الخلفية</label>
                <input
                  type="file"
                  name="IdentityImageBackUrl"
                  id="IdentityImageBackUrl"
                  className="form-control bg-transparent"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.IdentityImageBackUrl && formik.touched.IdentityImageBackUrl && (
                  <p className="text-danger">{formik.errors.IdentityImageBackUrl}</p>
                )}
              </div>

              <div className="form-group position-relative input-component mt-4">
                <label htmlFor="PersonalImageUrl">صورة شخصية</label>
                <input
                  type="file"
                  name="PersonalImageUrl"
                  id="PersonalImageUrl"
                  className="form-control bg-transparent"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.PersonalImageUrl && formik.touched.PersonalImageUrl && (
                  <p className="text-danger">{formik.errors.PersonalImageUrl}</p>
                )}
              </div>

              <div className="form-group position-relative input-component mt-4">
                <label htmlFor="Password">كلمة المرور</label>
                <input
                  type="password"
                  name="Password"
                  id="Password"
                  className="form-control bg-transparent"
                  onChange={formik.handleChange}
                  value={formik.values.Password}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.Password && formik.touched.Password && (
                  <p className="text-danger">{formik.errors.Password}</p>
                )}
              </div>
              <div className="form-group position-relative input-component mt-3">
                <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-control bg-transparent"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                  <p className="text-danger">{formik.errors.confirmPassword}</p>
                )}
              </div>

              <div className="form-group position-relative input-component mt-4">
                <label htmlFor="PhoneNumber">رقم الهاتف</label>
                <input
                  type="text"
                  name="PhoneNumber"
                  id="PhoneNumber"
                  className="form-control bg-transparent"
                  onChange={formik.handleChange}
                  value={formik.values.PhoneNumber}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.PhoneNumber && formik.touched.PhoneNumber && (
                  <p className="text-danger">{formik.errors.PhoneNumber}</p>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-4">
                تسجيل حساب
              </button>
            </form>
            <p className="text-center mt-3">
              هل لديك حساب بالفعل؟
              <NavLink to="/signin" className="text-primary">
                تسجيل دخول
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}