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
 export const GetApprovedUsers = async (PageNumber,PageSize) => {
  
  try {
    const response = await api.get(`Account/GetApprovedUsers?PageNumber=${PageNumber}&PageSize=${PageSize}`);
    return response;
  } catch (error) {
    console.error("Error in GetApprovedUsers:", error);
  }
}
 export const UpdateUserAccountForAdmin = async (userId,values) => {
  const formData = new FormData();
  formData.append('Fname', values.Fname);
  formData.append('Lname', values.Lname);
  formData.append('PhoneNumber', values.PhoneNumber);

  if (values.IdentityImageFront) {
    formData.append('IdentityImageFront', values.IdentityImageFront);
  }
  if (values.IdentityImageBack) {
    formData.append('IdentityImageBack', values.IdentityImageBack);
  }
  if (values.PersonalImage) {
    formData.append('PersonalImage', values.PersonalImage);
  }
  try {
    const response = await api.put(`Account/UpdateUserAccountForAdmin?UserId=${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error("Error in UpdateUserAccountForAdmin:", error);
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
export const DeleteCourse = async (courseId) => {

  try {
    const response = await api.delete(`Course/DeleteCourse?courseId=${courseId}`);
    return response;
  } catch (error) {
    console.error("Error in delet courses:", error);
  }
}
export const AddNewCourse = async (values) => {
  const formData = new FormData();
  formData.append('Name', values.Name);
  formData.append('Description', values.Description);
  formData.append('ImageFile', values.ImageFile);
  formData.append('Price', values.Price);
  formData.append('CategoryId', values.CategoryId);
  try {
    const response = await api.post(`Course/AddNewCourse`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error("Error in add courses:", error);
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
export const GetAllCandidate = async (PageNumber,PageSize) => {
  try {
    const response = await api.get(`Candidate/GetAllCandidates?PageNumber=${PageNumber}&PageSize=${PageSize}` );
    return response;
  } catch (error) {
    console.error("Error in get candidate:", error);
   
  }

}
export const DeleteCandidate = async (id) => {
  try {
    const response = await api.delete(`Candidate/DeleteCandidate?Id=${id}` );
    return response;
  } catch (error) {
    console.error("Error in delete candidate:", error);
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
export const ApproveEnrollmentRequest = async (RequestId) => {
  try {
  const response = await api.post(`EnrollmentRequest/ApproveEnrollmentRequest?RequestId=${RequestId}`);
    return response;
  } catch (error) {
    console.error("Error in ApproveEnrollmentRequest:", error);
  }
}
export const RejectEnrollmentRequest = async (RequestId) => {
  try {
  const response = await api.post(`EnrollmentRequest/RejectEnrollmentRequest?RequestId=${RequestId}`);
    return response;
  } catch (error) {
    console.error("Error in RejectEnrollmentRequest:", error);
  }
}
export const GetNotApprovedEnrollmentRequests = async () => {
  try {
  const response = await api.get(`EnrollmentRequest/GetNotApprovedEnrollmentRequests`);
    return response;
  } catch (error) {
    console.error("Error in GetNotApprovedEnrollmentRequests:", error);
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
export const getCategoriesName=async()=>{
  try{
    const res=await api.get('Category/GetAllCategoriesNames');
    return res
  }catch(err){
    console.error(err)
  }
}
export const GetAllCategories=async(PageNumber,PageSize )=>{
  try{
    const res=await api.get(`Category/GetAllCategories?PageNumber=${PageNumber}&PageSize=${PageSize}`);
    return res
  }catch(err){
    console.error(err)
  }
}
export const AddNewCategory=async(catName)=>{
  try{
    const res= await api.post(`Category/AddNewCategory?name=${catName}`);
    return res
  }catch(err){
    console.error(err)
  }
}
export const UpdateCategory=async(body)=>{
  try{
    const res= await api.put(`Category/UpdateCategory`,body);
    return res
  }catch(err){
    console.error(err)
  }
}
export const DeleteCategory=async(id)=>{
  try{
    const res= await api.delete(`Category/DeleteCategory?Id=${id}`);
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
export const UploadNewVideo= async (values,courseId )=>{
  const formData = new FormData();
  formData.append('Title', values.Title);
  formData.append('VideoType', values.VideoType);
  if (values.VideoFile) {
    formData.append('VideoFile', values.VideoFile);
}
  try {
    const response = await api.post(`Video/UploadNewVideo?courseId=${courseId}`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error("Error in getting UploadNewVideo", error);
  }
}
export const DeleteVideo= async (videoId )=>{
  try {
    const response = await api.delete(`Video/DeleteVideo?videoId=${videoId}`);
    return response;
  } catch (error) {
    console.error("Error in getting DeleteVideo", error);
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
export const GetWalletsNumber= async (Id )=>{
  try {
    const response = await api.get(`Contact/GetWalletsNumber?id=${Id}`);
    return response;
  } catch (error) {
    console.error("Error in getting GetWalletsNumber", error);
  }
}
export const UpdateWalletNumber= async (Id ,numbbers)=>{
  try {
    const response = await api.put(`Contact/UpdateWalletNumber?id=${Id}`,numbbers);
    return response;
  } catch (error) {
    console.error("Error in getting UpdateWalletNumber", error);
  }
}
export const GetCourseEnrollmentStatus= async (userId ,courseId)=>{
  try {
    const response = await api.get(`UserEnrolledCourse/GetCourseEnrollmentStatus?userId=${userId}&courseId=${courseId}`);
    return response;
  } catch (error) {
    console.error("Error in getting GetCourseEnrollmentStatus", error);
  }
}
export const GetUserEnrolledCourses= async (userId )=>{
  try {
    const response = await api.get(`UserEnrolledCourse/GetUserEnrolledCourses?UserId=${userId}`);
    return response;
  } catch (error) {
    console.error("Error in getting GetUserEnrolledCourses", error);
  }
}
