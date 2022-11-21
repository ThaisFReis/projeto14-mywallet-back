import joi from 'joi';

const entriesSchema = joi.object({
    value: joi.number().min(1).required(),
    description: joi.string().min(1).required(),
    type: joi.string().required()
});

export default entriesSchema;