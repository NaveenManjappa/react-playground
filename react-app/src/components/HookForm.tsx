import { FieldValues, useForm } from "react-hook-form";
interface FormData {
  name: string;
  age: number;
}
const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FieldValues) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name", { required: true, minLength: 3 })}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name?.type === "required" && (
          <p className="text-danger">The name field is required</p>
        )}
        {errors.name?.type === "minLength" && (
          <p className="text-danger">The name must be atleast 3 characters.</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age",{ required:true, min: 1, max: 100})}
          id="age"
          type="number"
          className="form-control"
        />
        {(errors.age?.type === 'max' || errors.age?.type === 'min') && <p className="text-danger">Age should be between 1 and 100</p>}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default HookForm;
