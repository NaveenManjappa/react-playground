import React, { FormEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface Person {
  name:string | undefined;
  age:number | undefined;
}
const Form = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person : Person = { name: "", age: 0 };

  useState({
    name:'',
    age:0
  })
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    person.name = nameRef.current?.value;
    person.age =  parseInt(ageRef.current?.value ?? "0");
    console.log(person);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input ref={nameRef} id="name" type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input ref={ageRef} id="age" type="number" className="form-control" />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default Form;
