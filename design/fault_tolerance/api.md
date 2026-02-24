# 容错与告警 (Fault Tolerance) API 接口文档

## 1. 概述
本模块接口负责前端组件数据加载失败时的自动上报与告警。

## 2. 接口列表

所有接口前缀: `/api/v1`

### 2.1 异常上报 (Alerting)

#### 组件加载失败上报
- **URL**: `/notifications/component-load-fail`
- **Method**: `POST`
- **Request**:
  ```json
  {
    "reportId": "rep_001",
    "componentId": "comp_bar_001",
    "errorMsg": "Timeout after 3 retries",
    "stackTrace": "Error: Network Error at...", // optional
    "timestamp": 1698223456789
  }
  ```
- **Response**: `{ "success": true }`

### 2.2 告警配置 (可选)

#### 获取当前用户的告警设置
- **URL**: `/notifications/settings`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "email": true,
    "sms": false,
    "slack": false
  }
  ```

#### 更新告警设置
- **URL**: `/notifications/settings`
- **Method**: `PUT`
- **Request**: `{ "email": true }`
