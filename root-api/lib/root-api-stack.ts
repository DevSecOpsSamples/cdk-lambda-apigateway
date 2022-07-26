import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

import { SSM_PREFIX, StackCommonProps } from '../config';

/**
 */
export class RootApiStack extends Stack {
  constructor(scope: Construct, id: string, props: StackCommonProps) {
    super(scope, id, props);

    const stage = props.stage;

    const lambda1 = new lambda.Function(this, 'lambda1', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('../app'),
      handler: 'hello.handler'
    });

    const lambda2 = new lambda.Function(this, 'lambda2', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('../app'),
      handler: 'hello.handler'
    });

    const api = new apigateway.RestApi(this, 'servicea-api', {
      deployOptions: {
        stageName: stage,
      }
    });
    const servicea = api.root.addResource('dummy-for-import');
    const v1 = servicea.addResource('v1');
    const v1Ping = v1.addResource('ping').addMethod('GET', new apigateway.LambdaIntegration(lambda1, { proxy: true }));

    new ssm.StringParameter(this, 'api-id', { parameterName: `${SSM_PREFIX}/rest-api-id`, stringValue: api.restApiId });
    new ssm.StringParameter(this, 'root-resource-id', { parameterName: `${SSM_PREFIX}/root-resource-id`, stringValue: api.root.resourceId });
  }
}