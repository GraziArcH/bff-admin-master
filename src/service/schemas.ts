import Joi from 'joi';

export const inviteUserSchema = Joi.object({
  userEmail: Joi.string()
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required()
    .messages({
      'string.pattern.base': 'Email inválido',
      'any.required': 'O campo userEmail é obrigatório'
    })
});

export const phonesSchema = Joi.array()
  .items(
    Joi.object({
      phoneId: Joi.number().required().messages({
        'any.required': 'O campo phoneId é obrigatório',
        'number.base': 'O campo phoneId deve ser um número'
      }),
      phone: Joi.string().required().messages({
        'any.required': 'O campo phone é obrigatório',
        'string.base': 'O campo phone deve ser uma string'
      }),
      whatsapp: Joi.boolean().required().messages({
        'any.required': 'O campo whatsapp é obrigatório',
        'boolean.base': 'O campo whatsapp deve ser boolean'
      }),
      telegram: Joi.boolean().required().messages({
        'any.required': 'O campo telegram é obrigatório',
        'boolean.base': 'O campo telegram deve ser boolean'
      }),
      type: Joi.string().required().messages({
        'any.required': 'O campo type é obrigatório',
        'string.base': 'O campo type deve ser uma string'
      })
    })
  )
  .required()
  .messages({
    'any.required': 'O campo phones é obrigatório',
    'array.base': 'O campo phones deve ser uma lista de objetos'
  });

export const updateUserByAdminSchema = Joi.object({
  userId: Joi.string().required().messages({
    'any.required': 'O campo userId é obrigatório',
    'string.base': 'O campo userId deve ser uma string'
  }),
  userIdToBeUpdated: Joi.number().required().messages({
    'any.required': 'O campo userIdToBeUpdated é obrigatório',
    'number.base': 'O campo userIdToBeUpdated deve ser um número'
  }),
  userIdpIdToBeUpdated: Joi.string().required().messages({
    'any.required': 'O campo userIdpIdToBeUpdated é obrigatório',
    'number.base': 'O campo userIdpIdToBeUpdated deve ser uma string'
  }),
  name: Joi.string().required().messages({
    'any.required': 'O campo name é obrigatório',
    'string.base': 'O campo name deve ser uma string'
  }),
  surname: Joi.string().required().messages({
    'any.required': 'O campo surname é obrigatório',
    'string.base': 'O campo surname deve ser uma string'
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'O campo email deve ser um email válido',
    'string.base': 'O campo email deve ser uma string'
  }),
  userTypeId: Joi.number().required().messages({
    'any.required': 'O campo userTypeId é obrigatório',
    'number.base': 'O campo userTypeId deve ser um número'
  }),
  phones: phonesSchema,
  admin: Joi.boolean().required().messages({
    'any.required': 'O campo admin é obrigatório',
    'boolean.base': 'O campo admin deve ser um booleano'
  }),
  active: Joi.boolean().required().messages({
    'any.required': 'O campo active é obrigatório',
    'boolean.base': 'O campo active deve ser um booleano'
  })
});

export const updateUserByCollaboratorSchema = Joi.object({
  userId: Joi.string().required().messages({
    'any.required': 'O campo userId é obrigatório',
    'string.base': 'O campo userId deve ser uma string'
  }),
  name: Joi.string().required().messages({
    'any.required': 'O campo name é obrigatório',
    'string.base': 'O campo name deve ser uma string'
  }),
  surname: Joi.string().required().messages({
    'any.required': 'O campo surname é obrigatório',
    'string.base': 'O campo surname deve ser uma string'
  }),
  phones: phonesSchema
});

export const getUsersSchema = Joi.object({
  adminUserId: Joi.string().required().messages({
    'any.required': 'O campo adminUserId é obrigatório',
    'string.base': 'O campo adminUserId deve ser uma string'
  }),
  limit: Joi.string().allow(null).optional().messages({
    'string.base': 'O campo limit deve ser uma string ou null'
  }),
  offset: Joi.string().allow(null).optional().messages({
    'string.base': 'O campo offset deve ser uma string ou null'
  })
});

export const activateUserByAdminSchema = Joi.object({
  accessToken: Joi.string().required().messages({
    'any.required': 'O campo accessToken é obrigatório',
    'string.base': 'O campo accessToken deve ser uma string'
  }),
  userIdpIdToBeActivated: Joi.string().required().messages({
    'any.required': 'O campo userIdpIdToBeActivated é obrigatório',
    'string.base': 'O campo userIdpIdToBeActivated deve ser uma string'
  })
});

export const deactivateUserByAdminSchema = Joi.object({
  accessToken: Joi.string().required().messages({
    'any.required': 'O campo accessToken é obrigatório',
    'string.base': 'O campo accessToken deve ser uma string'
  }),
  userIdpIdToBeDeactivated: Joi.string().required().messages({
    'any.required': 'O campo userIdpIdToBeActivated é obrigatório',
    'string.base': 'O campo userIdpIdToBeActivated deve ser uma string'
  })
});
