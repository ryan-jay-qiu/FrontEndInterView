# 1. 后台 API 接口文档

## 1.1. API  接口说明

- 接口基准地址：`http://127.0.0.1:8888/api/`
- 服务端已开启 CORS 跨域支持
- 认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON


### 1.1.2. 通用返回状态说明

| *状态码* | *含义*                | *说明*                                              |
| -------- | --------------------- | --------------------------------------------------- |
| 200      | OK                    | 请求成功                                            |
| 201      | CREATED               | 创建成功                                            |
| 204      | DELETED               | 删除成功                                            |
| 400      | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
| 401      | UNAUTHORIZED          | 未授权                                              |
| 403      | FORBIDDEN             | 被禁止访问                                          |
| 404      | NOT FOUND             | 请求的资源不存在                                    |
| 500      | INTERNAL SERVER ERROR | 内部错误                                            |
|          |                       |                                                     |

------

## 1.2. 登录

### 1.2.1. 发送验证码

- 请求路径：user/sendCode
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| account | 用户名(手机号) | 不能为空 |

- 响应数据

```json
{
    "data": {
        "Message": "OK",
        "RequestId": "D1BF04CD-50FD-5EE1-B172-B30733601C04",
        "Code": "OK",
        "BizId": "910223398032968639^0"
    },
    "meta": {
        "msg": "发送成功",
        "status": 200
    }
}
```

### 1.2.2. 校验验证码

- 请求路径：user/verifyCode
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| account | 用户名(手机号) | 不能为空 |
| code | 验证码 | 不能为空 |
- 响应数据

```json
{
    "data": {
        "account": "18332133776",
        "password": "",
        "name": "",
        "imgsrc": "",
        "signature": "",
        "breif": null,
        "license_number": null,
        "status": 1, //license状态
        "effect_date": null, //license
        "expired_time": null, //license
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMTgzMzIxMzM3NzYiLCJwYXNzd29yZCI6IiIsIm5hbWUiOiIiLCJpbWdzcmMiOiIiLCJzaWduYXR1cmUiOiIiLCJicmVpZiI6bnVsbCwibGljZW5zZV9udW1iZXIiOm51bGwsInN0YXR1cyI6MSwiZWZmZWN0X2RhdGUiOm51bGwsImV4cGlyZWRfdGltZSI6bnVsbCwiaWF0IjoxNjk4MDMzMTU3LCJleHAiOjE2OTgxMTk1NTd9.P7GyhWTyUw_TavbP6vWtSpGfOonmDMNMnoieR3bpuJA" //用于心跳
    },
    "meta": {
        "msg": "登录成功！",
        "status": 200
    }
}
```

## 1.3. 升级管理

### 1.3.1. 上传升级包

- 请求路径：upgrade/upload
- 请求方法：post
- 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| version    | 版本号     | 不能为空 |
| file  | 当前的升级文件     | 不能为空 |


- 响应数据

```json
{
    "data": {
        "path": "/dist/-1113.production" //下载路径
    },
    "meta": {
        "msg": "success",
        "status": 200
    }
}
```

### 1.3.1. 检测最新版本

- 请求路径：upgrade/checkVersion
- 请求方法：post
- 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| 无    | 无     | 无 |



- 响应数据

```json
{
    "data": {
        "version": 1112343, //最新版本号
        "path": "/dist/websocket-1112343.html", //下载路径
        "full_path": "1",
        "release_time": "2023-10-20 17:43:42",//最新版本上传时间
        "desc": null
    },
    "meta": {
        "msg": "success",
        "status": 200
    }
}
```

### 1.3.2. 心跳检测

- 请求路径：heart/check
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| 无 | 无 | 必须在header中携带token |



- 响应数据

```json
{
    "data": {
        "id": 28,
        "username": "tige1200",
        "mobile": "test",
        "type": 1,
        "openid": "",
        "email": "test@test.com",
        "create_time": "2017-11-10T03:47:13.533Z",
        "modify_time": null,
        "is_delete": false,
        "is_active": false
    },
    "meta": {
        "msg": "用户创建成功",
        "status": 201
    }
}
```