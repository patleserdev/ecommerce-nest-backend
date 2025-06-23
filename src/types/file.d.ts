import 'multer';

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
    }

    namespace Multer {
      interface File {
        /** le nom original du fichier uploadé */
        originalname: string;
        /** le type MIME du fichier */
        mimetype: string;
        /** la taille en octets */
        size: number;
        /** le buffer */
        buffer: Buffer;
        /** nom temporaire dans le disque (si disque utilisé) */
        filename?: string;
        /** chemin temporaire */
        path?: string;
      }
    }
  }
}
