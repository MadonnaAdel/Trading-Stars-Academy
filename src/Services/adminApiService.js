
import api from './axiosConfig';

export const UpdateUserAccountForAdmin = async (userId, values) => {
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
      const response = await api.post(`Course/AddNewCourse`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error("Error in add courses:", error);
    }
  }
  export const GetAllCandidate = async (PageNumber, PageSize) => {
    try {
      const response = await api.get(`Candidate/GetAllCandidates?PageNumber=${PageNumber}&PageSize=${PageSize}`);
      return response;
    } catch (error) {
      console.error("Error in get candidate:", error);
  
    }
  
  }
  export const DeleteCandidate = async (id) => {
    try {
      const response = await api.delete(`Candidate/DeleteCandidate?Id=${id}`);
      return response;
    } catch (error) {
      console.error("Error in delete candidate:", error);
    }
  }
  export const ApproveEnrollmentRequest = async (RequestId) => {
    try {
      const response = await api.put(`EnrollmentRequest/ApproveEnrollmentRequest?RequestId=${RequestId}`);
      return response;
    } catch (error) {
      console.error("Error in ApproveEnrollmentRequest:", error);
    }
  }
  export const RejectEnrollmentRequest = async (RequestId) => {
    try {
      const response = await api.put(`EnrollmentRequest/RejectEnrollmentRequest?RequestId=${RequestId}`);
      return response;
    } catch (error) {
      console.error("Error in RejectEnrollmentRequest:", error);
    }
  }
  export const GetNotApprovedEnrollmentRequests = async (PageNumber, PageSize) => {
    try {
      const response = await api.get(`EnrollmentRequest/GetNotApprovedEnrollmentRequests?PageNumber=${PageNumber}&PageSize=${PageSize}`);
      return response;
    } catch (error) {
      console.error("Error in GetNotApprovedEnrollmentRequests:", error);
    }
  }
  export const AddNewCategory = async (catName) => {
    try {
      const res = await api.post(`Category/AddNewCategory?name=${catName}`);
      return res
    } catch (err) {
      console.error(err)
    }
  }
  export const UpdateCategory = async (body) => {
    try {
      const res = await api.put(`Category/UpdateCategory`, body);
      return res
    } catch (err) {
      console.error(err)
    }
  }
  export const DeleteCategory = async (id) => {
    try {
      const res = await api.delete(`Category/DeleteCategory?Id=${id}`);
      return res
    } catch (err) {
      console.error(err)
    }
  }
  export const getNotApprovedUsers = async (PageNumber, PageSize) => {
    try {
      const response = await api.get(`Account/GetNotApprovedUsers?PageNumber=${PageNumber}&PageSize=${PageSize}`);
      return response;
    } catch (error) {
      console.error("Error in getting getNotApprovedUsers:", error);
    }
  }
  export const ApproveAccount = async (userId) => {
    try {
      const response = await api.put(`Account/ApproveAccount?UserId=${userId}`);
      return response;
    } catch (error) {
      console.error("Error in getting ApproveAccount:", error);
    }
  }
  export const GetApprovedUsers = async (PageNumber, PageSize) => {

    try {
      const response = await api.get(`Account/GetApprovedUsers?PageNumber=${PageNumber}&PageSize=${PageSize}`);
      return response;
    } catch (error) {
      console.error("Error in GetApprovedUsers:", error);
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
  export const DeleteAccount = async (userId) => {
    try {
      const response = await api.delete(`Account/DeleteAccount?UserId=${userId}`);
      return response;
    } catch (error) {
      console.error("Error in getting DeleteAccount:", error);
    }
  }
  export const UploadNewVideo = async (values, courseId) => {
    const formData = new FormData();
    formData.append('Title', values.Title);
    formData.append('VideoType', values.VideoType);
    if (values.VideoFile) {
      formData.append('VideoFile', values.VideoFile);
    }
    try {
      const response = await api.post(`Video/UploadNewVideo?courseId=${courseId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error("Error in getting UploadNewVideo", error);
    }
  }
  export const DeleteVideo = async (videoId) => {
    try {
      const response = await api.delete(`Video/DeleteVideo?videoId=${videoId}`);
      return response;
    } catch (error) {
      console.error("Error in getting DeleteVideo", error);
    }
  }
  export const UpdateWalletNumber = async (Id, numbbers) => {
    try {
      const response = await api.put(`Contact/UpdateWalletNumber?id=${Id}`, numbbers);
      return response;
    } catch (error) {
      console.error("Error in getting UpdateWalletNumber", error);
    }
  }
  
  
  
  
  
  
  
  