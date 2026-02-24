# 报表设计 (Report Designer) API 接口文档

## 1. 概述
本模块接口负责报表的配置结构 (Configuration) 的管理，包括增删改查。

## 2. 接口列表

所有接口前缀: `/api/v1`

### 2.1 报表配置管理 (CRUD)

#### 获取报表列表
- **URL**: `/reports`
- **Method**: `GET`
- **Query Params**:
  - `workspaceId`: 工作区 ID
  - `page`: 1
  - `size`: 10
  - `keyword`: "销售" (Title/Description)
- **Response**:
  ```json
  {
    "code": 200,
    "data": {
      "total": 5,
      "list": [
        { "id": "rep_001", "title": "2023销售大盘", "updatedAt": "2023-10-01T12:00:00Z" }
      ]
    }
  }
  ```

#### 获取报表详细配置 (Report Config)
- **URL**: `/reports/{id}`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "code": 200,
    "data": {
      "id": "rep_001",
      "title": "2023销售大盘",
      "canvasStyle": {
        "width": 1920,
        "height": 1080,
        "backgroundColor": "#f5f5f5"
      },
      "widgets": [
        {
          "id": "widget_001",
          "type": "bar", // bar, line, pie
          "layout": { "x": 0, "y": 0, "w": 6, "h": 4 },
          "dataSource": {
            "api": "/api/data/sales",
            "dimension": "month",
            "metrics": ["revenue"]
          },
          "style": {
            "title": "月度销售额",
            "color": ["#5470c6"]
          }
        }
      ]
    }
  }
  ```

#### 创建报表
- **URL**: `/reports`
- **Method**: `POST`
- **Request**: `{ "title": "新报表", "workspaceId": "ws_001" }`
- **Response**: `{ "id": "rep_new_001" }`

#### 更新报表配置
- **URL**: `/reports/{id}`
- **Method**: `PUT`
- **Request**:
  - 完整的 Report Config JSON 结构 (见上文 `widgets` 结构)。
  - `layoutVersion`: (Optional) 用于并发控制的版本号。
- **Response**: `{ "success": true, "updatedAt": "..." }`

#### 删除报表
- **URL**: `/reports/{id}`
- **Method**: `DELETE`

### 2.2 数据源查询 (用于设计时预览)

#### 获取数据源列表
- **URL**: `/datasources`
- **Method**: `GET`
- **Response**:
  ```json
  [
    { "id": "ds_sales", "name": "销售表", "fields": ["id", "region", "amount"] }
  ]
  ```
