import { Grid, InputLabel, MenuItem, Select, FormControl, Button, FormHelperText } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormSchema } from "~/utils/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextFieldWrapper, ButtonWrapper } from './styles';

interface IFormInputs {
  firstName: string;
  lastName: string;
  password: string;
  favoriteSuperhero: { label: string; value: string };
}
export default function Form() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(FormSchema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log(data)
  };
  return (
    <main>
      <h1>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => <TextFieldWrapper error={!!errors.firstName} helperText={errors.firstName && errors.firstName.message} label="First name" {...register('firstName')}  {...field} />}
            />
          </Grid>

          <Grid item xs={9} />

          <Grid item xs={3}>

            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => <TextFieldWrapper error={!!errors.lastName} helperText={errors.lastName && errors.lastName.message} label="Last name" {...register('lastName')}  {...field} />}
            />
          </Grid>


          <Grid item xs={9} />

          <Grid item xs={3}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => <TextFieldWrapper error={!!errors.password} helperText={errors.password && errors.password.message} label="Password" {...register('password')} {...field} />}
            />
            {/* {errors.password && <p>{errors.password.message}</p>} */}
          </Grid>


          <Grid item xs={9} />

          <Grid item xs={3}>
            <Controller
              name="favoriteSuperhero"
              control={control}
              render={({ field: { onChange, value } }) =>
                <>
                  <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth error={!!errors.favoriteSuperhero}>
                    <InputLabel id="superhero-select">Favorite Super hero</InputLabel>
                    <Select
                    label="Favorite Super hero"
                      labelId="superhero-select"
                      {...register('favoriteSuperhero')}
                      value={value || ''}
                      onChange={(selectedOption) =>
                        onChange(selectedOption)
                      }
                    >
                      <MenuItem value="panther">Black Panther</MenuItem>
                      <MenuItem value="spider">Spider Man</MenuItem>
                      <MenuItem value="spawn">Spawn</MenuItem>
                    </Select>
                    {!!errors.favoriteSuperhero && <FormHelperText>{errors.favoriteSuperhero.message}</FormHelperText>}
                  </FormControl>
                </>
              }
            />
          </Grid>
        </Grid>

        <ButtonWrapper type="submit" variant="contained">Contained</ButtonWrapper>
      </form>
    </main>
  );
}