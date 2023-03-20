export const determineSchemaName = (apiName: string): string =>
  apiName.replace('api-', '')
