#!bin/bash

npm run build

cp public/build/manifest.webmanifest public
cp public/build/manifest.webmanifest public/manifest.json

# All static assets must be listed here to show up
if [ -f public/build/*.png ]; then
    cp public/build/*.png public
fi

if [ -f public/build/*.svg ]; then 
    cp public/build/*.svg public
fi
# cp public/build/*.ico public