import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { GenerateResetToken, updateAccount } from "../../Services/userApiService";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";

function Settings() {
 
  const {user ,login} = useAuth();
  const [initialValues, setInitialValues] = useState({
    Email: "",
    Username: "",
    Fname: "",
    Lname: "",
    PhoneNumber: "",
  });
  
  async function changePassword(values) {
    try {
      const res =await GenerateResetToken(user.email);
      console.log(res)
      // const response = await updatePassword({ Password: values.Password });
      // if (response?.data?.isPass) {
      //   toast.success("تم تغيير كلمة المرور بنجاح.");
      // } else {
      //   toast.error("حدث خطأ أثناء تغيير كلمة المرور.");
      // }
    } catch (err) {
      console.error("Error:", err);
      toast.error("حدث خطأ أثناء تغيير كلمة المرور. يرجى المحاولة مرة أخرى.");
    }
  }

  async function updateProfile(values) {

    try {
      const response = await updateAccount(values, "e7a1ac4b-69a6-4183-aeef-5de4fff2c19c" );
      console.log(response)
      
      if (response?.data?.isPass) {
        toast.success("تم تحديث البيانات بنجاح.");
        login(response.data.data)
      } else {
        const errorMessage = response?.data?.message.includes("Username")
          ? "اسم المستخدم موجود بالفعل"
          : response?.data?.message;
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("حدث خطأ أثناء تحديث البيانات. يرجى المحاولة مرة أخرى.");
    }
  }

  const passwordValidationSchema = Yup.object({
    Password: Yup.string()
      .min(8, "كلمة المرور يجب أن تكون أكثر من 8 أحرف")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم ورمز"
      ),
  });

  const profileValidationSchema = Yup.object({
    Email: Yup.string()
      .email("الرجاء إدخال البريد الإلكتروني بشكل صحيح"),
    Username: Yup.string(),
    Fname: Yup.string()
      .min(2, "الرجاء إدخال أكثر من حرفين")
      .max(15, "الرجاء إدخال أقل من 15 حرف"),
    Lname: Yup.string()
      .min(2, "الرجاء إدخال أكثر من حرفين")
      .max(15, "الرجاء إدخال أقل من 15 حرف"),
    PhoneNumber: Yup.string()      
      .matches(/^01[0125][0-9]{8}$/, "الرجاء إدخال رقم هاتف صحيح"),
  });

  const passwordFormik = useFormik({
    initialValues: { Password: "" },
    validationSchema: passwordValidationSchema,
    onSubmit: changePassword,
  });
  

  useEffect(() => {
    if (user) {
      setInitialValues({
        Email: user.email || "",
        Username: user.userName || "",
        Fname: user.fname || "",
        Lname: user.lname || "",
        PhoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  const profileFormik = useFormik({
    initialValues,
    enableReinitialize: true, 
    validationSchema: profileValidationSchema,
    onSubmit: updateProfile,
  });



  return (
    <section>
      <div className="container py-4">
        <div className="row g-4 mt-5">
          <div className="col-md-4 col-lg-4">
            <div className="card bg-dark-subtle border-primary-subtle">
              <div className="card-body">
                <h3 className="card-title fw-bold text-primary">تغيير كلمة المرور</h3>
                <form onSubmit={passwordFormik.handleSubmit}>
                  <div className="form-group mt-4">
                    <label htmlFor="Password">كلمة المرور الجديدة</label>
                    <input
                      type="password"
                      name="Password"
                      id="Password"
                      className="form-control bg-transparent"
                      onChange={passwordFormik.handleChange}
                      value={passwordFormik.values.Password}
                      onBlur={passwordFormik.handleBlur}
                    />
                    {passwordFormik.errors.Password && passwordFormik.touched.Password && (
                      <p className="text-danger">{passwordFormik.errors.Password}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-4">
                    حفظ التغييرات
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-8 col-lg-8">
            <div className="card bg-dark-subtle border-primary-subtle">
              <div className="card-body">
                <h3 className="card-title fw-bold text-primary">بيانات الملف الشخصي</h3>
                <form onSubmit={profileFormik.handleSubmit}>

                  <div className="form-group mt-4">
                    <label htmlFor="Email">البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      className="form-control bg-transparent"
                      onChange={profileFormik.handleChange}
                      value={profileFormik.values.Email}
                      onBlur={profileFormik.handleBlur}
                    />
                    {profileFormik.errors.Email && profileFormik.touched.Email && (
                      <p className="text-danger">{profileFormik.errors.Email}</p>
                    )}
                  </div>

                  <div className="form-group position-relative input-component mt-4">
                    <label htmlFor="Username">اسم المستخدم</label>
                    <input
                      type="text"
                      name="Username"
                      id="Username"
                      className="form-control bg-transparent"
                      onChange={profileFormik.handleChange}
                      value={profileFormik.values.Username}
                      onBlur={profileFormik.handleBlur}
                    />
                    {profileFormik.errors.Username && profileFormik.touched.Username && (
                      <p className="text-danger">{profileFormik.errors.Username}</p>
                    )}
                  </div>

                  <div className="form-group position-relative input-component mt-4">
                    <label htmlFor="Fname">الاسم الأول</label>
                    <input
                      type="text"
                      name="Fname"
                      id="Fname"
                      className="form-control bg-transparent"
                      onChange={profileFormik.handleChange}
                      value={profileFormik.values.Fname}
                      onBlur={profileFormik.handleBlur}
                    />
                    {profileFormik.errors.Fname && profileFormik.touched.Fname && (
                      <p className="text-danger">{profileFormik.errors.Fname}</p>
                    )}
                  </div>

                  <div className="form-group position-relative input-component mt-4">
                    <label htmlFor="Lname">اسم العائلة</label>
                    <input
                      type="text"
                      name="Lname"
                      id="Lname"
                      className="form-control bg-transparent"
                      onChange={profileFormik.handleChange}
                      value={profileFormik.values.Lname}
                      onBlur={profileFormik.handleBlur}
                    />
                    {profileFormik.errors.Lname && profileFormik.touched.Lname && (
                      <p className="text-danger">{profileFormik.errors.Lname}</p>
                    )}
                  </div>

                  <div className="form-group position-relative input-component mt-4">
                    <label htmlFor="PhoneNumber">رقم الهاتف</label>
                    <input
                      type="text"
                      name="PhoneNumber"
                      id="PhoneNumber"
                      className="form-control bg-transparent"
                      onChange={profileFormik.handleChange}
                      value={profileFormik.values.PhoneNumber}
                      onBlur={profileFormik.handleBlur}
                    />
                    {profileFormik.errors.PhoneNumber && profileFormik.touched.PhoneNumber && (
                      <p className="text-danger">{profileFormik.errors.PhoneNumber}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-4">
                    حفظ التغييرات
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Settings;
