import { Controller } from "react-hook-form";
import { useState } from "react";
import { Input } from "antd";

const VideoLimit = ({ control }) => {
  const [limit, setLimit] = useState(12);

  const handlechange = (e, fieldOnChange) => {
    const value = parseInt(e.target.value);
    fieldOnChange(value);
    setLimit(value);
  };

  return (
    <div>
      <label>Максимальное количество</label>
      <Controller
        name="limit"
        control={control}
        defaultValue={limit}
        render={({ field }) => (
          <Input
            {...field}
            type="range"
            min="1"
            max="50"
            step="1"
            onChange={(e) => handlechange(e, field.onChange)}
          />
        )}
      />
      <span>{limit}</span>
    </div>
  );
};

export default VideoLimit;
