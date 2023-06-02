import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Scraper from "images-scraper";
const __filename = fileURLToPath(import.meta.url);
const google = new Scraper({
  puppeteer: {
    headless: false,
  },
});
//  const getMovieImages = ()=>{
//    const results = await google.scrape(file, 2);

//  }

const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, "Documents");
const getMovieList = async (pathname, parent) => {
  let directoryPath = path.resolve(__dirname, pathname),
    mainVideo = [];
  // console.log(directoryPath);
  await new Promise((resolve) => {
    fs.readdir(directoryPath, async (err, files) => {
      if (err) {
        resolve(!err);
      }
      let videos = {},
        nested = [],
        promises = [],
        testNested = [];
      // parent = "";
      for (let file of files) {
        // console.log(file);
        let obj = {
          name: "",
          path: "",
        };
        if (file.includes(".srt") || file.includes(".vtt")) {
          (obj.name = file),
            (obj.parentFile =
              directoryPath.split("\\")[directoryPath.split("\\").length - 1]);
          obj.subsPath = directoryPath.split("personal")[1] + "\\" + file;
          if (!videos[obj.parentFile]) {
            videos[obj.parentFile] = [];
          }
          videos[obj.parentFile].push(obj);
        }
        //   parent = file;
        if (
          file.includes(".mkv") ||
          file.includes(".mp4") ||
          file.includes(".avi")
        ) {
          obj.name = file;
          obj.parentFile =
            directoryPath.split("\\")[directoryPath.split("\\").length - 1];
          obj.path = directoryPath.split("personal")[1] + "\\" + file;
          //     if (obj.parentFile == "shows") obj.parentFile = file;
          if (!videos[obj.parentFile]) {
            videos[obj.parentFile] = [];
          }
          videos[obj.parentFile].push(obj);
        } else if (fs.lstatSync(directoryPath + "\\" + file).isDirectory()) {
          promises.push(getMovieList(directoryPath + "\\" + file, file));
          // testNested = await getMovieList(directoryPath + "\\" + file);
        }
      }
      nested = await Promise.all(promises);
      let folder = {};
      // if (nested && nested.length) {
      //   //   nested.forEach((data) => {
      //   //     if (!folder[data.parentFile]) {
      //   //       folder[data.parentFile] = {};
      //   //     }
      //   //     folder[data.parentFile] = { ...folder[data.parentFile], ...data };
      //   //   });
      // }
      // if (parent === "shows") {
      //   videos[parent] = { ...videos};
      // }
      if (!videos[parent]) {
        videos[parent] = [];
      }
      videos = { ...videos, [parent]: [...videos[parent], ...nested] };
      // console.log(pathname, videos, nested, "ets32");
      console.log(videos, "testse");
      mainVideo = videos;
      resolve(true);
      //   return videos;
    });
  });
  console.log(mainVideo);
  return mainVideo;
};
const getMovies = async (req, res) => {
  const videos = [],
    folder = req.body.folder || "shows";
  let resp = await getMovieList("../../public/personal/" + folder, folder);
  console.log(resp);

  res.status(200).send({ videos: resp });
};

export { getMovies };
