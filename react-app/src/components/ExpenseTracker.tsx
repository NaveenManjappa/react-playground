import {   useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";

const schema = z.object({
  description: z
    .string({ invalid_type_error: "Description is required" })
    .min(3, {
      message: "Description should be atleast 3 characters in length",
    }),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(0, { message: "Amount should be greater than 0" }),
  category: z.string({ invalid_type_error: "Category is required" }),
  key: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

const ExpenseTracker = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({resolver:zodResolver(schema)});

  const [expenses,setExpenses] = useState<FormValues[]>([]);
  const [filteredExpenses,setFilteredExpenses]=useState<FormValues[]>([]);

  const onSubmit = (data: FormValues) => {
    const updateIndex = expenses.findIndex(expense => expense.description === data.description);
    console.log(data);
    if(updateIndex === -1){
      const exp = [...expenses,{ ...data ,key:data.description}];
      setExpenses(exp);
      setFilteredExpenses(exp.filter(expense => expense.category === data.category));
      return;
    }

    const expensesToUpdate = [...expenses];
    expensesToUpdate[updateIndex] = {...expensesToUpdate[updateIndex],
    amount: expensesToUpdate[updateIndex].amount+ data.amount,
    category:data.category
    }
    setExpenses(expensesToUpdate);
    console.log(expensesToUpdate);
    setFilteredExpenses(expensesToUpdate.filter(expense => expense.category === data.category));
      
  };

  const onDelete = (description: string) => {
    setExpenses(expenses.filter((expense) => expense.description !== description));
    setFilteredExpenses(filteredExpenses.filter(expense => expense.description !== description));
  };

  const handleCategoryChange = (event:ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    console.log(expenses);
    const filteredExpenses = expenses.filter(expense => {
      if(event.target.value === 'All Categories')
        return expense;
      else
        return expense.category === event.target.value;
    });
    console.log(filteredExpenses);
    setFilteredExpenses(filteredExpenses);
  }
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          id="description"
          type="text"
          {...register("description")}
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          {...register("amount",{valueAsNumber:true})}
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Categories
        </label>
        <select id="category" {...register("category")} onChange={handleCategoryChange} className="form-select">
          <option value="All Categories">All Categories</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>

      <button className="btn btn-primary mb-5" disabled={!isValid}>
        Submit
      </button>
    </form>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        { filteredExpenses.map((expense,index) => (
          <tr>
            <td>{expense.description}</td>
            <td>£{expense.amount}</td>
            <td>{expense.category}</td>
            <td className="text-center">
            <button className="btn btn-outline-danger" onClick={()=>onDelete(expense.description)}>Delete</button>
            </td>
          </tr>
          
        ))}
      </tbody>
      { filteredExpenses.length > 0 &&
      <tfoot>
        <tr>
          <th>Total</th>
          <th>£{filteredExpenses.reduce((total,expense) => total+expense.amount,0)}</th>
        </tr>
      </tfoot>
}
    </table>
    </>
  );
};

export default ExpenseTracker;
