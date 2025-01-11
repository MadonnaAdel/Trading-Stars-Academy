import React from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import styles from "./style.module.css";
import { resetPassword } from "../../Services/userApiService";
import { useLocation, useNavigate } from 'react-router-dom';
export default function SetNewPass() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const navigate = useNavigate();
  async function setNewPass(val) {
    try {
      const response = await resetPassword(val);
      if (response?.data?.isPass) {
        toast.success(response?.data?.message);
        navigate('/signin')
      } else {
        toast.info(response?.data?.message);
      }
    } catch (err) {
      toast.error("خطأ أثناء إرسال البيانات. حاول مرة أخرى.");
      console.error("Error:", err);
    }
  }

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("هذا الحقل مطلوب")
      .min(8, "كلمة المرور يجب أن تكون أكثر من 8 أحرف")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم ورمز"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: email || "",
      token: token || "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: setNewPass,
  });

  if (!token) {
    toast.error("التوكين غير موجود في الرابط.");
    return null; 
  }

  return (
    <section className={styles.register}>
      <div className={`container ${styles.loginContain} `}>
        <div className={` ${styles.registerForm}`}>
          <div
            className={`${styles.sectionLeft} p-4 `}
            style={{
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 123, 255, 0.5)',
              borderRadius: '8px',
              boxShadow: '0 0px 40px 0 rgba(0, 123, 255, 0.4)',
            }}
          >
            <div className="leftTitle text-center mb-5">
              <h2>إعادة تعيين كلمة المرور</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group position-relative input-component mt-3">
                <label htmlFor="newPassword">كلمة المرور</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="form-control bg-transparent"
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <p className="text-danger">{formik.errors.newPassword}</p>
                )}
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4">
               ارسال كلمه المرور الجديدة
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
