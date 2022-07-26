#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ProductApiStack } from '../lib/product-api-stack';
import { DEFAULT_STAGE } from '../config';


const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
};
const stage = app.node.tryGetContext('stage') || DEFAULT_STAGE;

new ProductApiStack(app, `apigw-product-api-${stage}`, {
    env,
    stage,
    description: `/product API`,
    terminationProtection: stage!==DEFAULT_STAGE
});
