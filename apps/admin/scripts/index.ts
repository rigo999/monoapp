import { pathResolve, deepMerge } from '@3rapp/utils'
import { ConfigEnv, UserConfig } from 'vite'

import { createPlugins } from './plugins'
import { Configure } from './types'

// 用deepmerge来深度合并默认配置和自定义配置
// 自定义配置是在vite.config.ts中调用本函数时传入的confgiure参数（一个用于生成vite配置的函数）执行后的结果
export const createConfig = (params: ConfigEnv, configure?: Configure): UserConfig => {
  const isBuild = params.command === 'build'

  return deepMerge<UserConfig, UserConfig>(
    {
      resolve: {
        alias: {
          '@': pathResolve('../src'),
        },
      },
      css: {
        modules: {
          localsConvention: 'camelCase',
        },
      },
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:8080/api',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, ''),
          },
        },
        cors: true,
      },
      plugins: createPlugins(isBuild),
    },
    typeof configure === 'function' ? configure(params, isBuild) : {},
    'merge',
  )
}
