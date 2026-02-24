# 报表浏览 (Report Viewer) API 接口文档

## 1. 概述
本模块接口负责报表的只读访问、状态轮询以及数据查询。

## 2. 接口列表

所有接口前缀: `/api/v1`

### 2.1 报表浏览与状态 (Viewer & Status)

#### 获取报表布局 (Skeleton)
- **URL**: `/reports/{id}/layout`
- **Method**: `GET`
- **Response**: (返回设计器保存的 Report Config，不包含具体图表数据)
  ```json
  {
    "layoutVersion": "v1.0",
    "widgets": [
      { "uuid": "w_001", "type": "bar", "layout": {...} }
    ]
  }
  ```

#### 检查报表状态 (Heartbeat / Polling)
- **URL**: `/reports/{id}/status`
- **Method**: `GET`
- **Query Params**:
  - `lastVersion`: 当前布局版本号 (e.g., v1.0)
- **Response**:
  ```json
  {
    "code": 200,
    "data": {
      "layoutChanged": false, // 若 true, 前端全量刷新
      "layoutVersion": "v1.1",
      "components": [
        { "uuid": "w_001", "hasDataUpdate": true, "hasConfigUpdate": false },
        { "uuid": "w_002", "hasDataUpdate": false, "hasConfigUpdate": false }
      ]
    }
  }
  ```

#### 获取单个组件数据 (Independent Fetch)
- **URL**: `/components/{uuid}/data`
- **Method**: `GET`
- **Query Params**: (可选全局过滤条件)
  - `filters`: `{"year": "2023", "region": "North"}`
- **Response**:
  ```json
  {
    "code": 200,
    "data": {
      "series": [
        { "name": "Q1", "value": 120 },
        { "name": "Q2", "value": 150 }
      ],
      "xAxis": ["Jan", "Feb"]
    }
  }
  ```

### 2.2 数据查询与下钻 (Drill-down)

#### 获取聚合数据 (通用接口)
- **URL**: `/data/query`
- **Method**: `POST`
- **Request**:
  ```json
  {
    "sourceId": "sales_table",
    "dimensions": ["region"],
    "metrics": ["amount"],
    "filters": [
      { "field": "year", "operator": "=", "value": "2023" }
    ]
  }
  ```
- **Response**: `[{"region": "North", "amount": 1000}, ...]`

#### 获取下钻详情数据 (List)
- **URL**: `/data/drilldown`
- **Method**: `POST`
- **Request**:
  ```json
  {
    "sourceId": "sales_table",
    "filters": [
      { "field": "region", "operator": "=", "value": "North" } // 点击的柱子
    ],
    "page": 1,
    "size": 20
  }
  ```
- **Response**:
  ```json
  {
    "code": 200,
    "data": {
      "total": 50,
      "list": [
        { "order_id": "1001", "product": "A", "amount": 100 }
      ]
    }
  }
  ```
