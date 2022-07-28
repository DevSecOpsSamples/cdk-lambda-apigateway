import { Stack } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

import { SSM_PREFIX, StackCommonProps } from '../config';

/**
 * 
 * /device/v1/{deviceid}
 * 
 */
export class ProductApiStack extends Stack {
  constructor(scope: Construct, id: string, props: StackCommonProps) {
    super(scope, id, props);

    const restApiId = ssm.StringParameter.valueForStringParameter(this, `${SSM_PREFIX}/rest-api-id`); 
    const rootResourceId = ssm.StringParameter.valueForStringParameter(this, `${SSM_PREFIX}/root-resource-id`); 
    const rootApi = apigateway.RestApi.fromRestApiAttributes(this, "root-api", { restApiId, rootResourceId });

    const lambda1 = new lambda.Function(this, 'lambda1', {
      runtime: lambda.Runtime.NODEJS_14_X, 
      code: lambda.Code.fromAsset('../app'),
      handler: 'hello.handler'
    });

    const servicea = rootApi.root.addResource('product');
    const v1 = servicea.addResource('v1');
    v1.addResource('categories').addMethod('GET', new apigateway.LambdaIntegration(lambda1, { proxy: true }));
    v1.addResource('{categoryid}').addMethod('GET', new apigateway.LambdaIntegration(lambda1, { proxy: true }));

    const v2 = servicea.addResource('v2');
    v2.addResource('categories').addMethod('GET', new apigateway.LambdaIntegration(lambda1, { proxy: true }));
    v2.addResource('{categoryid}').addMethod('GET', new apigateway.LambdaIntegration(lambda1, { proxy: true }));
  }
}
