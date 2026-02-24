# 认证与权限 (Auth & RBAC) API 接口文档

## 1. 概述
本模块接口负责登录、Token 颁发、权限检查及申请审批。

## 2. 接口列表

所有接口前缀: `/api/v1`

### 2.1 认证 (Authentication)

#### 登录 (Login)
- **URL**: `/auth/login`
- **Method**: `POST`
- **Request**:
  ```json
  { "username": "admin", "password": "***" }
  ```
- **Response**:
  ```json
  {
    "code": 200,
    "data": { "token": "eyJhbG...", "user": { "id": 1, "name": "Admin" } }
  }
  ```

#### 获取当前用户信息及权限 (Me)
- **URL**: `/auth/me`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "code": 200,
    "data": {
      "permissions": ["report:edit", "report:view", "user:manage"],
      "roles": ["admin"]
    }
  }
  ```

### 2.2 权限控制 (Authorization)

#### 检查特定资源的访问权限
- **URL**: `/reports/{id}/permission`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "hasPermission": true,
    "role": "editor", // or "viewer", "none"
    "reason": "" // if false, optional reason
  }
  ```

### 2.3 权限申请与审批 (Approval)

#### 申请访问权限
- **URL**: `/reports/{id}/access-request`
- **Method**: `POST`
- **Request**:
  ```json
  {
    "reason": "业务需要查看销售报表"
  }
  ```
- **Response**: `{ "success": true, "message": "申请已提交，等待审批" }`

#### 获取待审批列表 (For Admin)
- **URL**: `/approvals`
- **Method**: `GET`
- **Response**: `[...]`

#### 处理审批 (Approve/Reject)
- **URL**: `/approvals/{id}`
- **Method**: `PUT`
- **Request**: `{ "status": "approved" }`
