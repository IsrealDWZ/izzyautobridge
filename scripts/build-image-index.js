import fs from 'fs';
import path from 'path';
import fastGlob from 'fast-glob';
const { globSync } = fastGlob;

const IMAGE_ROOTS = [
  '/home/israel/Documents/Default Project/images_carimages',
  '/home/israel/Documents/Default Project/images_serpapi',
];

const OUTPUT_PATH = '/home/israel/Desktop/izzyautobridge website/izzy-react/scripts/image-index.json';
const PUBLIC_VEHICLES_DIR = '/home/israel/Desktop/izzyautobridge website/izzy-react/public/vehicles';

function buildImageIndex() {
  const index = {};
  const allImages = [];

  for (const root of IMAGE_ROOTS) {
    if (!fs.existsSync(root)) {
      console.warn(`Image root not found: ${root}`);
      continue;
    }
    const files = globSync('**/*.{webp,jpg,jpeg,png}', { cwd: root, absolute: true });
    for (const file of files) {
      const relPath = path.relative(root, file);
      const filename = path.basename(file, path.extname(file));
      const normalized = filename.toLowerCase().replace(/[^a-z0-9]/g, '');
      allImages.push({
        path: file,
        relPath,
        filename,
        normalized,
        source: path.basename(root),
      });
    }
  }

  console.log(`Found ${allImages.length} total images across ${IMAGE_ROOTS.length} sources`);

  for (const img of allImages) {
    const key = img.normalized;
    if (!index[key]) index[key] = [];
    index[key].push(img);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(index, null, 2));
  console.log(`Image index written to ${OUTPUT_PATH} (${Object.keys(index).length} unique keys)`);

  return index;
}

function copyImagesToPublic(imageIndex, matchedKeys) {
  if (!fs.existsSync(PUBLIC_VEHICLES_DIR)) {
    fs.mkdirSync(PUBLIC_VEHICLES_DIR, { recursive: true });
  }

  let copied = 0;
  for (const key of matchedKeys) {
    const images = imageIndex[key];
    if (!images) continue;
    for (const img of images) {
      const destName = `${key}${path.extname(img.path)}`;
      const destPath = path.join(PUBLIC_VEHICLES_DIR, destName);
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(img.path, destPath);
        copied++;
      }
    }
  }
  console.log(`Copied ${copied} images to ${PUBLIC_VEHICLES_DIR}`);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('build-image-index.js')) {
  buildImageIndex();
}

export { buildImageIndex, copyImagesToPublic, IMAGE_ROOTS, PUBLIC_VEHICLES_DIR };