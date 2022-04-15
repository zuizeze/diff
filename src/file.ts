import { createWriteStream } from 'fs';
import { join } from 'path';
const chars =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

export const create_file = async (json: any) => {
  const uuid = generate();
  const fileExtension = 'txt';
  const data = JSON.stringify(json);
  const file_path = `${uuid}.${fileExtension}`;
  const uploadfile = createWriteStream(
    join(__dirname, '..', '..', 'static', file_path),
  );
  const result = await uploadfile.write(data);
  if (result) {
    return {
      file_path,
    };
  }
  return;
};

function generate() {
  const uuid = new Array(36);
  let rnd = 0;
  let r;
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid[i] = '-';
    } else if (i === 14) {
      uuid[i] = '4';
    } else {
      if (rnd <= 0x02) {
        rnd = (0x2000000 + Math.random() * 0x1000000) | 0;
      }
      r = rnd & 0xf;
      rnd = rnd >> 4;
      uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
    }
  }
  return uuid.join('').toLowerCase();
}
