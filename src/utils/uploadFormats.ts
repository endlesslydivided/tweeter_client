

export const audioFormats = ['.mp3','.wav']
export const videoFormats = ['.mp4','.webm']
export const imageFormats = ['.apng','.gif','.ico','.cur','.jpg','.jpeg','.jfif','.pjpeg','.pjp','.png','.svg']

export function fDataFormat(fileName:string) {

    let audioFormats = /(\.mp3|\.wav)$/i;
    let videoFormats = /(\.mp4|\.webm)$/i;
    let imageFormats = /(\.apng|\.gif|\.ico|\.cur|\.jpg|\.jpeg|\.jfif|\.pjpeg|\.pjp|\.png|\.svg)$/i;

    if(!!(fileName as string).match(audioFormats))
    {
        return 'audio';
    }
    else if(!!(fileName as string).match(videoFormats))
    {
        return 'video';
    }
    else if(!!(fileName as string).match(imageFormats))
    {
        return 'image';
    }
    else
    {
        return 'document';
    }
}
