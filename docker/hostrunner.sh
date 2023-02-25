#!/usr/bin/env bash

set -x

echo "Searching for Docker image ..."
DOCKER_IMAGE_ID=$(docker images --format="{{.ID}}" irismopidy:latest | head -n 1)
echo "Found and using ${DOCKER_IMAGE_ID}"

USER_UID=$(id -u)

#docker run --rm -t -i \
#  --volume=/run/user/${USER_UID}/pulse:/run/user/105/pulse \
#  ${DOCKER_IMAGE_ID} \
#  bash
  #gst-launch-1.0 audiotestsrc ! audioresample ! autoaudiosink
  #echo "random bshit"  && pacat -vvvv /dev/urandom
#  gst-launch-1.0 audiotestsrc ! audioresample ! autoaudiosink

# change the permissions for /home/ubuntu/mopid/conf pulse with sudo chmod -R 667 pulse 
docker run -d -t -i \
    -v "/Users/thomas/Documents/Git/IrisFork/docker/mopidy/iris:/var/lib/mopidy/iris" \
    -v "/Users/thomas/Documents/Git/IrisFork/docker/mopidy/m3u:/var/lib/mopidy/m3u" \
    -v "/Users/thomas/Documents/Git/IrisFork/docker/mopidy/mopidy.example.conf:/config/mopidy.conf" \
    -p 6600:6600 -p 6680:6680 \
    ${DOCKER_IMAGE_ID}