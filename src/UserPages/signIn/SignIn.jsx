// import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import styles from "./style.module.css";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Login } from "../../Services/userApiService";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  
  async function signin(val) {
    console.log("Sign-up data:", val);
    try {
      const response = await Login(val);
      console.log("response:", response);
      if (response.data.isPass) {
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          if (response.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/courses");  
          }
      } else toast.info(response.data.message);
    } catch (err) {
      toast.error(err,"خطأ في تسجيل الدخول");
      console.error("Error:", err);
    }
  }
  
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("هذا الحقل مطلوب")
      .email("ارجو ادخال البريد الالكتروني بشكل صحيح"),   
    password: Yup.string()
      .required(" هذا الحقل مطلوب")
      .min(8, " كلمة المرور يجب ان تكون اكثر من 8 احرف")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        " كلمة المرور يجب ان تحتوي علي حرف كبير وحرف صغير ورقم ورمز"
      ),
  });
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: signin,
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
              <h2> تسجيل دخول</h2>
              <p>
                استكشف جميع فرص التعلم في عالم التداول. احصل على تقديرات مخصصة لأرباحك المحتملة بناءً على خبرتك وأهدافك. اطلع علي اكثر من 600 كورس في مجال التداول واستفد من علمهم لتحقيق النجاح في الأسواق المالية.
              </p>
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

              <div className="form-group position-relative input-component mt-3">
                <label
                  htmlFor="password"
                >
                  كلمة المرور
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control bg-transparent"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-danger">{formik.errors.password}</p>
                )}
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4">
                تسجيل دخول
              </button>
            </form>
            <p className="text-center mt-3">
              هل انت مستخدم جديد ؟
              <NavLink to="/signup" className="text-primary">
                تسجيل حساب
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
