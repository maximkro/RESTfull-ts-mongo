import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";
import Logging from "../library/Logging";
import { IAuthor } from "../models/Author";
import { IBook } from "../models/Book";

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (e) {
            Logging.error(e);
            return res.status(422).json({ e });
        }
    }
}

export const Schemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().regex(/^[0-9a-fA-F]{3}$/).required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().regex(/^[0-9a-fA-F]{3}$/).required()
        })
    },
    book: {
        create: Joi.object<IBook>({
            author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            title: Joi.string().required()

        }),
        update: Joi.object<IBook>({
            author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            title: Joi.string().required()

        })
    }
}
