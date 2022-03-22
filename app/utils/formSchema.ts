import * as yup from "yup";

export const FormSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    password: yup.string().required("Password is required"),
    favoriteSuperhero: yup.string().required("Favorite superhero is required"),
  }).required();