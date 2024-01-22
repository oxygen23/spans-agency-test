import { motion } from 'framer-motion';
import {
  ChangeEvent, FC,
  FormEvent,
  useState,
} from 'react';

import { login } from '../../redux/slices/LoginSlice';
import { AppDispatch, useAppDispatch } from '../../redux/store';
import { FocusedForm, FormSignUpData } from '../../types/Form';
import styles from './Login.module.sass';

const SignupForm: FC = () => {
  const initialState: FormSignUpData = {
    email: '',
    name: '',
  };
  const initialStateFocus: FocusedForm = {
    email: false,
    name: false,
  };

  const dispatch:AppDispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormSignUpData>(initialState);
  const [isFocused, setIsFocused] = useState<FocusedForm>(initialStateFocus);

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleFocus(event: ChangeEvent<HTMLInputElement>) {
    const { name } = event.target;
    setIsFocused((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  }

  function handleBlur(event: ChangeEvent<HTMLInputElement>) {
    const { name } = event.target;
    setIsFocused((prevState) => ({
      ...prevState,
      [name]: false,
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
      <motion.input
        animate={{ scale: isFocused.name ? 1.2 : 1 }}
        className={`${styles.login_left__form_input}`}
        id="name"
        name="name"
        onBlur={handleBlur}
        onChange={handleChangeInput}
        onFocus={handleFocus}
        placeholder=" "
        transition={{ duration: 0.2 }}
        type="text"
        value={formData.name}
      />

      <label
        className={`${styles.login_left__form_label}`}
        htmlFor="email"
      >
        Your Email*

      </label>
      <motion.input
        animate={{ scale: isFocused.email ? 1.2 : 1 }}
        className={`${styles.login_left__form_input}`}
        id="email"
        name="email"
        onBlur={handleBlur}
        onChange={handleChangeInput}
        onFocus={handleFocus}
        placeholder=" "
        type="text"
        value={formData.email}
      />

      <motion.button
        className={`${styles.login_left__button_submit}`}
        type="submit"
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 1 }}
      >
        Next

      </motion.button>
    </form>
  );
};

export default SignupForm;
