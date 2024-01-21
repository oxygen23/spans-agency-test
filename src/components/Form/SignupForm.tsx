import {
  ChangeEvent, FC,
  FormEvent,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../../redux/slices/LoginSlice';
import { AppDispatch } from '../../redux/store';
import { FormSignUpData } from '../../types/Form';

const SignupForm: FC = () => {
  const initialState: FormSignUpData = {
    email: '',
    name: '',
  };

  const dispatch:AppDispatch = useDispatch();
  const [formData, setFormData] = useState<FormSignUpData>(initialState);

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmitForm() {
    dispatch(login(formData));
    setFormData(initialState);
  }
  return (
    <>
      <form className="login-left_form">
        <label className="login-left_form-label" htmlFor="name"> What&apos;s your name?*</label>
        <input className="login-left_form-input" id="name" name="name" onChange={handleChangeInput} placeholder=" " type="text" value={formData.name} />

        <label className="login-left_form-label" htmlFor="email">Your Email*</label>
        <input className="login-left_form-input" id="email" name="email" onChange={handleChangeInput} placeholder=" " type="text" value={formData.email} />

      </form>
      <button className="login-left_button-submit" onClick={handleSubmitForm} type="button">Next</button>
    </>
  );
};

export default SignupForm;
