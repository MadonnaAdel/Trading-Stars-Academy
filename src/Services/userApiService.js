import api from './axiosConfig';

export const Register = async (values) => {
  const formData = new FormData();
  formData.append('Email', values.Email);
  formData.append('Username', values.Username);
  formData.append('Fname', values.Fname);
  formData.append('Lname', values.Lname);
  formData.append('Password', values.Password);
  formData.append('PhoneNumber', values.PhoneNumber);
  formData.append('Role', 'user');

  if (values.IdentityImageFrontUrl) {
    formData.append('IdentityImageFrontUrl', values.IdentityImageFrontUrl);
  }
  if (values.IdentityImageBackUrl) {
    formData.append('IdentityImageBackUrl', values.IdentityImageBackUrl);
  }
  if (values.PersonalImageUrl) {
    formData.append('PersonalImageUrl', values.PersonalImageUrl);
  }
  try {
    const response = await api.post('Account/Register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error("Error in registration:", error);

  }

}
export const Login = async (values) => {
  const formData = new FormData();
  formData.append('email', values.email);
  formData.append('password', values.password);
  try {
    const response = await api.post('Account/login', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error("Error in login:", error);
  }
}

export const GetCourses = async (PageNumber, PageSize, categoryId) => {
  try {
    const response = await api.get(`Course/GetAllCourses?PageNumber=${PageNumber}&PageSize=${PageSize}&categoryId=${categoryId}`);
    return response;
  } catch (error) {
    console.error("Error in getting courses:", error);
  }
}
export const GetCourseById = async (id) => {
  try {
    const response = await api.get(`Course/GetCourseById?id=${id}`);
    return response;
  } catch (error) {
    console.error("Error in getting course:", error);
  }
}
export const GetCountentCourse = async (id) => {
  try {
    const response = await api.get(`Course/GetCourseById?id=${id}`);
    return response;
  } catch (error) {
    console.error("Error in getting course:", error);
  }
}
export const updateAccount = async (values, UserId) => {
  try {
    const response = await api.put(`Account/UpdateAccount?UserId=${UserId}`, values);
    return response;
  } catch (error) {
    console.error('Error in update account:', error);
  }
};
export const GenerateResetToken = async (email) => {
  try {
    const res = await api.post(`Account/GenerateResetToken?Email=${email}`);
    return res
  } catch (err) {
    console.error(err);
  }
}
export const resetPassword = async (newPassword) => {
  try {
    const res = await api.post('Account/ResetPassword', newPassword);
    return res;
  } catch (err) {
    console.error(err)
  }
}
export const RegisterAsCandidate = async (values) => {
  try {
    const response = await api.post('Candidate/RegisterAsCandidate', values);
    return response;
  } catch (error) {
    console.error("Error in registration:", error);

  }
}
export const EnrollCourseRequest = async (userAndCourseIds) => {
  try {
    const response = await api.post('EnrollmentRequest/EnrollCourseRequest', userAndCourseIds);
    return response;
  } catch (error) {
    console.error("Error in EnrollmentRequest:", error);
  }
}
export const forgetPass = async (email) => {
  try {
    const response = await api.post('Account/ForgetPassword', email);
    return response;
  } catch (error) {
    console.error("Error in ForgetPassword:", error);
  }
}
export const getCategoriesName = async () => {
  try {
    const res = await api.get('Category/GetAllCategoriesNames');
    return res
  } catch (err) {
    console.error(err)
  }
}
export const GetAllCategories = async (PageNumber, PageSize) => {
  try {
    const res = await api.get(`Category/GetAllCategories?PageNumber=${PageNumber}&PageSize=${PageSize}`);
    return res
  } catch (err) {
    console.error(err)
  }
}
export const getMainVideoByCourseId = async (courseId) => {
  try {
    const response = await api.get(`Video/GetMainVideosByCourseId?Id=${courseId}`);
    return response;
  } catch (error) {
    console.error("Error in getting GetMainVideosByCourseId", error);
  }
}
export const getOnlineTrainingVideosByCourseId = async (courseId) => {
  try {
    const response = await api.get(`Video/GetOnlineTrainingVideosByCourseId?Id=${courseId}`);
    return response;
  } catch (error) {
    console.error("Error in getting GetOnlineTrainingVideosByCourseId", error);
  }
}
export const GetVideoById = async (videoId) => {
  try {
    const response = await api.get(`Video/GetVideoById?videoId=${videoId}`);
    return response;
  } catch (error) {
    console.error("Error in getting GetVideoById", error);
  }
}
export const GetWalletsNumber = async (Id) => {
  try {
    const response = await api.get(`Contact/GetWalletsNumber?id=${Id}`);
    return response;
  } catch (error) {
    console.error("Error in getting GetWalletsNumber", error);
  }
}
export const GetCourseEnrollmentStatus = async (userId, courseId) => {
  try {
    const response = await api.get(`UserEnrolledCourse/GetCourseEnrollmentStatus?userId=${userId}&courseId=${courseId}`);
    return response;
  } catch (error) {
    console.error("Error in getting GetCourseEnrollmentStatus", error);
  }
}
export const GetUserEnrolledCourses = async (userId) => {
  try {
    const response = await api.get(`UserEnrolledCourse/GetUserEnrolledCourses?UserId=${userId}`);
    return response;
  } catch (error) {
    console.error("Error in getting GetUserEnrolledCourses", error);
  }
}

























