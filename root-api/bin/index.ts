import * as cdk from 'aws-cdk-lib';
import { RootApiStack } from '../lib/root-api-stack';
import { DEFAULT_STAGE } from '../config';

const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
};
const stage = app.node.tryGetContext('stage') || DEFAULT_STAGE;

new RootApiStack(app, `apigw-root-api-${stage}`, {
    env,
    stage,
    description: `root API`,
    terminationProtection: stage!==DEFAULT_STAGE
});
