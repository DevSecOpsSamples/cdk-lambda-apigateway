# Sample project for API Gateway and Lambda with CDK

To deploy without dependencies and CloudFormation limitation of Template body size(512k), create small API stacks for each Microservice or module.

![apigw](./screenshots/apigw.png?raw=true)

Table of Contents

1. Deploy root-api stack
2. Deploy device-api stack
3. Deploy product-api stack

## Prerequisite

```bash
npm install -g aws-cdk@2.25.0

# install packages in the root folder
npm install
cdk bootstrap
```

Use the `cdk` command-line toolkit to interact with your project:

* `cdk deploy`: deploys your app into an AWS account
* `cdk synth`: synthesizes an AWS CloudFormation template for your app
* `cdk diff`: compares your app with the deployed stack
* `cdk watch`: deployment every time a file change is detected

## CDK Stack

| Stack                         | Time    |
|-------------------------------|---------|
| root-api    (24kb)             | 1m 30s  |
| device-api  (24kb)             | 1m 30s  |
| product-api (20kb)              | 1m 30s  |
| Total                         | 4m 30s  |

### Step 1: root-api

Create the Root API and dummy method to import from device-api and product-api.

```bash
cd root-api
cdk deploy
```

[root-api/lib/root-api-stack.ts](./root-api/lib/root-api-stack.ts)

### Step 2: device-api

```bash
cd ../device-api
cdk deploy
```

[device-api/lib/device-api-stack.ts](./device-api/lib/device-api-stack.ts)

SSM parameter:

* /cdk-lambda-apigateway/rest-api-id
* /cdk-lambda-apigateway/root-resource-id

### Step 3: product-api

```bash
cd ../product-api
cdk deploy
```

[product-api/lib/product-api-stack.ts](./product-api/lib/product-api-stack.ts)

SSM parameter:

* /cdk-lambda-apigateway/rest-api-id
* /cdk-lambda-apigateway/root-resource-id

### Reference

* Template body size: 512k
* Template body size in an Amazon S3: 1M
