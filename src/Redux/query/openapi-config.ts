import type { ConfigFile } from '@rtk-query/codegen-openapi'

// npx @rtk-query/codegen-openapi openapi-config.ts

const config: ConfigFile = {
  schemaFile: 'http://localhost:7060/swagger/v1/swagger.json',
  apiFile: './emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './generated.ts',
  exportName: 'api',
  hooks: true,
}

export default config
