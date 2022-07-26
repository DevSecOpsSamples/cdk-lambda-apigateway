
find . -name "cdk.out" -exec rm -rf {} \;
find . -name "cdk.context.json" -exec rm -f {} \;

echo "destroy product-api"
cd product-api
cdk destroy

echo "destroy device-api"
cd ../device-api
cdk destroy

echo "destroy root-api"
cd ../root-api
cdk destroy

rm -rf "node_modules";
