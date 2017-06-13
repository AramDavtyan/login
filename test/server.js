var express = require('express');
var bodyParser = require('body-parser');
var Joi = require('joi');

var app = express();
app.use(bodyParser.json());


function validator(req, res) {
  let xxx = Joi.object({
    firstname: Joi.string().min(2).required().error((errors) => {

      return {
        template: 'contains {{errors}} errors, here is the list : {{codes}}',
        context: {
          errors: errors.length,
          codes: errors[0].type,
          text: 'ssssssss'
        }
      };
    }),
    lastname: Joi.string().min(3).max(30).required(),
    login: Joi.string().min(3).max(30).required(),
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  });
  return Joi.validate(req.body, xxx, (error, value) => {
    return error
  })
}

app.post('/test', function (req, res) {
  let error = validator(req, res);
  res.json(error.details)
}).listen(3001, function () {
  console.log('server is listen 3001 port')
})

