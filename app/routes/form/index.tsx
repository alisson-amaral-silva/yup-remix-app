import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from "react-hook-form";
import { FormSchema } from "~/utils/formSchema";
import { ButtonWrapper, TextFieldWrapper } from './styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface IFormInputs {
  firstName: string;
  lastName: string;
  password: string;
  favoriteSuperhero: { label: string; value: string };
}
export default function Form() {
  const [showPassword, setPassword] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(FormSchema)
  });

  const onSubmit = useCallback((formValues: IFormInputs) => {
    console.log(formValues);
  }, []);

  const handleClickShowPassword = () => {
    setPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
              render={({ field }) => <TextFieldWrapper error={!!errors.password} helperText={errors.password && errors.password.message} type={showPassword ? 'text' : 'password'} InputProps={{
                endAdornment: <>
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                </>
              }} label="Password" {...register('password')} {...field} />}
            />
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