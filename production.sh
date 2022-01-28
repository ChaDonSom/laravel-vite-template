#!bin/bash

npm run build

cp public/build/manifest.json public
cp public/build/manifest.webmanifest public