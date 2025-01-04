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