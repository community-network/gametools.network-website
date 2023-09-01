declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg";
declare module "*.png?as=webp";
declare module "*useResponsiveLoader=true" {
  const value: {
    srcSet: string;
    src: string;
    placeholder: string;
    height: number;
    width: number;
  };
  export default value;
}
