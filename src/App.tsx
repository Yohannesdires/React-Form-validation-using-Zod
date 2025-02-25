import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

function App() {
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2, "First Name is required!").max(30),
      lastName: z.string().min(2, "Last Name is required!").max(30),
      email: z.string().email(),
      age: z.number().min(15).max(30),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match!",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    console.log("Data", data);
  };

  return (
    <div className="flex justify-center items-center px-10 py-10">
      <form
        action=""
        onSubmit={handleSubmit(submitData)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-row gap-5 items-center">
          <label htmlFor="" className="text-lg font-medium text-slate-800">
            First Name:
          </label>
          <div>
            <input
              type="text"
              {...register("firstName")}
              className="border border-slate-400 rounded-md px-2 py-1"
            />
            <p className="text-sm text-red-600 italic">
              {errors.firstName && errors.firstName?.message}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-5 items-center">
          <label htmlFor="" className="text-lg font-medium text-slate-800">
            Last Name:
          </label>
          <div>
            <input
              type="text"
              {...register("lastName")}
              className="border border-slate-400 rounded-md px-2 py-1"
            />
            <p className="text-sm text-red-600 italic">
              {errors.lastName && errors.lastName?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-5 items-center">
          <label htmlFor="" className="text-lg font-medium text-slate-800">
            Email:
          </label>
          <div>
            <input
              type="email"
              {...register("email")}
              className="border border-slate-400 rounded-md px-2 py-1"
            />
            <p className="text-sm text-red-600 italic">
              {errors.email && errors.email?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-5 items-center">
          <label htmlFor="" className="text-lg font-medium text-slate-800">
            Age:
          </label>
          <div>
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
              className="border border-slate-400 rounded-md px-2 py-1"
            />
            <p className="text-sm text-red-600 italic">
              {errors.age && errors.age?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-5 items-center">
          <label htmlFor="" className="text-lg font-medium text-slate-800">
            Password:
          </label>
          <div>
          <input
            type="password"
            {...register("password")}
            className="border border-slate-400 rounded-md px-2 py-1"
          />
           <p className="text-sm text-red-600 italic">
              {errors.password && errors.password?.message}
            </p>

          </div>
        
        </div>
        <div className="flex flex-row gap-5 items-center">
          <label htmlFor="" className="text-lg font-medium text-slate-800">
            Confirm Password:
          </label>
          <div>
          <input
            type="password"
            {...register("confirmPassword")}
            className="border border-slate-400 rounded-md px-2 py-1"
          />
           <p className="text-sm text-red-600 italic">
              {errors.confirmPassword && errors.confirmPassword?.message}
            </p>
          </div>
         
        </div>

        <input
          type="submit"
          value="Submit"
          className="bg-slate-600 text-white cursor-pointer rounded-xl text-center font-medium text-lg py-1"
        />
      </form>
    </div>
  );
}

export default App;
