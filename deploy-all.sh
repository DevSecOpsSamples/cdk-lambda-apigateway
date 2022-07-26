find . -name "cdk.context.json" -exec rm -f {} \;

echo "Deploy root-api"
cd ./root-api
cdk deploy --require-approval never

echo "Deploy device-api"
cd ../device-api
cdk deploy --require-approval never

echo "Deploy product-api"
cd ../product-api
cdk deploy --require-approval never
