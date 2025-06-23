# https://github.com/WHOAcademy/nginx-mod-security-3
FROM whoalxp.azurecr.io/nginx-mod-security-3:0.2

COPY storybook-static /usr/local/src

COPY default-site.conf.template /usr/local/nginx/conf.d/default-site.conf.template
COPY docker-entrypoint.sh /usr/local/docker-entrypoint.sh

# Copy custom WAF rules
COPY waf/rules/* /usr/local/nginx/conf/rules/

# needs a temporary file to replace the env value, we're creating a 
# temporary file, later it'll be removed post replacing the actual 
# values in the `docker-entrypoint.sh` script
USER root
USER ${DOCKER_UID}:${DOCKER_GID}
