import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { GenerateResetToken, GetWalletsNumber, resetPassword, updateAccount } from "../Services/userApiService";
import { useAuth } from "../context/authContext";
import { UpdateWalletNumber } from "../Services/adminApiService";
import HeaderDashboard from "../adminComponents/HeaderDashboard";

function AdminSettings() {
  const { user,login } = useAuth();
  const [initialValues, setInitialValues] = useState({
    Fname: "",
    Lname: "",
    PhoneNumber: "",
  });
  const [initialContactValues, setInitialContactValues] = useState({
    whatsAppNum: "",
    telegramNum: "",
    vodavoneNum: "",
    orangeNum: "",
    etisalatNum: "",
    weNum: "",
  });
  const [nums, setNums] = useState([]);

  const getNumbers = async () => {
    try {
      const res = await GetWalletsNumber(1);
      if (res?.data?.isPass) {
        setNums(res.data.data);
      } else {
        toast.info(res?.data?.message);
      }
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  useEffect(() => {
    getNumbers();
  }, []);

  async function changePassword(values) {
    try {
      const res = await GenerateResetToken(user.email);

      if (res?.data?.data?.token) {
        const response = await resetPassword({
          newPassword: values.Password,
          token: res?.data?.data?.token,
          email: user.email,
        });

        response?.data?.isPass
          ? toast.success(response?.data?.message)
          : toast.error(response?.data?.message);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("حدث خطأ أثناء تغيير كلمة المرور. يرجى المحاولة مرة أخرى.");
    }
  }

  async function updateProfile(values) {
    try {
      const response = await updateAccount(values, user.id);

      if (response?.data?.isPass) {
        toast.success(response?.data?.message)
        login(response.data.data)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("حدث خطأ أثناء تحديث البيانات. يرجى المحاولة مرة أخرى.");
    }
  }

  async function updateContent(values) {
    try {
      const response = await UpdateWalletNumber(1, values);

      if (response?.data?.isPass) {
        toast.success(response?.data.message);

      } else {
        toast.error(response?.data?.message);
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
    confirmPassword: Yup.string()
      .required("هذا الحقل مطلوب")
      .oneOf([Yup.ref("Password"), null], "كلمة المرور غير متطابقة"),
  });

  const profileValidationSchema = Yup.object({
    Fname: Yup.string()
      .min(2, "الرجاء إدخال أكثر من حرفين")
      .max(15, "الرجاء إدخال أقل من 15 حرف"),
    Lname: Yup.string()
      .min(2, "الرجاء إدخال أكثر من حرفين")
      .max(15, "الرجاء إدخال أقل من 15 حرف"),
    PhoneNumber: Yup.string().matches(/^01[0125][0-9]{8}$/, "الرجاء إدخال رقم هاتف صحيح"),
  });

  const passwordFormik = useFormik({
    initialValues: {
      Password: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: changePassword,
  });

  useEffect(() => {
    if (user) {
      setInitialValues({
        Fname: user.fname || "",
        Lname: user.lname || "",
        PhoneNumber: user.phoneNum || "",
      });
    }
    if (nums) {
      setInitialContactValues({
        whatsAppNum: nums?.whatsAppNum || "",
        telegramNum: nums?.telegramNum || "",
        vodavoneNum: nums?.vodavoneNum || "",
        orangeNum: nums?.orangeNum || "",
        etisalatNum: nums?.etisalatNum || "",
        weNum: nums?.weNum || "",
      });
    }
  }, [user, nums]);

  const profileFormik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: profileValidationSchema,
    onSubmit: updateProfile,
  });

  const contentsFormik = useFormik({
    initialValues: initialContactValues,
    enableReinitialize: true,
    validationSchema: profileValidationSchema,
    onSubmit: updateContent,
  });

  return (
    <section style={{ width: "85%" }}>
      <div className="container py-4">
        <HeaderDashboard title="الاعدادات"/>
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

                  <div className="form-group position-relative input-component mt-3">
                    <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="form-control bg-transparent"
                      onChange={passwordFormik.handleChange}
                      value={passwordFormik.values.confirmPassword}
                      onBlur={passwordFormik.handleBlur}
                    />
                    {passwordFormik.errors.confirmPassword && passwordFormik.touched.confirmPassword && (
                      <p className="text-danger">{passwordFormik.errors.confirmPassword}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-4">
                    حفظ التغييرات
                  </button>
                </form>
              </div>
            </div>
            <div className="card bg-dark-subtle border-primary-subtle mt-4">
              <div className="card-body">
                <h3 className="card-title fw-bold text-primary">تعديل ارقام التواصل</h3>
                <form onSubmit={contentsFormik.handleSubmit}>
                  <div className="form-group mt-4">
                    <label htmlFor="whatsAppNum">رقم الواتساب</label>
                    <input
                      type="text"
                      name="whatsAppNum"
                      id="whatsAppNum"
                      className="form-control bg-transparent"
                      onChange={contentsFormik.handleChange}
                      value={contentsFormik.values.whatsAppNum}
                      onBlur={contentsFormik.handleBlur}
                    />
                    {contentsFormik.errors.whatsAppNum && contentsFormik.touched.whatsAppNum && (
                      <p className="text-danger">{contentsFormik.errors.whatsAppNum}</p>
                    )}
                  </div>

                  <div className="form-group position-relative input-component mt-3">
                    <label htmlFor="telegramNum">رقم التيليجرام</label>
                    <input
                      type="text"
                      name="telegramNum"
                      id="telegramNum"
                      className="form-control bg-transparent"
                      onChange={contentsFormik.handleChange}
                      value={contentsFormik.values.telegramNum}
                      onBlur={contentsFormik.handleBlur}
                    />
                    {contentsFormik.errors.telegramNum && contentsFormik.touched.telegramNum && (
                      <p className="text-danger">{contentsFormik.errors.telegramNum}</p>
                    )}
                  </div>

                  <div className="form-group position-relative input-component mt-3">
                    <label htmlFor="vodavoneNum">رقم فودافون كاش</label>
                    <input
                      type="text"
                      name="vodavoneNum"
                      id="vodavoneNum"
                      className="form-control bg-transparent"
                      onChange={contentsFormik.handleChange}
                      value={contentsFormik.values.vodavoneNum}
                      onBlur={contentsFormik.handleBlur}
                    />
                    {contentsFormik.errors.vodavoneNum && contentsFormik.touched.vodavoneNum && (
                      <p className="text-danger">{contentsFormik.errors.vodavoneNum}</p>
                    )}
                  </div>

                  <div className="form-group position-relative input-component mt-3">
                    <label htmlFor="orangeNum">رقم أورنج كاش</label>
                    <input
                      type="text"
                      name="orangeNum"
                      id="orangeNum"
                      className="form-control bg-transparent"
                      onChange={contentsFormik.handleChange}
                      value={contentsFormik.values.orangeNum}
                      onBlur={contentsFormik.handleBlur}
                    />
                    {contentsFormik.errors.orangeNum && contentsFormik.touched.orangeNum && (
                      <p className="text-danger">{contentsFormik.errors.orangeNum}</p>
                    )}
                  </div>

                  <div className="form-group position-relative input-component mt-3">
                    <label htmlFor="etisalatNum">رقم اتصالات كاش</label>
                    <input
                      type="text"
                      name="etisalatNum"
                      id="etisalatNum"
                      className="form-control bg-transparent"
                      onChange={contentsFormik.handleChange}
                      value={contentsFormik.values.etisalatNum}
                      onBlur={contentsFormik.handleBlur}
                    />
                    {contentsFormik.errors.etisalatNum && contentsFormik.touched.etisalatNum && (
                      <p className="text-danger">{contentsFormik.errors.etisalatNum}</p>
                    )}
                  </div>

                  <div className="form-group position-relative input-component mt-3">
                    <label htmlFor="weNum">رقم وي كاش</label>
                    <input
                      type="text"
                      name="weNum"
                      id="weNum"
                      className="form-control bg-transparent"
                      onChange={contentsFormik.handleChange}
                      value={contentsFormik.values.weNum}
                      onBlur={contentsFormik.handleBlur}
                    />
                    {contentsFormik.errors.weNum && contentsFormik.touched.weNum && (
                      <p className="text-danger">{contentsFormik.errors.weNum}</p>
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

                  <div className="form-group position-relative input-component mt-3">
                    <label htmlFor="Lname">الاسم الأخير</label>
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

                  <div className="form-group position-relative input-component mt-3">
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

export default AdminSettings;
