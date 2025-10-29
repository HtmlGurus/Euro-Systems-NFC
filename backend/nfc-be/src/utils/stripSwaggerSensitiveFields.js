const SENSITIVE_FIELDS = ['password', 'verification_code', '__v', 'deleted_at', 'reset_token'];

export function stripSensitiveFields(swaggerSchema) {
  if (!swaggerSchema || !swaggerSchema.properties) return swaggerSchema;

  const cleanProperties = { ...swaggerSchema.properties };

  SENSITIVE_FIELDS.forEach((field) => {
    if (cleanProperties[field]) {
      delete cleanProperties[field];
    }
  });

  return {
    type: 'object',
    properties: cleanProperties,
  };
}
