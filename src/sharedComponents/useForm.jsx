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
      {[
        { name: "Email", label: "البريد الإلكتروني", type: "email" },
        { name: "Username", label: "اسم المستخدم", type: "text" },
        { name: "Fname", label: "الاسم الأول", type: "text" },
        { name: "Lname", label: "اسم العائلة", type: "text" },
        { name: "PhoneNumber", label: "رقم الهاتف", type: "text" },
      ].map((field) => (
        <div className="form-group mt-4" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            className={`form-control bg-transparent ${
              formik.errors[field.name] && formik.touched[field.name]
                ? "is-invalid"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[field.name]}
          />
          {formik.errors[field.name] && formik.touched[field.name] && (
            <div className="invalid-feedback">{formik.errors[field.name]}</div>
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary w-100 mt-4">
        حفظ التغييرات
      </button>
    </form>
  );
};

export default UserForm;
