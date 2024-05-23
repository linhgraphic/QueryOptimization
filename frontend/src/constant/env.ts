export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

  export const dataUrl = `http://localhost:3000/api/service`
  export const countUrl = `http://localhost:8080/assets/count`