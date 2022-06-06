import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

// todo fix workaround to import default
const ReactDatePicker = DatePicker.default;

const PortfolioForm = ({ onSubmit }) => {
  const { handleSubmit, register, control, setValue } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    register("startDate");
    register("endDate");
  }, [register]);

  const handleDateChange = (dateType, setDate) => (date) => {
    setValue(
      dateType,
      (date && new Date(date.setHours(0, 0, 0, 0)).toISOString()) || date
    );
    setDate(date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          {...register("title")}
          name="title"
          type="text"
          className="form-control"
          id="title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Company</label>
        <input
          {...register("company")}
          name="company"
          type="text"
          className="form-control"
          id="company"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Company Website</label>
        <input
          {...register("companyWebsite")}
          name="companyWebsite"
          type="text"
          className="form-control"
          id="companyWebsite"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Location</label>
        <input
          {...register("location")}
          name="location"
          type="text"
          className="form-control"
          id="location"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Job Title</label>
        <input
          {...register("jobTitle")}
          name="jobTitle"
          type="text"
          className="form-control"
          id="jobTitle"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          {...register("description")}
          name="description"
          rows="5"
          type="text"
          className="form-control"
          id="description"
          required
        ></textarea>
      </div>

      <div className="form-group customDatePickerWidth">
        <label className="col-form-label" htmlFor="street">
          Start Date
        </label>
        <Controller
          control={control}
          name="startDate"
          render={() => (
            <ReactDatePicker
              className="form-control"
              label="Start Date"
              showYearDropdown
              selected={startDate}
              onChange={handleDateChange("startDate", setStartDate)}
              required
            />
          )}
        />
      </div>

      <div className="form-group customDatePickerWidth">
        <label className="col-form-label" htmlFor="street">
          End Date
        </label>
        <Controller
          control={control}
          name="endDate"
          render={() => (
            <ReactDatePicker
              className="form-control"
              showYearDropdown
              selected={endDate}
              disabled={!endDate}
              onChange={handleDateChange("endDate", setEndDate)}
            />
          )}
        />
      </div>

      <div className="form-group">
        {endDate && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDateChange("endDate", setEndDate)(null)}
          >
            No End Date
          </button>
        )}
        {!endDate && (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleDateChange("endDate", setEndDate)(new Date())}
          >
            Set End Date
          </button>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default PortfolioForm;
