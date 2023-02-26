pack build ghcr.io/DaeheeCodes/cryptomock:latest \
    --builder paketobuildpacks/builder:base \
    --path . \
    --env "BP_OCI_SOURCE=https://github.com/DaeheeCodes/cryptomock" \
    --env "BP_JVM_VERSION=17" \
    --publish
    
    d