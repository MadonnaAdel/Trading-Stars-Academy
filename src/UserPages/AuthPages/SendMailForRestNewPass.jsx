import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import styles from "./style.module.css";
import { forgetPass } from "../../Services/userApiService";
export default function SendMailForRestNewPass() {
  async function sendEmail(val) {
    try {
      const response = await forgetPass(val);
      if (response?.data?.isPass) {
        toast.success(response?.data?.message);
      } else {
        toast.info(response?.data?.message);
      }
    } catch (err) {
      toast.error("خطأاثناء ارسال البريد حاول مرة اخري");
      console.error("Error:", err);
    }
  }

  const validationSchema = Yup.object({
  email: Yup.string()
        .required("هذا الحقل مطلوب")
        .email("ارجو ادخال البريد الالكتروني بشكل صحيح"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: sendEmail,
  });

  return (
    <section className={styles.register}>
      <div className={`container ${styles.loginContain} `}>
        <div className={` ${styles.registerForm}`}>
          <div className={`${styles.sectionLeft} p-4 `}
            style={{
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 123, 255, 0.5)',
              borderRadius: '8px',
              boxShadow: '0 0px 40px 0 rgba(0, 123, 255, 0.4)',
            }}>
            <div className="leftTitle text-center mb-5">
              <h2> اعادة تعين كلمة المرور</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
            <div className="form-group position-relative input-component">
                <label
                  htmlFor="email"
                >
                  البريد الالكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control bg-transparent"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-danger">{formik.errors.email}</p>
                )}
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4">
                ارسال الرابط
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

}
