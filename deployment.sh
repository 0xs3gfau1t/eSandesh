if ! ffmpeg -version;then
    apt-get install ffmpeg -y
fi
npm install
npm run start
