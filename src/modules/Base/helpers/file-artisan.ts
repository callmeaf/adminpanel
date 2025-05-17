interface IFileArtisan {
  isImage: (type: string) => boolean;
  isPdf: (type: string) => boolean;
}

const fileArtisan: IFileArtisan = {
  isImage: (type) => type.startsWith("image/"),
  isPdf: (type) => type === "application/pdf",
};

export default fileArtisan;
