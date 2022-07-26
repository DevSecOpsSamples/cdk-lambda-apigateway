import * as cdk from 'aws-cdk-lib';

/**
 * /cdk-lambda-apigateway/vpc-id
 * 
 * ecs-fargate-cluster:
 *   /cdk-lambda-apigateway/cluster-capacityprovider-name
 *   /cdk-lambda-apigateway/cluster-securitygroup-id
 * 
 * iam-role:
 *   /cdk-lambda-apigateway/task-execution-role-arn
 *   /cdk-lambda-apigateway/default-task-role-arn
 * 
 */
export const SSM_PREFIX = '/cdk-lambda-apigateway';


export const DEFAULT_STAGE = 'dev';

export interface StackCommonProps extends cdk.StackProps {
    stage: string;
}