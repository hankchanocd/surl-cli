#!/usr/bin/env bash
#!/usr/bin/env zsh

# coverage-report.sh is meant to be called only after the build is successful on Travis CI
# use coverage-show script to produce coverage summary in HTML at local machine
# coverage-report does not build before test, as build is done by other scripts beforehand on Travis CI

parse_yaml() {
   local prefix=$2
   local s='[[:space:]]*' w='[a-zA-Z0-9_]*' fs=$(echo @|tr @ '\034')
   sed -ne "s|^\($s\)\($w\)$s:$s\"\(.*\)\"$s\$|\1$fs\2$fs\3|p" \
        -e "s|^\($s\)\($w\)$s:$s\(.*\)$s\$|\1$fs\2$fs\3|p"  $1 |
   awk -F$fs '{
      indent = length($1)/2;
      vname[indent] = $2;
      for (i in vname) {if (i > indent) {delete vname[i]}}
      if (length($3) > 0) {
         vn=""; for (i=0; i<indent; i++) {vn=(vn)(vname[i])("_")}
         printf("%s%s%s=\"%s\"\n", "'$prefix'",vn, $2, $3);
      }
   }'
}

# If .codecov.yml exists, use the key or use CODECOV_TOKEN stored on Travis CI or other CI
if [ -f .codecov.yml ]; then
    # read CODECOV_TOKEN from .codecov.yml
    eval $(parse_yaml .codecov.yml "config_")
    codecov_token=$config_codecov_token

else
    echo ".codecov.yml does not exist, use env!"
    codecov_token=$CODECOV_TOKEN
fi;


# Istanbul read the code, while codecov produces and send coverage report
istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && codecov -t $codecov_token

