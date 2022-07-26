#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DeviceApiStack } from '../lib/device-api-stack';
import { DEFAULT_STAGE } from '../config';


const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
};
const stage = app.node.tryGetContext('stage') || DEFAULT_STAGE;

new DeviceApiStack(app, `apigw-device-api-${stage}`, {
    env,
    stage,
    description: `/device API`,
    terminationProtection: stage!==DEFAULT_STAGE
});
