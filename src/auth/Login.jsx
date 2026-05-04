import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "antd";
import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice.js";
import { selectAuth } from "../redux/slices/authSlice.js";
import LoadingSpinner from "../LoadingSpiner.jsx";
import { setUser } from "../redux/slices/savedSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, user } = useSelector(selectAuth);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    dispatch(login(formData));
  };

  useEffect(() => {
    if (success && user) {
      dispatch(setUser(user.email));
      navigate("/");
    }
  }, [success, user]);
  return (
    <div className="registration-form">
      <h2 className="registration-form__title">Вход</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="registration-form__form"
      >
        <div className="registration-form__field">
          <label className="registration-form__lable">Логин:</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Введите login"
                className="registration-form__input"
              />
            )}
          />
        </div>

        <div className="registration-form__field">
          <label className="registration-form__lable">Пароль:</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Введите пароль"
                className="registration-form__input"
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="registration-form__button"
          disabled={loading}
        >
          Войти
        </button>
        {loading && <LoadingSpinner />}
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

export default Login;
