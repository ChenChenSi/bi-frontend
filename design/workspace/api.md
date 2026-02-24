# 工作区管理 API 接口文档

## 1. 概述
本模块接口负责工作区 (Workspace) 的创建、列表查询、以及成员管理。

## 2. 接口列表

所有接口前缀: `/api/v1`

### 2.1 工作区 CRUD

#### 获取当前用户的工作区列表
- **URL**: `/workspaces`
- **Method**: `GET`
- **Query Params**:
  - `page`: 页码 (Default: 1)
  - `size`: 分页大小 (Default: 20)
- **Response**:
  ```json
  {
    "code": 200,
    "data": {
      "total": 5,
      "list": [
        { "id": "ws_001", "name": "销售分析工作区", "role": "admin", "createdAt": "2023-01-01" },
        { "id": "ws_002", "name": "人力资源工作区", "role": "visitor", "createdAt": "2023-02-01" }
      ]
    }
  }
  ```

#### 创建工作区
- **URL**: `/workspaces`
- **Method**: `POST`
- **Request**:
  ```json
  { "name": "新业务线工作区", "description": "用于..." }
  ```
- **Response**:
  ```json
  {
    "code": 200,
    "data": { "id": "ws_003" }
  }
  ```

### 2.2 工作区成员管理

#### 获取工作区成员列表
- **URL**: `/workspaces/{id}/users`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "code": 200,
    "data": {
      "total": 10,
      "list": [
        { "id": "u_001", "name": "Alice", "role": "admin" },
        { "id": "u_002", "name": "Bob", "role": "editor" }
      ]
    }
  }
  ```

#### 添加成员 / 更新角色
- **URL**: `/workspaces/{id}/users`
- **Method**: `POST`
- **Request**:
  ```json
  {
    "userIds": ["u_003"],
    "role": "visitor" // 可选: admin, report_admin, editor, visitor
  }
  ```

#### 移除成员
- **URL**: `/workspaces/{id}/users/{userId}`
- **Method**: `DELETE`

### 2.3 用户群组管理

#### 创建用户群组
- **URL**: `/workspaces/{id}/groups`
- **Method**: `POST`
- **Request**:
  ```json
  { "name": "Sales Team", "members": ["u_001", "u_002"] }
  ```
