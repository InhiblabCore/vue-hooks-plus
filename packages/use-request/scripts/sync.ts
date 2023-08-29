import fs from 'fs';
import path from 'path';
import { hooksRootDir } from '../../../scripts/utilts';

const sourceDir = `${hooksRootDir}/src/useRequest`;
const targetDir = `./src`

function copyDirectory(sourceDir: string, targetDir: string) {
  // 创建目标文件夹
  fs.mkdirSync(targetDir);

  // 读取源文件夹中的内容
  const files = fs.readdirSync(sourceDir);

  // 遍历源文件夹中的文件和子文件夹
  files.forEach(file => {
    if (file === 'docs' || file === '__tests__') {
      return;
    }

    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    // 检查文件的类型
    const stats = fs.statSync(sourcePath);
    if (stats.isFile()) {
      // 如果是文件，则直接拷贝
      fs.copyFileSync(sourcePath, targetPath);
    } else if (stats.isDirectory()) {
      // 如果是文件夹，则递归调用copyDirectory函数
      copyDirectory(sourcePath, targetPath);
    }
  });
}


async function main() {

  try {
    copyDirectory(sourceDir, targetDir);
    console.log('\n🍻🍻🍻🍻  succeed 🍻🍻🍻🍻');
  } catch (error) {
    console.error('\n💔💔💔💔  failed  💔💔💔💔');
    process.exit(1);
  }
}

main().catch(console.error);

