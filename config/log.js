import fs from "fs";

// 현재 파일 기준이 아닌 루트 경로를 가져오는 것
import appRoot from "app-root-path";

export const accessLogStream = fs.createWriteStream(
  `${appRoot}/log/access.log`,
  {
    flags: "a",
  }
);
