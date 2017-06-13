import * as Joi from 'joi';

export let signIn = (req, res) => {
  let SignUp = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  }).options({ abortEarly: false });
  return Joi.validate(req.body, SignUp, (error, value) => {
    return error
  })
}

export let signUp = (req, res) => {
  let SignUp = Joi.object({
    // firstname: Joi.string().min(3).max(30).required().error((errors: Error | any): any => {
    //   return {
    //     template: 'contains {{errors}} errors, here is the list : {{codes}}',
    //     context: {
    //       codes: errors[0].type,
    //       text: 'ssssssss'
    //     }
    //   };
    // }),
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    login: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  }).options({ abortEarly: false });
  return Joi.validate(req.body, SignUp, (error, value) => {
    return error
  })
}
