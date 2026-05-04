import { useForm, Controller } from "react-hook-form";
import { Input, Radio } from "antd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice.js";
import { useEffect } from "react";
import { selectAuth } from "../redux/slices/authSlice.js";
import "../styles/auth.css";

const RegistrationForm = () => {
  const { loading, error, success } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (success) {
      console.log(success);
      navigate("/login");
    }
  }, [success]);

  return (
    <div className="registration-form">
      <h2 className="registration-form__title">Регистрация</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="registration-form__form"
      >
        <div className="registration-form__field">
          <label className="registration-form__lable">Логин:</label>
          <Controller
            name="username"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field, fieldState }) => (
              <div>
                <Input
                  {...field}
                  placeholder="Введите логин"
                  className="registration-form__input"
                />
                {fieldState.error && (
                  <p className="error">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <div className="registration-form__field">
          <label className="registration-form__lable">Email:</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field, fieldState }) => (
              <div>
                {" "}
                <Input
                  {...field}
                  placeholder="Введите email"
                  className="registration-form__input"
                />
                {fieldState.error && (
                  <p className="error">{fieldState.error.message}</p>
                )}
              </div>
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
              validate: (value) => {
                if (value.length < 8) {
                  return "Минимум 8 символов";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Минимум 1 заглавная буква";
                }
                if (!/[a-z]/.test(value)) {
                  return "Минимум 1 прописная буква";
                }
                if (!/\d/.test(value)) {
                  return "Минимум 1 цифра";
                }
                if (!/[!@#$%^&*(),.?"_:{}|<>]/.test(value)) {
                  return "Минимум 1 символ";
                }
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <Input
                  {...field}
                  placeholder="Введите пароль"
                  className="registration-form__input"
                />
                {fieldState.error && (
                  <p className="error">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <div className="registration-form__field">
          <label className="registration-form__lable">Пол:</label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Обязательное поле" }}
            render={({ field, fieldState }) => (
              <div>
                <Radio.Group {...field} className="registration-form__radio">
                  <Radio
                    value="male"
                    className="registration-form__radio-option"
                  >
                    Male
                  </Radio>
                  <Radio
                    value="female"
                    className="registration-form__radio-option"
                  >
                    Female
                  </Radio>
                </Radio.Group>
                {fieldState.error && (
                  <p className="error">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
          <p className="registration-form__error">{errors.gender?.message}</p>
        </div>

        <div className="registration-form__field">
          <label className="registration-form__lable"> Возраст:</label>
          <Controller
            name="age"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field, fieldState }) => (
              <div>
                <Input
                  {...field}
                  placeholder="Введите возраст"
                  className="registration-form__input"
                />
                {fieldState.error && (
                  <p className="error">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </div>
        <button type="submit" className="registration-form__button">
          Зарегистрироваться
        </button>
        {loading && (
          <p className="registration-form__loading">Регистрация...</p>
        )}
      </form>

      {error && <p className="registration-form__error">{error}</p>}
    </div>
  );
};

export default RegistrationForm;
