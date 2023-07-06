// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types';
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack'


// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'


// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import Autocomplete from "react-google-autocomplete";

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
    },
  }),
);

function RadioControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

RadioControlLabel.propTypes = {
  value: PropTypes.any,
};

const steps = ['Compte', 'Entreprise', 'Récapitulatif'];

const secteurs = [
  {
    id: 1,
    libelle: 'Tertiaire'
  },
  {
    id: 2,
    libelle: 'Production'
  }
];

const niveaux = [
  {
    id: 1,
    libelle: 'Neophyte'
  },
  {
    id: 2,
    libelle: 'Non neophyte'
  }
]

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }



  //Stepper
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  const handleReset = () => {
    setActiveStep(0);
  };


  const displayForm = () => {
    if (activeStep == 0) {
      return (
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }} />
          <FormControl fullWidth sx={{ marginBottom: 4 }}>
            <InputLabel htmlFor='auth-register-password'>Mot de passe</InputLabel>
            <OutlinedInput
              label='Password'
              value={values.password}
              id='auth-register-password'
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label='toggle password visibility'
                  >
                    {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor='auth-register-cf-password'>Confirmer le mot de passe</InputLabel>
            <OutlinedInput
              label='Password'
              value={values.password}
              id='auth-register-cf-password'
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label='toggle password visibility'
                  >
                    {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </form>
      )
    }
    if (activeStep == 1) {
      return (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <RadioGroup name="use-radio-group1" >
              <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: 10 }}>
                {
                  niveaux.map((niveau, index) => {
                    return <RadioControlLabel key={index} value={niveau.libelle} label={niveau.libelle} control={<Radio />} />
                  })
                }
              </Box>
              <Divider variant="middle" color={theme.palette.primary.main} />
            </RadioGroup>



            <RadioGroup name="use-radio-group2" >
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                {
                  secteurs.map((secteur, index) => {
                    return <RadioControlLabel key={index} value={secteur.libelle} label={secteur.libelle} control={<Radio />} />
                  })
                }
              </Box>
            </RadioGroup>

            <TextField fullWidth id='raisonSociale' label='Raison sociale' sx={{ marginBottom: 4 }} />


            <div className="autocomplete-wrapper">
              <div className="autocomplete-input">
                <Autocomplete
                  apiKey="AIzaSyDp0YPClQ7N4h2sOzuzChSmMWajpUC0OIo"
                  onPlaceSelected={(place) => {
                    console.log(place.formatted_address);
                  }}
                  options={{
                    types: ['address'],
                  }}
                  placeholder='Adresse'
                />
              </div>
            </div>


            <TextField
              fullWidth
              id='poste'
              label='Poste occupé'
              variant="standard"
              sx={{ marginBottom: 4 }}
            />

          </Box>


        </>
      );
    }
    if (activeStep == 2) {
      return (
        <Card sx={{ minWidth: 275 }} >
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
      )
    }
  }


  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 2 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7, 8)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginLeft: 1 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>

          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {displayForm()}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {activeStep === steps.length ? (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Précédent
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Valider' : 'Suivant'}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
