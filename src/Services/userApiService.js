import api from './axiosConfig';

export const Register = async (values) => {
  const formData = new FormData();
  formData.append('Email', values.Email);
  formData.append('Username', values.Username);
  formData.append('Fname', values.Fname);
  formData.append('Lname', values.Lname);
  formData.append('Password', values.Password);
  formData.append('PhoneNumber', values.PhoneNumber);
  formData.append('Role','user');

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
    const response = await api.post('Account/login', formData,{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error("Error in login:", error);
  }
}
export const GetCourses = async (PageNumber,PageSize,categoryId) => {
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
export const GenerateResetToken= async (email) =>{
  try{
    const res =await api.post(`Account/GenerateResetToken?Email=${email}`);
    return res
  }catch(err){
    console.error(err);
  }
}
export const resetPassword = async ( newPassword)=>{
  try{
    const res= await api.post('Account/ResetPassword',newPassword);
    return res;
  }catch(err){
    console.error(err)
  }
}
export const RegisterAsCandidate = async (values) => {
  try {
    const response = await api.post('Candidate/RegisterAsCandidate', values );
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
export const getCategoriesName=()=>{
  try{
    const res= api.get('Category/GetAllCategoriesNames');
    return res
  }catch(err){
    console.error(err)
  }
}
export const getNotApprovedUsers= async (PageNumber,PageSize )=>{
  try {
    const response = await api.get(`Account/GetNotApprovedUsers?PageNumber=${PageNumber}&PageSize=${PageSize}`);
    return response;
  } catch (error) {
    console.error("Error in getting getNotApprovedUsers:", error);
  }
}
export const ApproveAccount= async (userId)=>{
  try {
    const response = await api.put(`Account/ApproveAccount?UserId=${userId}`);
    return response;
  } catch (error) {
    console.error("Error in getting ApproveAccount:", error);
  }
}
export const RejectAccount = async (userId, body) => {
  try {
    const response = await api.put(`Account/RejectAccount?UserId=${userId}`, body, {
      headers: {
        "Content-Type": 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error("Error in RejectAccount:", error);
    throw error; 
  }
};


export const DeleteAccount= async (userId )=>{
  try {
    const response = await api.delete(`Account/DeleteAccount?UserId=${userId}`);
    return response;
  } catch (error) {
    console.error("Error in getting DeleteAccount:", error);
  }
}

export const getMainVideoByCourseId= async (courseId )=>{
  try {
    const response = await api.get(`Video/GetMainVideosByCourseId?Id=${courseId}`);
    return response;
  } catch (error) {
    console.error("Error in getting GetMainVideosByCourseId", error);
  }
}
export const getOnlineTrainingVideosByCourseId= async (courseId )=>{
  try {
    const response = await api.get(`Video/GetOnlineTrainingVideosByCourseId?Id=${courseId}`);
    return response;
  } catch (error) {
    console.error("Error in getting GetOnlineTrainingVideosByCourseId", error);
  }
}
export const GetVideoById= async (videoId )=>{
  try {
    const response = await api.get(`Video/GetVideoById?videoId=${videoId}`);
    return response;
  } catch (error) {
    console.error("Error in getting GetVideoById", error);
  }
}
