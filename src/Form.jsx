import { useForm, Controller } from "react-hook-form";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectInputText } from "./redux/slices/inputText";

import VideoLimit from "./VideoLimit";
import { useEffect, useState } from "react";
import { addSearch, editSearch } from "./redux/slices/savedSlice";
import "./styles/form.css";

const Form = ({ onClose, editData = null }) => {
  const text = useSelector(selectInputText);
  const [saveText, setSaveText] = useState(false);
  const isEdit = !!editData;
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: isEdit ? editData.search : text,
      name: isEdit ? editData.name : "",
      order: isEdit ? editData.order : "",
      limit: isEdit ? editData.limit : 12,
    },
  });

  const onSubmit = (formData) => {
    if (isEdit) {
      dispatch(
        editSearch({
          id: editData.id,
          editData: formData,
        }),
      );
      setSaveText(true);
    } else {
      dispatch(addSearch(formData));
    }

    setSaveText(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  useEffect(() => {
    setSaveText(false);
  }, []);

  return (
    <div className="modal">
      <form onSubmit={handleSubmit(onSubmit)} className="modal__form">
        <h2 className="modal__title">
          {isEdit ? "Редактирование запроса" : "Сохранение запроса"}
        </h2>

        <div className="modal__field">
          <label className="modal__lable">Запрос</label>
          <Controller
            name="search"
            control={control}
            rules={isEdit ? {} : { required: "Поле обязательно" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={text}
                readOnly={!isEdit}
                className={isEdit ? "modal__input-edit" : "modal__input-read"}
              />
            )}
          />
        </div>

        <div className="modal__field">
          <label className="modal__lable">Название</label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field, fieldState }) => (
              <div>
                <Input
                  {...field}
                  placeholder="Укажите название"
                  className="modal__input"
                />
                {fieldState.error && (
                  <p className="error">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <div className="modal__field">
          <label className="modal__lable">Сортировать по</label>
          <Controller
            name="order"
            control={control}
            render={({ field }) => (
              <select {...field} className="modal__select">
                <option value="">Без сортировки</option>
                <option value="relevance">По релевантности</option>
                <option value="date">По дате</option>
                <option value="viewCount">По просмотрам</option>
                <option value="rating">По рейтингу</option>
                <option value="title">По названию</option>
              </select>
            )}
          />
        </div>

        <div>
          <VideoLimit control={control} />
        </div>
        <div className="modal__buttons">
          <button type="submit" className="modal__button modal__button-submit">
            Сохранить
          </button>
          <button
            type="button"
            onClick={onClose}
            className="modal__button modal__button-close"
          >
            Отмена
          </button>
        </div>

        {saveText && (
          <p className="modal__message">
            {isEdit ? "Запрос обновлён" : "Запрос сохранён"}
          </p>
        )}
      </form>
    </div>
  );
};

export default Form;
