import joi from 'joi';

const entriesSchema = joi.object({
    description: joi.string().min(1).required(),
    value: joi.number().min(1).required(),
    type: joi.string().valid('+', '-').required(),
});

export default entriesSchema;