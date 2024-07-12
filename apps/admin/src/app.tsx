// src/app.tsx
import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { FC } from 'react'

import $styles from './app.module.css'
import StateDemo from './components/demo/state'

const px2rem = px2remTransformer()

const App: FC = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        // 启用css变量
        cssVar: true,
        hashed: false,
        token: {},
      }}
    >
      <AntdApp>
        <StyleProvider
          layer
          transformers={[px2rem]}
        >
          <div className={$styles.app}>
            <StateDemo />
          </div>
        </StyleProvider>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
