import Zip, { JSZipFileOptions } from 'jszip'
import { saveAs } from 'file-saver'

export function useZip() {
  const zip = new Zip()

  const createFolder = (name: string) => {
    zip.folder(name)
  }

  const createFile = (path: string, data: any, options?: JSZipFileOptions) => {
    zip.file(path, data, options)
  }

  const download = () => {
    zip.generateAsync({ type: 'blob' })
      .then((blob) => {
        saveAs(blob, 'Playground Project')
      })
  }

  return {
    createFolder,
    createFile,
    download,
  }
}
