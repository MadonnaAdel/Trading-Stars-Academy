import { useFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    Email: Yup.string()
      .email("الرجاء إدخال البريد الإلكتروني بشكل صحيح")
      .required("البريد الإلكتروني مطلوب"),
    Username: Yup.string().required("اسم المستخدم مطلوب"),
    Fname: Yup.string()
      .min(2, "الرجاء إدخال أكثر من حرفين")
      .max(15, "الرجاء إدخال أقل من 15 حرف")
      .required("الاسم الأول مطلوب"),
    Lname: Yup.string()
      .min(2, "الرجاء إدخال أكثر من حرفين")
      .max(15, "الرجاء إدخال أقل من 15 حرف")
      .required("اسم العائلة مطلوب"),
    PhoneNumber: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "الرجاء إدخال رقم هاتف صحيح")
      .required("رقم الهاتف مطلوب"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
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
  );
};

export default UserForm;
