import {
  ChangeEvent, FC,
  FormEvent,
  useState,
} from 'react';

import { login } from '../../redux/slices/LoginSlice';
import { AppDispatch, useAppDispatch } from '../../redux/store';
import { FormSignUpData } from '../../types/Form';
import styles from './Login.module.sass';

const SignupForm: FC = () => {
  const initialState: FormSignUpData = {
    email: '',
    name: '',
  };

  const dispatch:AppDispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormSignUpData>(initialState);

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
    dispatch(login(formData));
    setFormData(initialState);
  }

  return (
    <form
      className={`${styles.login_left__form}`}
      onSubmit={handleSubmitForm}
    >
      <label
        className={`${styles.login_left__form_label}`}
        htmlFor="name"
      >
        What&apos;s your name?*

      </label>
      <input
        className={`${styles.login_left__form_input}`}
        id="name"
        name="name"
        onChange={handleChangeInput}
        placeholder=" "
        type="text"
        value={formData.name}
      />

      <label
        className={`${styles.login_left__form_label}`}
        htmlFor="email"
      >
        Your Email*

      </label>
      <input
        className={`${styles.login_left__form_input}`}
        id="email"
        name="email"
        onChange={handleChangeInput}
        placeholder=" "
        type="text"
        value={formData.email}
      />

      <button
        className={`${styles.login_left__button_submit}`}
        type="submit"
      >
        Next

      </button>
    </form>
  );
};

export default SignupForm;
