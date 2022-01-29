#!bin/bash

npm run build

cp public/build/manifest.webmanifest public
cp public/build/manifest.webmanifest public/manifest.json

# All static assets must be listed here to show up
cp public/build/*.png public
cp public/build/*.svg public
# cp public/build/*.ico public